import mqtt from 'mqtt';
import { redis } from '../redis/redisClient';

const EMQX_URL = process.env.EMQX_URL || 'mqtt://localhost:1883';

let mqttClient: mqtt.MqttClient | null = null;

export const startMqttClient = () => {
  mqttClient = mqtt.connect(EMQX_URL);

  mqttClient.on('connect', () => {
    console.log('✅ Connected to EMQX Broker');
    // Đăng ký chủ đề: telemetry/{device_key}
    // Thiết bị sẽ gửi dữ liệu lên chủ đề telemetry/ABCD123
    mqttClient?.subscribe('telemetry/+', (err) => {
      if (!err) {
        console.log('📡 Subscribed to topic: telemetry/+');
      }
    });
  });

  mqttClient.on('message', async (topic, message) => {
    try {
      console.log(`[MQTT] Đã nhận tin nhắn từ Topic: ${topic}`);
      // Lọc bỏ dấu '/' ở cuối nếu có
      const cleanTopic = topic.endsWith('/') ? topic.slice(0, -1) : topic;
      const parts = cleanTopic.split('/');
      
      if (parts[0] === 'telemetry' && parts.length === 2) {
        const deviceKey = parts[1];
        console.log(`[MQTT] Payload nhận được: ${message.toString()}`);
        const payload = JSON.parse(message.toString());

        // Thay vì ghi trực tiếp vào DB, ta đẩy vào Redis Queue
        // Payload có thể là { temperature: 25.5, humidity: 60 }
        
        // Ta gom device_key, dữ liệu và thời gian hiện tại thành 1 gói tin
        for (const [key, value] of Object.entries(payload)) {
          const queueItem = {
            deviceKey,
            key,
            bool_v: typeof value === 'boolean' ? value : null,
            str_v: typeof value === 'string' ? value : null,
            long_v: typeof value === 'number' && Number.isInteger(value) ? value : null,
            dbl_v: typeof value === 'number' && !Number.isInteger(value) ? value : null,
            ts: new Date().getTime()
          };

          // LPUSH vào danh sách 'telemetry_queue'
          await redis.lpush('telemetry_queue', JSON.stringify(queueItem));
        }
      }
    } catch (err) {
      console.error('❌ Error processing MQTT message:', err);
    }
  });

  mqttClient.on('error', (err) => {
    console.error('❌ MQTT Connection Error:', err);
  });
};

export const publishLiveEvent = (channel: string, type: string, payload: any) => {
  if (mqttClient && mqttClient.connected) {
    const topic = `refine/${channel}/${type}`;
    const message = JSON.stringify({
      channel,
      type,
      payload,
      date: new Date().toISOString()
    });
    mqttClient.publish(topic, message, { qos: 0 });
    console.log(`[LIVE EVENT] Đã phát thông báo lên topic: ${topic}`);
  }
};

