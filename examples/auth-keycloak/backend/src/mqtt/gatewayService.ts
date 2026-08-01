import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { publishLiveEvent } from './mqttClient';
import { telemetryQueue, QueueMessageType } from '../queue/telemetryQueue';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const gatewayTopics = new Set([
  'v1/gateway/connect',
  'v1/gateway/disconnect',
  'v1/gateway/telemetry',
  'v1/gateway/attributes'
]);

const fail = (message: string, statusCode = 400): never => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  throw error;
};

const parsePayload = (payload: unknown): any => {
  if (payload && typeof payload === 'object') return payload;
  if (typeof payload !== 'string') return fail('Payload Gateway phai la JSON.');
  try {
    return JSON.parse(payload);
  } catch {
    return fail('Payload Gateway khong phai JSON hop le.');
  }
};

const generateToken = (length: number) => crypto
  .randomBytes(length)
  .toString('base64url')
  .slice(0, length);

const saveServerAttribute = async (deviceId: string, key: string, value: boolean | number) => {
  const now = Date.now();
  const boolValue = typeof value === 'boolean' ? value : null;
  const longValue = typeof value === 'number' ? Math.trunc(value) : null;
  await prisma.$executeRaw`
    INSERT INTO attribute_kv
      (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
    VALUES
      ('DEVICE', ${deviceId}::uuid, 'SERVER_SCOPE', ${key}, ${boolValue}, NULL, ${longValue}, NULL, NULL, ${now})
    ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
    DO UPDATE SET bool_v = EXCLUDED.bool_v, long_v = EXCLUDED.long_v,
      str_v = NULL, dbl_v = NULL, json_v = NULL, last_update_ts = EXCLUDED.last_update_ts;
  `;
};

const setDeviceStatus = async (device: any, status: 'online' | 'offline') => {
  const info = (device.additional_info as Record<string, any>) || {};
  if (info.status !== status) {
    await prisma.devices.update({
      where: { id: device.id },
      data: { additional_info: { ...info, status } }
    });
    publishLiveEvent('devices', 'updated', { id: device.id, status });
  }
};

const markActivity = async (
  device: any,
  options: { active?: boolean; connected?: boolean; disconnected?: boolean } = {}
) => {
  const now = Date.now();
  const updates: Promise<unknown>[] = [saveServerAttribute(device.id, 'lastActivityTime', now)];
  if (options.active || options.connected) {
    updates.push(saveServerAttribute(device.id, 'active', true));
  }
  if (options.connected) {
    updates.push(saveServerAttribute(device.id, 'lastConnectTime', now));
  }
  if (options.disconnected) {
    updates.push(saveServerAttribute(device.id, 'active', false));
    updates.push(saveServerAttribute(device.id, 'lastDisconnectTime', now));
  }
  await Promise.all(updates);
  await setDeviceStatus(device, options.disconnected ? 'offline' : 'online');
};

const ensureDownstreamDevice = async (gateway: any, name: string, profile = 'default') => {
  if (!name?.trim()) return fail('Ten thiet bi downstream khong duoc de trong.');
  if (name === gateway.name) return fail('Gateway khong the proxy chinh no.');

  let device = await prisma.devices.findFirst({
    where: { tenant_id: gateway.tenant_id, name }
  });
  if (!device) {
    device = await prisma.devices.create({
      data: {
        tenant_id: gateway.tenant_id,
        name,
        type: profile || 'default',
        additional_info: { status: 'offline', gateway: false, provisionedByGatewayId: gateway.id },
        device_credentials: {
          create: {
            credentials_type: 'ACCESS_TOKEN',
            credentials_id: generateToken(20),
            credentials_value: generateToken(32)
          }
        }
      }
    });
    publishLiveEvent('devices', 'created', {
      id: device.id,
      name: device.name,
      type: device.type,
      status: 'offline',
      gateway: false,
      isGateway: false,
      created_at: device.created_at
    });
  }
  return device;
};

const connectRelation = async (gatewayId: string, deviceId: string) => {
  await prisma.relation.upsert({
    where: {
      from_id_from_type_relation_type_group_relation_type_to_id_to_type: {
        from_id: gatewayId,
        from_type: 'DEVICE',
        relation_type_group: 'COMMON',
        relation_type: 'Contains',
        to_id: deviceId,
        to_type: 'DEVICE'
      }
    },
    update: { additional_info: { source: 'GATEWAY_API', connected: true, updatedAt: Date.now() } },
    create: {
      from_id: gatewayId,
      from_type: 'DEVICE',
      relation_type_group: 'COMMON',
      relation_type: 'Contains',
      to_id: deviceId,
      to_type: 'DEVICE',
      additional_info: { source: 'GATEWAY_API', connected: true, updatedAt: Date.now() }
    }
  });
};

