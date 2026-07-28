import mqtt from 'mqtt';
import { redis } from '../redis/redisClient';

/**
 * ============================================================================
 * MODULE: MQTT CLIENT (Người Gác Cổng Nhận Dữ Liệu Từ EMQX)
 * ============================================================================
 * Nhiệm vụ:
 * - Kết nối trực tiếp với máy chủ EMQX Broker (Trạm thu phí).
 * - Lắng nghe (Subscribe) toàn bộ dữ liệu mà các thiết bị gửi lên qua giao thức MQTT.
 * - Nhận dữ liệu -> Bóc tách -> Chuyển đổi định dạng -> Đẩy lên băng chuyền Redis.
 * - Ngoài ra, module này còn đóng vai trò "Phát thanh viên" (Publisher) để báo
 *   cho Giao diện Web (Frontend) biết khi có sự thay đổi (Thêm/Sửa/Xóa thiết bị).
 */

// Địa chỉ kết nối đến EMQX. Nếu chạy thật trên K3s, nó sẽ dùng tên service nội bộ.
const EMQX_URL = process.env.EMQX_URL || 'mqtt://localhost:1883';

let mqttClient: mqtt.MqttClient | null = null;

/**
 * Hàm khởi động MQTT Client (Gọi khi Backend bắt đầu chạy)
 */
export const startMqttClient = () => {
  // Thực hiện kết nối tới EMQX với tư cách là 'backend_service' (Quản trị viên)
  mqttClient = mqtt.connect(EMQX_URL, {
    username: 'backend_service', // Tài khoản siêu quyền được EMQX tin tưởng
    password: process.env.BACKEND_MQTT_SECRET || 'super_secret_backend',
    clientId: `backend_service_${Math.random().toString(16).substring(2, 8)}` // Tạo ID ngẫu nhiên để không bị trùng
  });

  /**
   * Bắt sự kiện: Kết nối tới EMQX thành công
   */
  mqttClient.on('connect', () => {
    console.log('✅ Connected to EMQX Broker');
    
    // Đăng ký nghe lén (Subscribe) tất cả các kênh dữ liệu (telemetry) của toàn bộ thiết bị
    // Dấu '+' ở đây là wildcard, đại diện cho bất kỳ mã thiết bị nào.
    mqttClient?.subscribe('v1/devices/+/telemetry', (err) => {
      if (!err) {
        console.log('📡 Subscribed to topic: v1/devices/+/telemetry');
      }
    });
    
    // Đăng ký nhận Attributes từ thiết bị
    mqttClient?.subscribe('v1/devices/+/attributes', (err) => {
      if (!err) {
        console.log('📡 Subscribed to topic: v1/devices/+/attributes');
      }
    });
  });

  /**
   * Bắt sự kiện: Có một kiện hàng (Tin nhắn) chạy tới từ thiết bị
   */
  mqttClient.on('message', async (topic, message) => {
    try {
      console.log(`[MQTT] Đã nhận tin nhắn từ Topic: ${topic}`);
      
      // BƯỚC 1: Dọn dẹp chuỗi topic (Loại bỏ dấu gạch chéo ở cuối nếu dư thừa)
      const cleanTopic = topic.endsWith('/') ? topic.slice(0, -1) : topic;
      // Chẻ chuỗi topic ra thành mảng: ["v1", "devices", "MA_THIET_BI", "telemetry"]
      const parts = cleanTopic.split('/');
      
      // BƯỚC 2: Kiểm tra cấu trúc Topic xem có đúng chuẩn không
      // Format chuẩn: v1/devices/<DEVICE_KEY>/telemetry hoặc v1/devices/<DEVICE_KEY>/attributes
      if (parts.length === 4 && parts[0] === 'v1' && parts[1] === 'devices' && (parts[3] === 'telemetry' || parts[3] === 'attributes')) {
        const deviceKey = parts[2]; // Lấy Mã Thiết Bị từ chuỗi
        const msgType = parts[3]; // 'telemetry' hoặc 'attributes'
        console.log(`[MQTT] Payload nhận được (${msgType}): ${message.toString()}`);
        
        // Mở hộp dữ liệu (Parse JSON)
        // Ví dụ dữ liệu: { "temperature": 25.5, "humidity": 60 }
        const payload = JSON.parse(message.toString());

        /**
         * BƯỚC 3: Phân tích dữ liệu & Đẩy lên Băng chuyền Redis
         * Thay vì lưu nguyên cục JSON, ta tách từng thuộc tính (Nhiệt độ riêng, Độ ẩm riêng)
         * để DB có thể truy vấn siêu nhanh và vẽ biểu đồ.
         */
        for (const [key, value] of Object.entries(payload)) {
          // Phân loại kiểu dữ liệu: Nếu là số nguyên thì cho vào long_v, số thập phân thì dbl_v...
          const queueItem = {
            deviceKey,
            key, // Tên thuộc tính (temperature)
            bool_v: typeof value === 'boolean' ? value : null,
            str_v: typeof value === 'string' ? value : null,
            long_v: typeof value === 'number' && Number.isInteger(value) ? value : null,
            dbl_v: typeof value === 'number' && !Number.isInteger(value) ? value : null,
            json_v: typeof value === 'object' && value !== null ? JSON.stringify(value) : null,
            ts: new Date().getTime() // Đóng dấu thời gian lúc nhận được hàng
          };

          if (msgType === 'telemetry') {
            // 1. Quăng mạnh kiện hàng này lên băng chuyền Redis (Lệnh LPUSH) để xử lý lô lưu vào DB
            await redis.lpush('telemetry_queue', JSON.stringify(queueItem));

            // 2. Lưu NGAY LẬP TỨC vào bộ nhớ đệm RAM (Redis Hash) để Giao diện Web lấy tốc độ 0ms
            await redis.hset(`latest_telemetry:${deviceKey}`, key, JSON.stringify(queueItem));
          } else if (msgType === 'attributes') {
            // Đẩy lên băng chuyền attributes_queue (mặc định CLIENT_SCOPE)
            await redis.lpush('attributes_queue', JSON.stringify(queueItem));
          }
        }
      }
    } catch (err) {
      console.error('❌ Error processing MQTT message:', err);
    }
  });

  // Bắt sự kiện lỗi mạng
  mqttClient.on('error', (err) => {
    console.error('❌ MQTT Connection Error:', err);
  });
};

