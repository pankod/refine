import { useEffect, useState, useRef } from "react";
import mqtt, { MqttClient, IClientOptions } from "mqtt";
import { message } from "antd";

interface UseMqttProps {
  url?: string;
  topic?: string;
  options?: IClientOptions;
  username?: string;
  password?: string;
}

export const useMqtt = ({
  url = import.meta.env.VITE_MQTT_URL || "wss://mqtt.greeniq.vn/mqtt",
  topic = "v1/devices/me/telemetry",
  options,
  username,
  password
}: UseMqttProps) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [payload, setPayload] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Giu MQTT connection on dinh, chi doi subscription khi topic thay doi.
  const currentTopic = useRef(topic);

  useEffect(() => {
    currentTopic.current = topic;
  }, [topic]);

  useEffect(() => {
    if (!client?.connected || !topic) return;
    client.subscribe(topic);
    return () => {
      client.unsubscribe(topic);
    };
  }, [client, topic]);

  useEffect(() => {
    const defaultOptions: IClientOptions = {
      username: 'frontend_readonly',
      password: 'public_frontend_token',
      keepalive: 60,
      clientId: `refine_client_${Math.random().toString(16).substring(2, 8)}`,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 5000,
      connectTimeout: 30 * 1000,
      ...options,
    };

    console.log(`Đang kết nối tới MQTT Broker: ${url}`);
    const mqttClient = mqtt.connect(url, defaultOptions);

    mqttClient.on("connect", () => {
      console.log("Đã kết nối thành công tới MQTT Broker");
      setIsConnected(true);
      // message.success("Kết nối MQTT Realtime thành công!"); // Bỏ comment nếu muốn toast

      if (currentTopic.current) {
        mqttClient.subscribe(currentTopic.current, (err) => {
          if (!err) {
            console.log(`Đã subscribe thành công vào topic: ${currentTopic.current}`);
          } else {
            console.error(`Lỗi subscribe topic: ${currentTopic.current}`, err);
          }
        });
      }
    });

    mqttClient.on("error", (err) => {
      console.error("Lỗi kết nối MQTT: ", err);
      // Không gọi mqttClient.end() ở đây để tự động reconnect
    });

    mqttClient.on("reconnect", () => {
      console.log("Đang thử kết nối lại MQTT...");
    });

    mqttClient.on("message", (receivedTopic, messageBuffer) => {
      // Khi có bản tin MQTT đẩy về
      if (currentTopic.current && receivedTopic === currentTopic.current) {
        try {
          const data = JSON.parse(messageBuffer.toString());
          setPayload(data);
        } catch (e) {
          console.error("Lỗi parse dữ liệu MQTT:", e);
        }
      }
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [url]); // Chỉ re-run khi URL thay đổi (tránh render lại nhiều)

  return { client, payload, isConnected };
};
