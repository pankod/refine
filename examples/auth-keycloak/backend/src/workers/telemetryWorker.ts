import os from 'os';
import { Prisma, PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  DeviceQueueMessage,
  QueueDelivery,
  QueueMessageType,
  telemetryQueue
} from '../queue/telemetryQueue';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const BATCH_SIZE = Math.max(1, parseInt(process.env.TELEMETRY_BATCH_SIZE || '1000', 10));
const PROCESS_INTERVAL_MS = Math.max(25, parseInt(process.env.TELEMETRY_PROCESS_INTERVAL_MS || '200', 10));
const CLAIM_INTERVAL_MS = Math.max(5_000, parseInt(process.env.REDIS_STREAM_CLAIM_INTERVAL_MS || '30000', 10));
const CONSUMER_NAME = `${os.hostname()}-${process.pid}`;

type ValueRow = Prisma.telemetry_kvCreateManyInput;

const toValueColumns = (value: unknown) => ({
  bool_v: typeof value === 'boolean' ? value : null,
  str_v: typeof value === 'string' ? value : null,
  long_v: typeof value === 'number' && Number.isInteger(value) ? BigInt(value) : null,
  dbl_v: typeof value === 'number' && !Number.isInteger(value) ? value : null,
  json_v: typeof value === 'object' && value !== null ? value as Prisma.InputJsonValue : null
});

const validateMessage = (message: DeviceQueueMessage, expectedType: QueueMessageType): void => {
  if (message.type !== expectedType || !message.deviceId || !message.tenantId || !message.deviceKey) {
    throw new Error('Queue message thieu device/tenant identity hoac sai loai.');
  }
  if (!Number.isFinite(message.ts) || !message.values || typeof message.values !== 'object' || Array.isArray(message.values)) {
    throw new Error('Queue message co timestamp/payload khong hop le.');
  }
};

const updateActivityBatch = async (tx: any, messages: DeviceQueueMessage[]): Promise<void> => {
  const latestByDevice = new Map<string, number>();
  for (const message of messages) {
    latestByDevice.set(message.deviceId, Math.max(latestByDevice.get(message.deviceId) || 0, message.ts));
  }
  if (!latestByDevice.size) return;
  const rows = [...latestByDevice].map(([entity_id, last_update_ts]) => ({
    entity_id,
    long_v: last_update_ts,
    last_update_ts
  }));
  await tx.$executeRaw`
    INSERT INTO attribute_kv
      (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
    SELECT 'DEVICE', x.entity_id::uuid, 'SERVER_SCOPE', v.attribute_key,
      v.bool_v, NULL, v.long_v, NULL, NULL, x.last_update_ts
    FROM jsonb_to_recordset(${JSON.stringify(rows)}::jsonb)
      AS x(entity_id text, long_v bigint, last_update_ts bigint)
    CROSS JOIN LATERAL (VALUES
      ('lastActivityTime'::text, NULL::boolean, x.long_v),
      ('active'::text, true, NULL::bigint)
    ) AS v(attribute_key, bool_v, long_v)
    ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
    DO UPDATE SET
      bool_v = CASE WHEN EXCLUDED.attribute_key = 'active' THEN true ELSE attribute_kv.bool_v END,
      long_v = CASE WHEN EXCLUDED.attribute_key = 'lastActivityTime'
        THEN GREATEST(attribute_kv.long_v, EXCLUDED.long_v) ELSE attribute_kv.long_v END,
      last_update_ts = GREATEST(attribute_kv.last_update_ts, EXCLUDED.last_update_ts);
  `;
  await tx.$executeRaw`
    UPDATE devices
    SET additional_info = COALESCE(additional_info, '{}'::jsonb) || '{"status":"online"}'::jsonb
    WHERE id IN (
      SELECT x.entity_id::uuid
      FROM jsonb_to_recordset(${JSON.stringify(rows)}::jsonb)
        AS x(entity_id text, long_v bigint, last_update_ts bigint)
    )
      AND COALESCE(additional_info->>'status', 'offline') <> 'online';
  `;
};

const persistTelemetry = async (messages: DeviceQueueMessage[]): Promise<number> => {
  const rows: ValueRow[] = messages.flatMap(message =>
    Object.entries(message.values).map(([key, value]) => {
      const columns = toValueColumns(value);
      return {
        entity_id: message.deviceId,
        key,
        ts: new Date(message.ts),
        ...columns,
        json_v: columns.json_v ?? Prisma.DbNull
      };
    })
  );
  await prisma.$transaction(async tx => {
    if (rows.length) {
      await tx.telemetry_kv.createMany({ data: rows, skipDuplicates: true });
    }
    await updateActivityBatch(tx, messages);
  });
  return rows.length;
};