const enqueueValues = async (
  device: { id: string; tenant_id: string },
  deviceKey: string,
  values: Record<string, unknown>,
  timestamp: number,
  type: QueueMessageType
) => {
  await telemetryQueue.enqueue({
    type,
    tenantId: device.tenant_id,
    deviceId: device.id,
    deviceKey,
    ts: timestamp,
    values
  });
};

const touchManagedDevices = async (gateway: any) => {
  const info = (gateway.additional_info as Record<string, any>) || {};
  if (!info.overwriteActivityTime) return;
  const relations = await prisma.relation.findMany({
    where: {
      from_id: gateway.id,
      from_type: 'DEVICE',
      to_type: 'DEVICE',
      relation_type_group: 'COMMON',
      relation_type: 'Contains'
    },
    select: { to_id: true }
  });
  const devices = await prisma.devices.findMany({ where: { id: { in: relations.map(item => item.to_id) } } });
  await Promise.all(devices.map(device => markActivity(device, { active: true })));
};

export const processGatewayMessage = async (username: string, topic: string, rawPayload: unknown) => {
  if (!gatewayTopics.has(topic)) return fail(`Topic Gateway chua duoc ho tro: ${topic}`);
  const credential = await prisma.device_credentials.findUnique({
    where: { credentials_id: username },
    include: { device: true }
  });
  if (!credential) return fail('Khong tim thay Gateway credential.', 401);

  const gateway = credential.device;
  const info = (gateway.additional_info as Record<string, any>) || {};
  if (!(info.gateway ?? info.isGateway ?? false)) return fail('Credential nay khong thuoc Gateway.', 403);
  const payload = parsePayload(rawPayload);
  await markActivity(gateway, { active: true });

  if (topic === 'v1/gateway/connect') {
    const device = await ensureDownstreamDevice(gateway, payload.device, payload.type || 'default');
    await connectRelation(gateway.id, device.id);
    await markActivity(device, { connected: true });
    await touchManagedDevices(gateway);
    return { accepted: true, devices: 1 };
  }

  if (topic === 'v1/gateway/disconnect') {
    const device = await prisma.devices.findFirst({
      where: { tenant_id: gateway.tenant_id, name: payload.device }
    });
    if (!device) return { accepted: true, devices: 0 };
    await markActivity(device, { disconnected: true });
    await prisma.relation.deleteMany({
      where: {
        from_id: gateway.id,
        from_type: 'DEVICE',
        to_id: device.id,
        to_type: 'DEVICE',
        relation_type_group: 'COMMON',
        relation_type: 'Contains'
      }
    });
    return { accepted: true, devices: 1 };
  }

  let processed = 0;
  for (const [deviceName, data] of Object.entries(payload as Record<string, any>)) {
    const device = await ensureDownstreamDevice(gateway, deviceName);
    await connectRelation(gateway.id, device.id);
    const downstreamCredential = await prisma.device_credentials.findUnique({
      where: { device_id: device.id }, select: { credentials_id: true }
    });
    if (!downstreamCredential) return fail('Thiet bi downstream chua co credential.', 409);
    if (topic === 'v1/gateway/telemetry') {
      const samples = Array.isArray(data) ? data : [{ values: data }];
      for (const sample of samples) {
        if (!sample?.values || typeof sample.values !== 'object') continue;
        await enqueueValues(device, downstreamCredential.credentials_id, sample.values, Number(sample.ts) || Date.now(), 'telemetry');
        
        // PUBLISH NGUOC LAI EMQX DE FRONTEND DANG MỞ BẢNG ĐIỀU KHIỂN CÓ THỂ BẮT ĐƯỢC REALTIME
        import('./mqttClient').then(({ mqttClient }) => {
          if (mqttClient?.connected) {
            const frontendTopic = `v1/devices/${downstreamCredential.credentials_id}/telemetry`;
            mqttClient.publish(frontendTopic, JSON.stringify(sample.values), {
              properties: { userProperties: { fromGw: 'true' } }
            });
          }
        });
      }
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      await enqueueValues(device, downstreamCredential.credentials_id, data, Date.now(), 'attributes');
    }
    processed += 1;
  }
  await touchManagedDevices(gateway);
  return { accepted: true, devices: processed };
};
