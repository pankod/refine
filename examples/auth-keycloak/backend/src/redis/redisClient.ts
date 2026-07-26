import Redis, { RedisOptions } from 'ioredis';

// Hỗ trợ cấu hình Sentinel cho môi trường Production (K3s)
const REDIS_SENTINEL_HOST = process.env.REDIS_SENTINEL_HOST;
const REDIS_SENTINEL_PORT = process.env.REDIS_SENTINEL_PORT ? parseInt(process.env.REDIS_SENTINEL_PORT) : 26379;
const REDIS_MASTER_NAME = process.env.REDIS_MASTER_NAME || 'mymaster';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// Thay đổi theo K3s service: redis hoặc dùng localhost nếu chạy dev
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redisConfig: RedisOptions | string = REDIS_URL;

if (REDIS_SENTINEL_HOST) {
  redisConfig = {
    sentinels: [{ host: REDIS_SENTINEL_HOST, port: REDIS_SENTINEL_PORT }],
    name: REDIS_MASTER_NAME,
    password: REDIS_PASSWORD,
    sentinelPassword: REDIS_PASSWORD,
  };
}

export const redis = new Redis(redisConfig as any);

redis.on('connect', () => {
  console.log('✅ Connected to Redis (Message Queue)');
});

redis.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err);
});