const persistAttributes = async (messages: DeviceQueueMessage[]): Promise<number> => {
  // Cung device/key trong mot batch chi giu sample moi nhat, tranh PostgreSQL
  // bao loi ON CONFLICT update cung mot row hai lan trong mot statement.
  const latest = new Map<string, Record<string, unknown>>();
  for (const message of messages) {
    for (const [key, value] of Object.entries(message.values)) {
      const columns = toValueColumns(value);
      const dedupeKey = `${message.deviceId}:${key}`;
      const old = latest.get(dedupeKey);
      if (!old || Number(old.last_update_ts) <= message.ts) {
        latest.set(dedupeKey, {
          entity_id: message.deviceId,
          attribute_key: key,
          bool_v: columns.bool_v,
          str_v: columns.str_v,
          long_v: columns.long_v?.toString() ?? null,
          dbl_v: columns.dbl_v,
          json_v: columns.json_v,
          last_update_ts: message.ts
        });
      }
    }
  }
  const rows = [...latest.values()];
  await prisma.$transaction(async tx => {
    if (rows.length) {
      await tx.$executeRaw`
        INSERT INTO attribute_kv
          (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
        SELECT 'DEVICE', x.entity_id::uuid, 'CLIENT_SCOPE', x.attribute_key,
          x.bool_v, x.str_v, x.long_v, x.dbl_v, x.json_v, x.last_update_ts
        FROM jsonb_to_recordset(${JSON.stringify(rows)}::jsonb)
          AS x(entity_id text, attribute_key text, bool_v boolean, str_v text,
               long_v bigint, dbl_v double precision, json_v jsonb, last_update_ts bigint)
        ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
        DO UPDATE SET bool_v = EXCLUDED.bool_v, str_v = EXCLUDED.str_v,
          long_v = EXCLUDED.long_v, dbl_v = EXCLUDED.dbl_v, json_v = EXCLUDED.json_v,
          last_update_ts = EXCLUDED.last_update_ts
        WHERE attribute_kv.last_update_ts <= EXCLUDED.last_update_ts;
      `;
    }
    await updateActivityBatch(tx, messages);
  });
  return rows.length;
};

const handleBatch = async (type: QueueMessageType, deliveries: QueueDelivery[]): Promise<void> => {
  if (!deliveries.length) return;
  const valid: QueueDelivery[] = [];
  for (const delivery of deliveries) {
    try {
      validateMessage(delivery.message, type);
      valid.push(delivery);
    } catch (error) {
      await telemetryQueue.fail(delivery, error);
    }
  }
  if (!valid.length) return;

  // Mot batch lookup bao dam device van ton tai va van thuoc dung tenant tai
  // thoi diem commit. Tranh telemetry mo coi neu device bi xoa khi message dang pending.
  const deviceIds = [...new Set(valid.map(item => item.message.deviceId))];
  const devices = await prisma.devices.findMany({
    where: { id: { in: deviceIds } },
    select: { id: true, tenant_id: true }
  });
  const tenantByDevice = new Map(devices.map(device => [device.id, device.tenant_id]));
  const authorized: QueueDelivery[] = [];
  for (const delivery of valid) {
    if (tenantByDevice.get(delivery.message.deviceId) === delivery.message.tenantId) {
      authorized.push(delivery);
    } else {
      await telemetryQueue.fail(delivery, new Error('Device khong ton tai hoac tenant identity khong khop.'));
    }
  }
  if (!authorized.length) return;

  try {
    const messages = authorized.map(item => item.message);
    const persisted = type === 'telemetry'
      ? await persistTelemetry(messages)
      : await persistAttributes(messages);
    await telemetryQueue.ack(authorized);
    console.log(`[QueueWorker] ${type}: committed ${persisted} values from ${authorized.length} messages`);
  } catch (error) {
    const results = await Promise.all(authorized.map(item => telemetryQueue.fail(item, error)));
    const deadLetters = results.filter(result => result === 'dead-letter').length;
    console.error(`[QueueWorker] ${type} batch failed; retry=${authorized.length - deadLetters}, dlq=${deadLetters}`, error);
  }
};

export const startTelemetryWorker = (): void => {
  console.log(`[QueueWorker] Starting Redis Streams consumer ${CONSUMER_NAME}, batch=${BATCH_SIZE}`);
  let stopped = false;
  let lastClaimAt = 0;

  const run = async () => {
    try {
      await telemetryQueue.initialize();
      while (!stopped) {
        const now = Date.now();
        const shouldClaim = now - lastClaimAt >= CLAIM_INTERVAL_MS;
        const [telemetry, attributes] = await Promise.all([
          shouldClaim
            ? telemetryQueue.claimStale('telemetry', CONSUMER_NAME, BATCH_SIZE)
            : telemetryQueue.read('telemetry', CONSUMER_NAME, BATCH_SIZE),
          shouldClaim
            ? telemetryQueue.claimStale('attributes', CONSUMER_NAME, BATCH_SIZE)
            : telemetryQueue.read('attributes', CONSUMER_NAME, BATCH_SIZE)
        ]);
        if (shouldClaim) lastClaimAt = now;
        await Promise.all([
          handleBatch('telemetry', telemetry),
          handleBatch('attributes', attributes)
        ]);
        if (!telemetry.length && !attributes.length) {
          await new Promise(resolve => setTimeout(resolve, PROCESS_INTERVAL_MS));
        }
      }
    } catch (error) {
      console.error('[QueueWorker] Fatal loop error, restarting in 5s:', error);
      setTimeout(run, 5_000);
    }
  };

  void run();
  process.once('SIGTERM', () => { stopped = true; });
  process.once('SIGINT', () => { stopped = true; });
};
