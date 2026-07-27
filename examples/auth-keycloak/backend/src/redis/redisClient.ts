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

let redisConfig: RedisOptions | string = REDIS_URL;

// Tự động kiểm tra: Nếu có cấu hình Sentinel (Chạy trên K3s) thì ưu tiên dùng Sentinel
if (REDIS_SENTINEL_HOST) {
  redisConfig = {
    sentinels: [{ host: REDIS_SENTINEL_HOST, port: REDIS_SENTINEL_PORT }],
    name: REDIS_MASTER_NAME,
    password: REDIS_PASSWORD,
    sentinelPassword: REDIS_PASSWORD,
  };
}

/**
 * Đối tượng `redis` được khởi tạo (Singleton Pattern).
 * Mọi file khác trong dự án khi import `redis` đều dùng chung kết nối này, giúp tiết kiệm tài nguyên.
 */
export const redis = new Redis(redisConfig as any);

/**
 * Bắt sự kiện: Kết nối thành công.
 * Sẽ in ra log để báo hiệu hệ thống đã sẵn sàng làm "Băng chuyền".
 */
redis.on('connect', () => {
  console.log('✅ Connected to Redis (Message Queue)');
});

/**
 * Bắt sự kiện: Mất kết nối hoặc lỗi.
 * Rất quan trọng để theo dõi sức khỏe của hệ thống.
 */
redis.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err);
});
