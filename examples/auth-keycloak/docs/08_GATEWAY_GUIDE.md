# 🌐 Hướng Dẫn Tích Hợp Gateway (ThingsBoard Chuẩn)

Tài liệu này hướng dẫn chi tiết từng bước cách lập trình và kết nối một thiết bị Gateway (ví dụ Raspberry Pi, ESP32) vào hệ thống VTA Pro IoT.

Gateway đóng vai trò là cầu nối (bridge) giữa các thiết bị con (như cảm biến Bluetooth, Zigbee, RS485/Modbus) và Server (Đám mây). Gateway sẽ đại diện cho các thiết bị con giao tiếp với Server qua giao thức MQTT.

## 1. Thông Tin Kết Nối Cơ Bản

Để Gateway kết nối được với Server, bạn cần các thông tin sau:
- **Giao thức**: MQTT (hoặc MQTT qua WebSockets)
- **Host (Máy chủ)**: `mqtt.greeniq.vn` (hoặc `localhost` nếu chạy ở môi trường dev)
- **Port**: `1883` (MQTT TCP) hoặc `8083` (MQTT WebSockets)
- **Client ID**: Bất kỳ chuỗi ngẫu nhiên nào (mỗi Gateway phải có 1 Client ID duy nhất)
- **Username**: MÃ BẢO MẬT (Device Credential) của Gateway
- **Password**: `super_secret_backend` (Hoặc tuỳ cấu hình của bạn, đối chiếu trong mục Thiết bị)

> **Lưu ý Quan Trọng**: Trên giao diện Web, khi tạo Gateway, bạn bắt buộc phải bật tuỳ chọn **"Là Gateway"**. Nếu không, Server sẽ chặn mọi bản tin thuộc namespace `v1/gateway/*`.

---

## 2. Các Topic MQTT Hỗ Trợ Cho Gateway

Hệ thống tuân thủ 100% chuẩn MQTT Gateway API của ThingsBoard PE/CE. Gateway của bạn cần Gửi (Publish) và Lắng nghe (Subscribe) các Topic sau:

### 2.1. Đăng ký (Kết nối) thiết bị con
Khi một thiết bị con (ví dụ: `Cam_Bien_Zigbee_1`) kết nối vào mạng cục bộ của Gateway, Gateway cần báo cho Server biết.

- **Topic (Gửi đi)**: `v1/gateway/connect`
- **Payload**:
  ```json
  {
    "device": "Cam_Bien_Zigbee_1",
    "type": "sensor"
  }
  ```
*Server sẽ tự động tạo một thiết bị mới tên là `Cam_Bien_Zigbee_1` (nếu chưa có) và gán nó làm thiết bị con của Gateway.*

### 2.2. Ngắt kết nối thiết bị con
Khi thiết bị con mất kết nối khỏi mạng cục bộ, Gateway cần báo lại cho Server.

- **Topic (Gửi đi)**: `v1/gateway/disconnect`
- **Payload**:
  ```json
  {
    "device": "Cam_Bien_Zigbee_1"
  }
  ```

### 2.3. Gửi Dữ liệu Đo đạc (Telemetry)
Đây là luồng dữ liệu quan trọng nhất. Gateway có thể gửi dữ liệu của một hoặc nhiều thiết bị con cùng một lúc (Batching).

- **Topic (Gửi đi)**: `v1/gateway/telemetry`
- **Payload**:
  ```json
  {
    "Cam_Bien_Zigbee_1": [
      {
        "ts": 1700000000000, 
        "values": {
          "temperature": 29.5,
          "humidity": 60
        }
      }
    ],
    "May_Bom_1": [
      {
        "values": {
          "flow_rate": 15.2,
          "status": 1
        }
      }
    ]
  }
  ```
*(Ghi chú: Trường `ts` là thời gian Timestamp tính bằng mili giây. Nếu bỏ trống, Server sẽ tự động lấy thời gian hiện tại).*

