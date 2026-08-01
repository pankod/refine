import Redis, { RedisOptions } from 'ioredis';

/**
 * ============================================================================
 * MODULE: REDIS CLIENT (Bộ Đệm / Hàng Đợi Tốc Độ Cao)
 * ============================================================================
 * Nhiệm vụ:
 * - Đóng vai trò là "Băng chuyền" (Message Queue) trung gian giữa EMQX (Trạm thu phí)
 *   và Database (Kho hàng).
 * - Giảm tải cho Database: Khi có hàng chục ngàn thiết bị gửi dữ liệu lên cùng lúc,
 *   thay vì ghi trực tiếp vào DB làm sập DB, dữ liệu sẽ được nhét vào bộ nhớ tạm (RAM) của Redis.
 * - Hỗ trợ chuẩn Production: Tự động chuyển đổi giữa chế độ Standalone (khi chạy Dev ở máy tính)
 *   và chế độ Sentinel (Cụm Redis rải rác chạy trên K3s để đảm bảo không bao giờ sập).
 */

// Đọc cấu hình từ biến môi trường (Environment Variables)
const REDIS_SENTINEL_HOST = process.env.REDIS_SENTINEL_HOST;
const REDIS_SENTINEL_PORT = process.env.REDIS_SENTINEL_PORT ? parseInt(process.env.REDIS_SENTINEL_PORT) : 26379;
const REDIS_MASTER_NAME = process.env.REDIS_MASTER_NAME || 'mymaster';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// Nếu không cấu hình Sentinel, sẽ chạy ở chế độ Standalone (mặc định cho Dev: redis://localhost:6379)
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const REDIS_QUEUE_URL = process.env.REDIS_QUEUE_URL || REDIS_URL;

const commonOptions: RedisOptions = {
  enableReadyCheck: true,
  maxRetriesPerRequest: 3,
  retryStrategy: (attempt) => Math.min(attempt * 250, 5000)
};

const createRedisClient = (url: string, clientName: string): Redis => {
  if (REDIS_SENTINEL_HOST && url === REDIS_URL) {
    return new Redis({
      ...commonOptions,
      sentinels: [{ host: REDIS_SENTINEL_HOST, port: REDIS_SENTINEL_PORT }],
      name: REDIS_MASTER_NAME,
      password: REDIS_PASSWORD,
      sentinelPassword: REDIS_PASSWORD,
      connectionName: clientName
    });
  }
  return new Redis(url, { ...commonOptions, connectionName: clientName });
};

// Tự động kiểm tra: Nếu có cấu hình Sentinel (Chạy trên K3s) thì ưu tiên dùng Sentinel
const redisClient = createRedisClient(REDIS_URL, 'greeniq-cache');
const queueRedisClient = REDIS_QUEUE_URL === REDIS_URL
  ? redisClient
  : createRedisClient(REDIS_QUEUE_URL, 'greeniq-queue');

/**
 * Đối tượng `redis` được khởi tạo (Singleton Pattern).
 * Mọi file khác trong dự án khi import `redis` đều dùng chung kết nối này, giúp tiết kiệm tài nguyên.
 */
export const redis = redisClient;

/**
 * Ket noi rieng cho durable queue. Production nen dat REDIS_QUEUE_URL tro toi
 * Redis co AOF + noeviction; cache co the dung TTL/eviction doc lap.
 */
export const queueRedis = queueRedisClient;

/**
 * Bắt sự kiện: Kết nối thành công.
 * Sẽ in ra log để báo hiệu hệ thống đã sẵn sàng làm "Băng chuyền".
 */
redis.on('ready', () => {
  console.log('✅ Redis cache sẵn sàng');
});

if (queueRedis !== redis) {
  queueRedis.on('ready', () => console.log('✅ Redis queue sẵn sàng'));
}

/**
 * Bắt sự kiện: Mất kết nối hoặc lỗi.
 * Rất quan trọng để theo dõi sức khỏe của hệ thống.
 */
let lastErrorLogAt = 0;
redis.on('error', (err) => {
  const now = Date.now();
  if (now - lastErrorLogAt >= 10_000) {
    console.error(`❌ Redis chưa sẵn sàng: ${err.message}`);
    lastErrorLogAt = now;
  }
});

if (queueRedis !== redis) {
  queueRedis.on('error', (err) => {
    const now = Date.now();
    if (now - lastErrorLogAt >= 10_000) {
      console.error(`❌ Redis queue chưa sẵn sàng: ${err.message}`);
      lastErrorLogAt = now;
    }
  });
}