/**
 * Hàm phát thông báo trực tiếp (Live Event) cho Giao diện Web
 * @param channel Tên bảng (Ví dụ: 'devices')
 * @param type Loại hành động (Ví dụ: 'created', 'updated', 'deleted')
 * @param payload Dữ liệu cụ thể của hành động
 * @description Khi có ai đó dùng API tạo mới hoặc xóa thiết bị, Backend sẽ gọi hàm này
 * để phát loa thông báo qua MQTT. Giao diện Frontend Refine (đang ngồi nghe) sẽ nhận được
 * và tự động cập nhật lại danh sách trên màn hình mà không cần ấn F5.
 */
export const publishLiveEvent = (channel: string, type: string, payload: any) => {
  if (mqttClient && mqttClient.connected) {
    const topic = `v1/sys/refine/${channel}/${type}`; // Chủ đề dành riêng cho Frontend (Refine)
    const message = JSON.stringify({
      channel,
      type,
      payload,
      date: new Date().toISOString()
    });
    
    // Phát thông báo lên EMQX (QoS 0: Bắn một lần rồi quên, siêu tốc độ)
    mqttClient.publish(topic, message, { qos: 0 });
    console.log(`[LIVE EVENT] Đã phát thông báo lên topic: ${topic}`);
  }
};


export const publishSharedAttributes = (deviceKey: string, payload: any) => {
  if (mqttClient && mqttClient.connected) {
    const topic = `v1/devices/${deviceKey}/attributes/response/shared`;
    const message = JSON.stringify(payload);
    mqttClient.publish(topic, message, { qos: 1 });
    console.log(`[SHARED ATTRIBUTES] Da push xuong ${topic}: ${message}`);
  }
};
