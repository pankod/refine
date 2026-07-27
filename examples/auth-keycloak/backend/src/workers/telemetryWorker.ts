import { redis } from '../redis/redisClient';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * ============================================================================
 * MODULE: TELEMETRY WORKER (Nhà Máy Đóng Gói Dữ Liệu)
 * ============================================================================
 * Nhiệm vụ:
 * - Chạy ngầm liên tục ở Background.
 * - Cứ mỗi 1 giây (1000ms), nó sẽ ra lệnh "Hốt" toàn bộ dữ liệu đang nằm trên
 *   băng chuyền Redis (tối đa 1000 gói hàng/lần).
 * - Sau đó, nó mở kết nối Database 1 lần duy nhất và nhét toàn bộ 1000 gói hàng này
 *   vào bảng `telemetry_kv`.
 * 
 * Tại sao phải làm vậy?
 * - Nếu 1000 thiết bị cùng gửi dữ liệu trong 1 giây, nếu lưu trực tiếp thì Database
 *   sẽ phải mở/đóng kết nối 1000 lần -> Gây treo DB (Overload).
 * - Sử dụng Worker Gom Lô (Batching) giúp DB chỉ phải mở cửa 1 lần để cất 1000 gói.
 *   Giúp hệ thống đạt chuẩn Horizontal Scaling (Mở rộng ngang).
 */

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Số lượng gói hàng tối đa hốt từ băng chuyền mỗi lần (1000)
const BATCH_SIZE = 1000;
// Thời gian nghỉ giữa các lần hốt hàng (1000ms = 1 giây)
const PROCESS_INTERVAL_MS = 1000;

/**
 * Hàm khởi động Worker (Được gọi khi Backend khởi động)
 */
export const startTelemetryWorker = () => {
  console.log('👷 Telemetry Worker started (Batching 1000 msgs/sec)');

  // setInterval: Vòng lặp chạy vô tận, cứ mỗi 1 giây lại thực thi đoạn code bên trong
  setInterval(async () => {
    try {
      /**
       * BƯỚC 1: Đọc hàng loạt dữ liệu từ Redis (Lệnh RPOP)
       */
      const messages = [];
      for (let i = 0; i < BATCH_SIZE; i++) {
        // RPOP: Lấy phần tử nằm ở cuối danh sách (cũ nhất) và xóa nó khỏi Redis
        const msg = await redis.rpop('telemetry_queue');
        if (!msg) break; // Nếu băng chuyền trống thì dừng việc hốt
        messages.push(JSON.parse(msg)); // Bỏ vào "xe đẩy" messages
      }

      // Nếu xe đẩy không có gì thì đi ngủ tiếp
      if (messages.length === 0) return;

      console.log(`📦 Worker processing batch of ${messages.length} telemetry records...`);

      /**
       * BƯỚC 2: Kiểm tra tính hợp lệ của Thiết Bị
       * Dữ liệu từ Redis chỉ chứa deviceKey (Khóa nạp vào ESP32).
       * Ta phải dò trong Database xem Khóa này thuộc về device_id nào.
       */
      const uniqueKeys = [...new Set(messages.map(m => m.deviceKey))]; // Lọc các key trùng lặp để giảm tải truy vấn DB
      
      const credentials = await prisma.device_credentials.findMany({
        where: { credentials_id: { in: uniqueKeys } },
        select: { device_id: true, credentials_id: true }
      });

      // Tạo một từ điển (map) để tra cứu nhanh: deviceKey -> device_id
      const keyToDeviceId = credentials.reduce((acc, curr) => {
        acc[curr.credentials_id] = curr.device_id;
        return acc;
      }, {} as Record<string, string>);

      // Lọc bỏ những dữ liệu rác (do ai đó gửi lên bằng deviceKey giả mạo)
      const validMessages = messages.filter(m => keyToDeviceId[m.deviceKey]);

      if (validMessages.length === 0) {
        console.warn('⚠️ No valid devices found in this batch, dropping messages.');
        return;
      }

      /**
       * BƯỚC 3: Tìm Khách Hàng (Tenant) sở hữu Thiết Bị này
       */
      const devices = await prisma.devices.findMany({
        where: { id: { in: validMessages.map(m => keyToDeviceId[m.deviceKey]) } },
        select: { id: true, tenant_id: true }
      });

      const deviceToTenant = devices.reduce((acc, curr) => {
        acc[curr.id] = curr.tenant_id;
        return acc;
      }, {} as Record<string, string>);

      /**
       * BƯỚC 4: Định dạng lại dữ liệu chuẩn bị đưa vào Kho (telemetry_kv)
       * Bảng telemetry_kv lưu dữ liệu dạng Time-Series (Chuỗi thời gian)
       */
      const telemetryData = validMessages.map(m => {
        const deviceId = keyToDeviceId[m.deviceKey];
        const tenantId = deviceToTenant[deviceId];
        return {
          _internal_tenant_id: tenantId, // Dùng tạm để lọc, sau đó sẽ bị xóa
          entity_id: deviceId, // Mã thiết bị
          key: m.key, // Tên dữ liệu (VD: temperature)
          ts: new Date(m.ts), // Thời gian nhận
          bool_v: m.bool_v,
          str_v: m.str_v,
          long_v: m.long_v,
          dbl_v: m.dbl_v, // Giá trị số thực (VD: 30.5)
        };
      }).filter(t => t._internal_tenant_id).map(t => {
        const { _internal_tenant_id, ...rest } = t;
        return rest; // Trả về object đã xóa thuộc tính thừa
      });

      if (telemetryData.length === 0) return;

      /**
       * BƯỚC 5: Ghi Lô Dữ Liệu vào Database (Lệnh createMany)
       * Nhờ dùng createMany, cho dù có 1000 dòng dữ liệu, DB cũng chỉ xử lý 1 câu lệnh SQL.
       */
      await prisma.telemetry_kv.createMany({
        data: telemetryData,
        skipDuplicates: true // Bỏ qua nếu dữ liệu bị trùng lặp thời gian
      });

      console.log(`✅ Successfully batch inserted ${telemetryData.length} records to DB!`);

    } catch (err) {
      console.error('❌ Telemetry Worker Error:', err);
    }
  }, PROCESS_INTERVAL_MS);
};
