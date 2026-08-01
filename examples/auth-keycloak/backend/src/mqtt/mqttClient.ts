import mqtt from 'mqtt';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { getDeviceByCredential } from '../cache/deviceCredentialCache';
import { telemetryQueue } from '../queue/telemetryQueue';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * MODULE: MQTT CLIENT
 * Nhiem vu:
 * - Ket noi voi EMQX Broker.
 * - Xu ly Connect/Disconnect va luu trang thai dung chuan ThingsBoard:
 *   State duoc luu vao bang attribute_kv (SERVER_SCOPE):
 *   "active", "lastConnectTime", "lastDisconnectTime", "lastActivityTime"
 * - Phat Live Event de Frontend cap nhat UI tuc thi (0ms).
 * Kien truc tham chieu: ThingsBoard DefaultDeviceStateService.java
 */

// Hang so trang thai chuan ThingsBoard (DefaultDeviceStateService.java:122-127)
const ACTIVITY_STATE       = 'active';
const LAST_CONNECT_TIME    = 'lastConnectTime';
const LAST_DISCONNECT_TIME = 'lastDisconnectTime';
const LAST_ACTIVITY_TIME   = 'lastActivityTime';
const INACTIVITY_TIMEOUT   = 'inactivityTimeout';

// Danh sach username he thong - KHONG xu ly nhu thiet bi IoT
// Luu y: EMQX serialize missing username thanh string "undefined" (khong phai JS undefined)
const SYSTEM_USERNAMES = new Set(['backend_service', 'frontend_readonly', 'dashboard', 'undefined']);

const EMQX_URL = process.env.EMQX_URL || 'mqtt://localhost:1883';
const MAX_MQTT_PAYLOAD_BYTES = Math.max(1024, parseInt(process.env.MAX_MQTT_PAYLOAD_BYTES || '65536', 10));
const MAX_TELEMETRY_KEYS = Math.max(1, parseInt(process.env.MAX_TELEMETRY_KEYS || '256', 10));
let mqttClient: mqtt.MqttClient | null = null;
let lastMqttErrorLogAt = 0;

/**
 * Luu Server Attribute vao bang attribute_kv - dung chuan ThingsBoard.
 * Tuong duong: DefaultDeviceStateService.save(tenantId, deviceId, key, value)
 * ThingsBoard luu state thiet bi vao attribute_kv (SERVER_SCOPE), khong phai
 * vao cot them trong bang devices.
 */
const saveDeviceAttribute = async (
  deviceId: string,
  key: string,
  value: boolean | number | string
): Promise<void> => {
  const ts = Date.now();
  const bool_v = typeof value === 'boolean' ? value : null;
  const long_v = typeof value === 'number' && Number.isInteger(value) ? value : null;
  const dbl_v  = typeof value === 'number' && !Number.isInteger(value) ? value : null;
  const str_v  = typeof value === 'string' ? value : null;
  await prisma.$executeRaw`
    INSERT INTO attribute_kv
      (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
    VALUES
      ('DEVICE', ${deviceId}::uuid, 'SERVER_SCOPE', ${key}, ${bool_v}, ${str_v}, ${long_v}, ${dbl_v}, NULL, ${ts})
    ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
    DO UPDATE SET
      bool_v = EXCLUDED.bool_v, str_v = EXCLUDED.str_v,
      long_v = EXCLUDED.long_v, dbl_v = EXCLUDED.dbl_v,
      last_update_ts = EXCLUDED.last_update_ts;
  `;
};

