import crypto from 'crypto';
import { queueRedis, redis } from '../redis/redisClient';

export type QueueMessageType = 'telemetry' | 'attributes';

export interface DeviceQueueMessage {
  messageId: string;
  type: QueueMessageType;
  tenantId: string;
  deviceId: string;
  deviceKey: string;
  ts: number;
  values: Record<string, unknown>;
}

export interface QueueDelivery {
  stream: string;
  id: string;
  message: DeviceQueueMessage;
}

export interface TelemetryQueue {
  initialize(): Promise<void>;
  enqueue(message: Omit<DeviceQueueMessage, 'messageId'>): Promise<string>;
  read(type: QueueMessageType, consumer: string, count: number): Promise<QueueDelivery[]>;
  claimStale(type: QueueMessageType, consumer: string, count: number): Promise<QueueDelivery[]>;
  ack(deliveries: QueueDelivery[]): Promise<void>;
  fail(delivery: QueueDelivery, error: unknown): Promise<'retry' | 'dead-letter'>;
  stats(): Promise<Record<QueueMessageType, { entries: number; pending: number; deadLetters: number }>>;
}

const SHARD_COUNT = Math.max(1, parseInt(process.env.REDIS_STREAM_SHARDS || '16', 10));
const GROUP = process.env.REDIS_STREAM_GROUP || 'postgres-writers-v1';
const MAX_RETRIES = Math.max(1, parseInt(process.env.REDIS_STREAM_MAX_RETRIES || '5', 10));
const CLAIM_IDLE_MS = Math.max(1_000, parseInt(process.env.REDIS_STREAM_CLAIM_IDLE_MS || '30000', 10));
const MAX_LENGTH = Math.max(10_000, parseInt(process.env.REDIS_STREAM_MAX_LENGTH || '1000000', 10));

const shardFor = (tenantId: string, deviceId: string): number => {
  const digest = crypto.createHash('sha256').update(`${tenantId}:${deviceId}`).digest();
  return digest.readUInt32BE(0) % SHARD_COUNT;
};

const streamName = (type: QueueMessageType, shard: number) =>
  `greeniq:queue:${type}:{${shard.toString().padStart(2, '0')}}`;

const streamNames = (type: QueueMessageType) =>
  Array.from({ length: SHARD_COUNT }, (_, shard) => streamName(type, shard));

const decodeEntries = (stream: string, entries: Array<[string, string[]]> | null): QueueDelivery[] => {
  if (!entries) return [];
  const result: QueueDelivery[] = [];
  for (const [id, fields] of entries) {
    const dataIndex = fields.indexOf('data');
    if (dataIndex < 0 || !fields[dataIndex + 1]) continue;
    result.push({ stream, id, message: JSON.parse(fields[dataIndex + 1]) as DeviceQueueMessage });
  }
  return result;
};

class RedisStreamsTelemetryQueue implements TelemetryQueue {
  async initialize(): Promise<void> {
    for (const type of ['telemetry', 'attributes'] as QueueMessageType[]) {
      await Promise.all(streamNames(type).map(async stream => {
        try {
          await queueRedis.xgroup('CREATE', stream, GROUP, '0', 'MKSTREAM');
        } catch (error: any) {
          if (!String(error?.message).includes('BUSYGROUP')) throw error;
        }
      }));
    }
  }

  async enqueue(input: Omit<DeviceQueueMessage, 'messageId'>): Promise<string> {
    const message: DeviceQueueMessage = { ...input, messageId: crypto.randomUUID() };
    const stream = streamName(input.type, shardFor(input.tenantId, input.deviceId));
    const pipeline = queueRedis.pipeline();
    // Khong trim tai day: MAXLEN co the xoa ca message dang pending. Entry chi
    // duoc xoa sau khi PostgreSQL commit va consumer da XACK thanh cong.
    pipeline.xadd(stream, '*', 'data', JSON.stringify(message));

    // Latest telemetry la cache, khong phai queue. Khi dung hai Redis rieng,
    // cap nhat cache bang pipeline doc lap de queue van co durability rieng.
    let cachePipeline: ReturnType<typeof redis.pipeline> | null = null;
    if (input.type === 'telemetry') {
      cachePipeline = redis.pipeline();
      for (const [key, value] of Object.entries(input.values)) {
        cachePipeline.hset(`latest_telemetry:${input.deviceKey}`, key, JSON.stringify({
          deviceKey: input.deviceKey,
          key,
          bool_v: typeof value === 'boolean' ? value : null,
          str_v: typeof value === 'string' ? value : null,
          long_v: typeof value === 'number' && Number.isInteger(value) ? value : null,
          dbl_v: typeof value === 'number' && !Number.isInteger(value) ? value : null,
          json_v: typeof value === 'object' && value !== null ? JSON.stringify(value) : null,
          ts: input.ts
        }));
      }
    }

    const [queueResult] = await Promise.all([pipeline.exec(), cachePipeline?.exec()]);
    const xaddResult = queueResult?.[0];
    if (!xaddResult || xaddResult[0]) throw xaddResult?.[0] || new Error('Redis XADD khong tra ve stream ID.');
    return String(xaddResult[1]);
  }

