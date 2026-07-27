import mqtt from 'mqtt';
import { redis } from '../redis/redisClient';

const EMQX_URL = process.env.EMQX_URL || 'mqtt://localhost:1883';

let mqttClient: mqtt.MqttClient | null = null;

export const startMqttClient = () => {
  mqttClient = mqtt.connect(EMQX_URL, {
    username: 'backend_service',
    password: process.env.BACKEND_MQTT_SECRET || 'super_secret_backend',
    clientId: `backend_service_${Math.random().toString(16).substring(2, 8)}`
  });

  mqttClient.on('connect', () => {
    console.log('✅ Connected to EMQX Broker');
    // Đăng ký chủ đề: v1/devices/{device_key}/telemetry
    mqttClient?.subscribe('v1/devices/+/telemetry', (err) => {
      if (!err) {
        console.log('📡 Subscribed to topic: v1/devices/+/telemetry');
      }
    });
  });

  mqttClient.on('message', async (topic, message) => {
    try {
      console.log(`[MQTT] Đã nhận tin nhắn từ Topic: ${topic}`);
      // Lọc bỏ dấu '/' ở cuối nếu có
      const cleanTopic = topic.endsWith('/') ? topic.slice(0, -1) : topic;
      const parts = cleanTopic.split('/');
      
      // Format: v1/devices/<DEVICE_KEY>/telemetry
      if (parts.length === 4 && parts[0] === 'v1' && parts[1] === 'devices' && parts[3] === 'telemetry') {
        const deviceKey = parts[2];
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
    const topic = `v1/sys/refine/${channel}/${type}`;
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