export const startMqttClient = () => {
  mqttClient = mqtt.connect(EMQX_URL, {
    username: 'backend_service',
    password: process.env.BACKEND_MQTT_SECRET || 'super_secret_backend',
    clientId: `backend_service_${Math.random().toString(16).substring(2, 8)}`
  });

  mqttClient.on('connect', () => {
    console.log('[MQTT] Connected to EMQX Broker');
    const TELEMETRY_TOPIC = '$share/telemetry-ingest/v1/devices/+/telemetry';
    const ATTRIBUTES_TOPIC = '$share/telemetry-ingest/v1/devices/+/attributes';
    mqttClient?.subscribe(TELEMETRY_TOPIC, { qos: 1 }, (err) => {
      if (!err) console.log(`[MQTT] Subscribed shared: ${TELEMETRY_TOPIC}`);
      else console.error('[MQTT] Error subscribing telemetry:', err);
    });
    mqttClient?.subscribe(ATTRIBUTES_TOPIC, { qos: 1 }, (err) => {
      if (!err) console.log(`[MQTT] Subscribed shared: ${ATTRIBUTES_TOPIC}`);
      else console.error('[MQTT] Error subscribing attributes:', err);
    });

    // EMQX 5.8 khong cho shared subscription tren namespace $SYS. State update
    // la idempotent nen moi backend pod co the subscribe truc tiep; telemetry va
    // attributes o tren van bat buoc dung shared subscription de tranh ghi trung.
    const SYS_CONNECTED    = '$SYS/brokers/+/clients/+/connected';
    const SYS_DISCONNECTED = '$SYS/brokers/+/clients/+/disconnected';
    mqttClient?.subscribe(SYS_CONNECTED, (err) => {
      if (!err) console.log('[MQTT] Subscribed $SYS/connected');
      else console.error('[MQTT] Error subscribing $SYS/connected:', err);
    });
    mqttClient?.subscribe(SYS_DISCONNECTED, (err) => {
      if (!err) console.log('[MQTT] Subscribed $SYS/disconnected');
      else console.error('[MQTT] Error subscribing $SYS/disconnected:', err);
    });
  });

  mqttClient.on('message', async (topic, message) => {
    try {
      // LUONG 1: SU KIEN KET NOI ($SYS)
      // Anh xa tu: DefaultDeviceStateService.onDeviceConnect/Disconnect
      if (topic.includes('/clients/') && (topic.endsWith('/connected') || topic.endsWith('/disconnected'))) {
        try {
          const sysEvent   = JSON.parse(message.toString());
          const username   = sysEvent.username as string;
          const isConnected = topic.endsWith('/connected');
          if (!username || SYSTEM_USERNAMES.has(username)) return;
          console.log(`[SYS] Thiet bi "${username}" -> ${isConnected ? 'ONLINE' : 'OFFLINE'}`);

          const cred = await getDeviceByCredential(username);
          if (!cred?.deviceId) {
            console.warn(`[SYS] Khong tim thay thiet bi voi token: ${username}`);
            return;
          }

          const deviceId = cred.deviceId;
          const now = Date.now();

          // CHUAN THINGSBOARD: Luu state vao attribute_kv (SERVER_SCOPE)
          // Ref: DefaultDeviceStateService.java:246-248 va 300-302
          if (isConnected) {
            await Promise.all([
              saveDeviceAttribute(deviceId, ACTIVITY_STATE, true),
              saveDeviceAttribute(deviceId, LAST_CONNECT_TIME, now),
            ]);
          } else {
            await Promise.all([
              saveDeviceAttribute(deviceId, ACTIVITY_STATE, false),
              saveDeviceAttribute(deviceId, LAST_DISCONNECT_TIME, now),
            ]);
          }

          // Giu backward-compatible: additional_info.status cho UI list
          const newStatus = isConnected ? 'online' : 'offline';
          const oldDevice = await prisma.devices.findUnique({
            where: { id: deviceId },
            select: { additional_info: true }
          });
          const oldInfo = (oldDevice?.additional_info as any) || {};
          if (oldInfo.status !== newStatus) {
            await prisma.devices.update({
              where: { id: deviceId },
              data: { additional_info: { ...oldInfo, status: newStatus } }
            });
            publishLiveEvent('devices', 'updated', { id: deviceId, status: newStatus });
            console.log(`[SYS] Cap nhat: ${deviceId} -> ${newStatus}`);
          }
        } catch (sysErr) {
          console.error('[SYS] Loi xu ly su kien:', sysErr);
        }
        return;
      }

      // LUONG 2: TELEMETRY / ATTRIBUTES TU THIET BI
      const cleanTopic = topic.endsWith('/') ? topic.slice(0, -1) : topic;
      const parts = cleanTopic.split('/');
      if (parts.length === 4 && parts[0] === 'v1' && parts[1] === 'devices' &&
          (parts[3] === 'telemetry' || parts[3] === 'attributes')) {
        if (message.length > MAX_MQTT_PAYLOAD_BYTES) {
          throw new Error(`MQTT payload vuot ${MAX_MQTT_PAYLOAD_BYTES} bytes.`);
        }
        const deviceKey = parts[2];
        const msgType   = parts[3];
        const payload = JSON.parse(message.toString());
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
          throw new Error('Telemetry/attributes payload phai la JSON object.');
        }
        if (Object.keys(payload).length > MAX_TELEMETRY_KEYS) {
          throw new Error(`MQTT payload vuot ${MAX_TELEMETRY_KEYS} keys.`);
        }
        const credential = await getDeviceByCredential(deviceKey);
        if (!credential) {
          console.warn(`[MQTT] Khong tim thay credential cho deviceKey ${deviceKey}`);
          return;
        }

        // Moi MQTT message chi tao mot stream entry. Worker se bung cac key va
        // cap nhat lastActivityTime mot lan sau khi PostgreSQL commit.
        await telemetryQueue.enqueue({
          type: msgType,
          tenantId: credential.tenantId,
          deviceId: credential.deviceId,
          deviceKey,
          ts: Date.now(),
          values: payload
        });
      }
    } catch (err) {
      console.error('[MQTT] Error processing message:', err);
    }
  });

  mqttClient.on('error', (err) => {
    const now = Date.now();
    if (now - lastMqttErrorLogAt >= 10_000) {
      const nestedErrors = (err as any)?.errors as Error[] | undefined;
      const detail = nestedErrors?.map(item => item.message).join('; ') || err.message;
      console.error(`[MQTT] Connection Error: ${detail}`);
      lastMqttErrorLogAt = now;
    }
  });
};

/**
 * Phat Live Event cho Frontend.
 * Tuong duong TB: TbLocalSubscriptionService -> WebSocket Push
 * Frontend nhan va patch truc tiep vao React Query Cache -> 0ms UI update
 */
export const publishLiveEvent = (channel: string, type: string, payload: any) => {
  if (mqttClient?.connected) {
    const topic   = `v1/sys/refine/${channel}/${type}`;
    const message = JSON.stringify({ channel, type, payload, date: new Date().toISOString() });
    mqttClient.publish(topic, message, { qos: 0 });
    console.log(`[LIVE EVENT] Da phat: ${topic}`);
  }
};

export const publishSharedAttributes = (deviceKey: string, payload: any) => {
  if (mqttClient?.connected) {
    const topic   = `v1/devices/${deviceKey}/attributes/response/shared`;
    mqttClient.publish(topic, JSON.stringify(payload), { qos: 1 });
    console.log(`[SHARED ATTRIBUTES] Da push xuong ${topic}`);
  }
};

// Export de inactivityWorker co the dung
export { saveDeviceAttribute, ACTIVITY_STATE, LAST_ACTIVITY_TIME, INACTIVITY_TIMEOUT };