  async read(type: QueueMessageType, consumer: string, count: number): Promise<QueueDelivery[]> {
    const perShard = Math.max(1, Math.ceil(count / SHARD_COUNT));
    const batches = await Promise.all(streamNames(type).map(async stream => {
      const response = await queueRedis.xreadgroup('GROUP', GROUP, consumer, 'COUNT', perShard, 'STREAMS', stream, '>') as any;
      if (!response?.[0]) return [];
      return decodeEntries(stream, response[0][1]);
    }));
    return batches.flat();
  }

  async claimStale(type: QueueMessageType, consumer: string, count: number): Promise<QueueDelivery[]> {
    const perShard = Math.max(1, Math.ceil(count / SHARD_COUNT));
    const batches = await Promise.all(streamNames(type).map(async stream => {
      const response = await queueRedis.xautoclaim(stream, GROUP, consumer, CLAIM_IDLE_MS, '0-0', 'COUNT', perShard) as any;
      return decodeEntries(stream, response?.[1] || []);
    }));
    return batches.flat();
  }

  async ack(deliveries: QueueDelivery[]): Promise<void> {
    const byStream = new Map<string, string[]>();
    for (const item of deliveries) byStream.set(item.stream, [...(byStream.get(item.stream) || []), item.id]);
    await Promise.all([...byStream].map(async ([stream, ids]) => {
      const pipeline = queueRedis.pipeline();
      pipeline.xack(stream, GROUP, ...ids);
      pipeline.xdel(stream, ...ids);
      pipeline.hdel(`${stream}:retries`, ...ids);
      await pipeline.exec();
    }));
  }

  async fail(delivery: QueueDelivery, error: unknown): Promise<'retry' | 'dead-letter'> {
    const retryKey = `${delivery.stream}:retries`;
    const attempts = await queueRedis.hincrby(retryKey, delivery.id, 1);
    await queueRedis.expire(retryKey, 7 * 24 * 60 * 60);
    if (attempts < MAX_RETRIES) return 'retry';

    const deadLetter = `greeniq:queue:dlq:{${delivery.message.type}}`;
    await queueRedis.xadd(
      deadLetter,
      'MAXLEN', '~', Math.max(10_000, Math.floor(MAX_LENGTH / 10)),
      '*',
      'sourceStream', delivery.stream,
      'sourceId', delivery.id,
      'error', error instanceof Error ? error.message : String(error),
      'data', JSON.stringify(delivery.message)
    );
    await this.ack([delivery]);
    return 'dead-letter';
  }

  async stats(): Promise<Record<QueueMessageType, { entries: number; pending: number; deadLetters: number }>> {
    const result = {} as Record<QueueMessageType, { entries: number; pending: number; deadLetters: number }>;
    for (const type of ['telemetry', 'attributes'] as QueueMessageType[]) {
      const values = await Promise.all(streamNames(type).map(async stream => {
        const [entries, pending] = await Promise.all([
          queueRedis.xlen(stream),
          queueRedis.xpending(stream, GROUP) as Promise<any>
        ]);
        return { entries, pending: Number(pending?.[0] || 0) };
      }));
      result[type] = {
        entries: values.reduce((sum, value) => sum + value.entries, 0),
        pending: values.reduce((sum, value) => sum + value.pending, 0),
        deadLetters: await queueRedis.xlen(`greeniq:queue:dlq:{${type}}`)
      };
    }
    return result;
  }
}

export const telemetryQueue: TelemetryQueue = new RedisStreamsTelemetryQueue();
