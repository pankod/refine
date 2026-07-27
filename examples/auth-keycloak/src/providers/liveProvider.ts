import { LiveProvider, LiveEvent } from "@refinedev/core";
import mqtt from "mqtt";

export const liveProvider = (url: string): LiveProvider => {
  const client = mqtt.connect(url, {
    username: 'frontend_readonly',
    password: 'public_frontend_token',
    clientId: `refine_live_${Math.random().toString(16).substring(2, 8)}`
  });

  client.on("connect", () => {
    console.log("✅ LiveProvider: Connected to MQTT Broker");
  });

  client.on("error", (err) => {
    console.error("❌ LiveProvider: MQTT Connection Error:", err);
  });

  return {
    subscribe: ({ channel, types, params, callback }) => {
      const subscriptions: string[] = [];

      types.forEach((type) => {
        // Topic có dạng v1/sys/refine/{channel}/{type}
        const topic = `v1/sys/refine/${channel}/${type === "*" ? "+" : type}`;
        client.subscribe(topic);
        subscriptions.push(topic);
      });

      const messageHandler = (topic: string, message: Buffer) => {
        // Kiểm tra xem topic có khớp với các pattern đã subscribe không
        // Đối với wildcard '+', chúng ta cần kiểm tra linh hoạt hơn, nhưng đơn giản nhất là kiểm tra channel
        const parts = topic.split('/');
        if (parts.length >= 5 && parts[0] === 'v1' && parts[1] === 'sys' && parts[2] === 'refine' && parts[3] === channel) {
          const type = parts[4] as LiveEvent['type'];
          
          try {
            const data = JSON.parse(message.toString());
            
            callback({
              channel,
              type,
              payload: data.payload,
              date: new Date(data.date),
            });
          } catch (e) {
            console.error("LiveProvider: Lỗi phân tích cú pháp bản tin MQTT", e);
          }
        }
      };

      client.on("message", messageHandler);

      // Trả về thông tin để unsubscribe sau này
      return { subscriptions, messageHandler };
    },
    unsubscribe: (payload) => {
      const { subscriptions, messageHandler } = payload as any;
      subscriptions.forEach((topic: string) => {
        client.unsubscribe(topic);
      });
      client.removeListener("message", messageHandler);
    },
    publish: (event: LiveEvent) => {
      // (Optional) Cho phép Frontend chủ động đẩy sự kiện lên
      const topic = `v1/sys/refine/${event.channel}/${event.type}`;
      client.publish(topic, JSON.stringify({
        payload: event.payload,
        date: event.date.toISOString()
      }));
    }
  };
};