### 2.4. Gửi Thuộc tính Thiết bị (Client Attributes)
Thuộc tính là các thông số ít biến động (như phiên bản Firmware, mức Pin, địa chỉ IP).

- **Topic (Gửi đi)**: `v1/gateway/attributes`
- **Payload**:
  ```json
  {
    "Cam_Bien_Zigbee_1": {
      "firmware": "v2.0.1",
      "battery": 85,
      "ip_address": "192.168.1.101"
    }
  }
  ```

### 2.5. Lắng nghe Lệnh điều khiển (RPC) từ Server
Để Gateway có thể nhận lệnh điều khiển từ người dùng trên Web (Ví dụ: bấm nút Bật Máy Bơm), Gateway phải **đăng ký theo dõi (Subscribe)** topic này.

- **Topic (Subscribe)**: `v1/gateway/rpc`
- **Payload Server gửi xuống**:
  ```json
  {
    "device": "May_Bom_1",
    "data": {
      "id": 892312,
      "method": "setRelay",
      "params": {
        "pin": 1,
        "state": true
      }
    }
  }
  ```

### 2.6. Phản hồi Lệnh điều khiển (RPC Response)
Sau khi thực thi lệnh (Ví dụ: bật rơ le thành công), Gateway phải báo cáo kết quả về cho Server.

- **Topic (Gửi đi)**: `v1/gateway/rpc/response`
- **Payload**:
  ```json
  {
    "device": "May_Bom_1",
    "id": 892312,
    "data": {
      "success": true,
      "message": "Relay turned on successfully"
    }
  }
  ```
*(Bắt buộc: `id` trong gói phản hồi phải khớp với `id` mà Server đã gửi xuống trong lệnh RPC).*

### 2.7. Yêu cầu Cấu hình (Attributes Request)
Khi một thiết bị con vừa khởi động, nó có thể cần lấy các cấu hình từ Server (Shared Attributes) do người dùng thiết lập trên Web (Ví dụ: Ngưỡng nhiệt độ cảnh báo).

- **Topic (Gửi đi)**: `v1/gateway/attributes/request`
- **Payload**:
  ```json
  {
    "id": 1,
    "device": "Cam_Bien_Zigbee_1",
    "clientKeys": "firmware,battery",
    "sharedKeys": "targetTemperature,alarmThreshold"
  }
  ```

- **Topic nhận kết quả (Subscribe)**: `v1/gateway/attributes/response`
- **Payload Server trả về**:
  ```json
  {
    "id": 1,
    "device": "Cam_Bien_Zigbee_1",
    "value": {
      "targetTemperature": 25.0,
      "alarmThreshold": 80.0
    }
  }
  ```

---

## 3. Quy Trình Khởi Động Chuẩn (Dành cho Lập trình viên Firmware)

Khi viết code cho Gateway (ví dụ dùng Python paho-mqtt hoặc C++ PubSubClient), hãy tuân theo quy trình sau để đảm bảo hoạt động ổn định:

1. **Khởi tạo kết nối MQTT**: Kết nối tới Broker bằng Credential của Gateway. Bật cờ `clean_session=True` hoặc `False` tuỳ nhu cầu (Khuyên dùng `False` để không lỡ mất tin nhắn RPC khi mạng chập chờn).
2. **Subscribe các Topic nhận lệnh**:
   - Subscribe `v1/gateway/rpc` (QoS 1)
   - Subscribe `v1/gateway/attributes/response` (QoS 1)
3. **Đồng bộ danh sách thiết bị**: Khi Gateway khởi động, duyệt qua danh sách các thiết bị con đang kết nối thực tế. Gửi lệnh `v1/gateway/connect` cho từng thiết bị.
4. **Vòng lặp chính**:
   - Lấy dữ liệu từ cổng Serial/Modbus/Zigbee...
   - Đóng gói thành mảng JSON.
   - Publish lên `v1/gateway/telemetry`.
5. **Xử lý ngắt kết nối MQTT**: Thiết lập LWT (Last Will and Testament) hoặc tự động kết nối lại khi mất mạng.
