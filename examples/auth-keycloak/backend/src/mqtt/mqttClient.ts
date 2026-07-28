import mqtt from 'mqtt';
import { redis } from '../redis/redisClient';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

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
let mqttClient: mqtt.MqttClient | null = null;

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
    username: 'dashboard',
    password: process.env.BACKEND_MQTT_SECRET || 'super_secret_backend',
    clientId: `backend_service_${Math.random().toString(16).substring(2, 8)}`
  });

  mqttClient.on('connect', () => {
    console.log('[MQTT] Connected to EMQX Broker');
    mqttClient?.subscribe('v1/devices/+/telemetry', (err) => {
      if (!err) console.log('[MQTT] Subscribed: v1/devices/+/telemetry');
    });
    mqttClient?.subscribe('v1/devices/+/attributes', (err) => {
      if (!err) console.log('[MQTT] Subscribed: v1/devices/+/attributes');
    });

    // CHUAN THINGSBOARD: Shared Subscription cho scale-out
    // Khi co nhieu Pod Backend chay song song, EMQX tu dong chia tai (load-balance)
    // moi event chi den 1 Pod. Tranh duplicate DB write khi scale tren K3s.
    const SYS_CONNECTED    = '$share/backend_group/$SYS/brokers/+/clients/+/connected';
    const SYS_DISCONNECTED = '$share/backend_group/$SYS/brokers/+/clients/+/disconnected';
    mqttClient?.subscribe(SYS_CONNECTED, (err) => {
      if (!err) console.log('[MQTT] Subscribed $SYS/connected (shared)');
      else console.error('[MQTT] Error subscribing $SYS/connected:', err);
    });
    mqttClient?.subscribe(SYS_DISCONNECTED, (err) => {
      if (!err) console.log('[MQTT] Subscribed $SYS/disconnected (shared)');
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

          const cred = await prisma.device_credentials.findUnique({
            where: { credentials_id: username },
            select: { device_id: true }
          });
          if (!cred?.device_id) {
            console.warn(`[SYS] Khong tim thay thiet bi voi token: ${username}`);
            return;
          }

          const deviceId = cred.device_id;
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
        const deviceKey = parts[2];
        const msgType   = parts[3];
        const payload   = JSON.parse(message.toString());

        for (const [key, value] of Object.entries(payload)) {
          const queueItem = {
            deviceKey, key,
            bool_v: typeof value === 'boolean' ? value : null,
            str_v:  typeof value === 'string'  ? value : null,
            long_v: typeof value === 'number' && Number.isInteger(value)  ? value : null,
            dbl_v:  typeof value === 'number' && !Number.isInteger(value) ? value : null,
            json_v: typeof value === 'object' && value !== null ? JSON.stringify(value) : null,
            ts: Date.now()
          };

          if (msgType === 'telemetry') {
            await redis.lpush('telemetry_queue', JSON.stringify(queueItem));
            await redis.hset(`latest_telemetry:${deviceKey}`, key, JSON.stringify(queueItem));
            // CHUAN TB: Cap nhat lastActivityTime khi co telemetry (de inactivityWorker dung)
            const cred = await prisma.device_credentials.findUnique({
              where: { credentials_id: deviceKey }, select: { device_id: true }
            });
            if (cred?.device_id) {
              await saveDeviceAttribute(cred.device_id, LAST_ACTIVITY_TIME, Date.now());
            }
          } else if (msgType === 'attributes') {
            await redis.lpush('attributes_queue', JSON.stringify(queueItem));
          }
        }
      }
    } catch (err) {
      console.error('[MQTT] Error processing message:', err);
    }
  });

  mqttClient.on('error', (err) => {
    console.error('[MQTT] Connection Error:', err);
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
