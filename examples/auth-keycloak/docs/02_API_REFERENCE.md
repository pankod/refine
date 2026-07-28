# 🌍 Tổng Hợp API (Giao Tiếp Dữ Liệu) v1.0.0

Tài liệu này liệt kê toàn bộ các đường dẫn (API) mà hệ thống đang sử dụng để frontend giao tiếp với backend. Nó được viết một cách dễ hiểu để bất cứ ai cũng có thể dùng phần mềm Postman hoặc trình duyệt để kiểm tra.

> **Lưu ý quan trọng**: Tất cả các API này đều yêu cầu bảo mật. Bạn phải gửi kèm `Token` của Keycloak trong Header (phần `Authorization: Bearer <token>`). Nếu không, bạn sẽ nhận lỗi `401 Unauthorized`.

---

## 1. API Quản lý Thiết bị (Devices)

Đây là các API do thư viện Refine tự động gọi để quản lý danh sách thiết bị (Thêm, sửa, xóa, xem danh sách).

### 1.1 Lấy danh sách thiết bị
- **Đường dẫn**: `GET http://localhost:3000/devices`
- **Mô tả**: Trả về toàn bộ danh sách thiết bị trong hệ thống.
- **Kết quả trả về**:
  ```json
  [
    {
      "id": "4b344a0e-...",
      "name": "Cảm biến nhiệt độ",
      "type": "Nhiệt độ",
      "label": "Phòng khách",
      "status": "online",
      "created_at": "2026-07-26..."
    }
  ]
  ```

### 1.2 Xem chi tiết một thiết bị
- **Đường dẫn**: `GET http://localhost:3000/devices/:id`
- **Mô tả**: Trả về thông tin của 1 thiết bị cụ thể (thay `:id` bằng ID của thiết bị).

### 1.3 Tạo thiết bị mới
- **Đường dẫn**: `POST http://localhost:3000/devices`
- **Dữ liệu gửi lên (Body JSON)**: `{"name": "...", "type": "..."}`

### 1.4 Xóa thiết bị
- **Đường dẫn**: `DELETE http://localhost:3000/devices/:id`

---

## 2. API Dữ liệu Đo đạc (Telemetry)

Đây là các API chuyên dùng để kéo dữ liệu cảm biến (Nhiệt độ, độ ẩm...) hiển thị lên Bảng và Biểu đồ.

### 2.1 Lấy dữ liệu mới nhất (Current Telemetry)
- **Đường dẫn**: `GET http://localhost:3000/devices/:id/telemetry`
- **Mô tả**: Trả về trạng thái hiện tại (mới nhất) của tất cả các cảm biến trên thiết bị này (Ví dụ: nhiệt độ hiện tại là bao nhiêu).
- **Cách Backend hoạt động**: Backend sẽ chui vào Redis (bộ nhớ tạm tốc độ cao) để lấy dữ liệu mới nhất, giúp tốc độ phản hồi cực kỳ nhanh (dưới 10ms).
- **Kết quả trả về**:
  ```json
  [
    {
      "key": "temperature",
      "value": 35.5,
      "lastUpdate": "2026-07-26T13:17:47.399Z"
    },
    {
      "key": "humidity",
      "value": 90,
      "lastUpdate": "2026-07-26T13:17:47.406Z"
    }
  ]
  ```

### 2.2 Lấy lịch sử dữ liệu (Telemetry History)
- **Đường dẫn**: `GET http://localhost:3000/devices/:id/telemetry/history`
- **Mô tả**: Lấy toàn bộ lịch sử biến động dữ liệu của thiết bị để vẽ lên biểu đồ.
- **Cách Backend hoạt động**: Backend sẽ truy vấn vào Database PostgreSQL (bảng `device_telemetry`) để lục lại dữ liệu quá khứ.
- **Kết quả trả về**:
  ```json
  [
    {
      "key": "temperature",
      "value": 30.1,
      "ts": "2026-07-26T13:15:00.000Z"
    },
    {
      "key": "temperature",
      "value": 35.5,
      "ts": "2026-07-26T13:17:00.000Z"
    }
  ]
  ```

---

## 3. API Quản lý Thuộc tính (Attributes)

Đây là các API dùng để xem và cấu hình các thuộc tính của thiết bị theo chuẩn ThingsBoard (Client, Server, Shared).

### 3.1 Lấy danh sách Thuộc tính
- **Đường dẫn**: `GET http://localhost:3000/devices/:id/attributes?scope=SERVER_SCOPE`
- **Mô tả**: Lấy danh sách các thuộc tính của thiết bị. Có thể truyền thêm `?scope=...` (`CLIENT_SCOPE`, `SERVER_SCOPE`, `SHARED_SCOPE`) để lọc.
- **Kết quả trả về**:
  ```json
  [
    {
      "key": "active",
      "value": true,
      "lastUpdateTs": 1722132345000,
      "scope": "SERVER_SCOPE"
    }
  ]
  ```

### 3.2 Thêm / Cập nhật Thuộc tính
- **Đường dẫn**: `POST http://localhost:3000/devices/:id/attributes/:scope`
- **Mô tả**: Lưu cấu hình thuộc tính mới. `:scope` bắt buộc là `SERVER_SCOPE` hoặc `SHARED_SCOPE`. Nếu là `SHARED_SCOPE`, Backend sẽ tự động phát sóng (Publish MQTT) cấu hình này xuống thiết bị thực tế.
- **Dữ liệu gửi lên (Body JSON)**: `{"temp_limit": 40.5, "active": true}`

### 3.3 Xoá Thuộc tính
- **Đường dẫn**: `DELETE http://localhost:3000/devices/:id/attributes/:scope?keys=key1,key2`
- **Mô tả**: Xoá một hoặc nhiều thuộc tính theo các key truyền vào.

---

## 4. Giao thức MQTT (Dành cho thiết bị IoT)

Thiết bị phần cứng (cảm biến, vi điều khiển) không dùng HTTP API mà dùng MQTT để truyền dữ liệu cho nhanh và nhẹ.

- **Broker**: `emqx.greeniq.vn` (Cổng `1883`) hoặc `localhost`
- **Xác thực**: Yêu cầu `Username` = `DEVICE_KEY` và `Password` = `SECRET_TOKEN`
- **Topic gửi dữ liệu (Telemetry)**: `v1/devices/<DEVICE_KEY>/telemetry`
- **Topic gửi thuộc tính (Attributes)**: `v1/devices/<DEVICE_KEY>/attributes` (Dùng cho `CLIENT_SCOPE`)
- **Topic nhận cấu hình Shared**: `v1/devices/<DEVICE_KEY>/attributes/response/shared` (Thiết bị lắng nghe để nhận lệnh cấu hình)
- **Định dạng dữ liệu**: JSON thuần túy (VD: `{"temperature": 25}`)
- **Luồng hoạt động**:
  1. Cảm biến gửi dữ liệu vào EMQX.
  2. Backend Node.js lắng nghe EMQX.
  3. Khi có dữ liệu, Backend lưu vào PostgreSQL (làm lịch sử) và lưu vào Redis (làm trạng thái hiện tại).
  4. Trình duyệt Web (Frontend) nhận trực tiếp dữ liệu từ EMQX qua WebSockets (Cổng `8083`) để bảng/biểu đồ tự nhảy số.

---

## 5. API Quản lý Quan hệ (Relations & Topology)

Đây là các API dùng để gán liên kết giữa các thực thể (Ví dụ: Gán thiết bị con vào Gateway). Kiến trúc này lấy cảm hứng từ Thingsboard.

### 5.1 Lấy danh sách liên kết
- **Đường dẫn**: `GET http://localhost:3000/relations`
- **Tham số (Query string)**: `?from_id=<ID>` hoặc `?to_id=<ID>`
- **Mô tả**: Trả về danh sách các thực thể đang liên kết với ID truyền vào.
- **Kết quả trả về**:
  ```json
  [
    {
      "from_id": "gateway-id",
      "from_type": "DEVICE",
      "to_id": "sensor-id",
      "to_type": "DEVICE",
      "relation_type": "Contains",
      "additional_info": { "to_name": "Cảm biến nhiệt độ" }
    }
  ]
  ```

### 5.2 Tạo liên kết mới
- **Đường dẫn**: `POST http://localhost:3000/relations`
- **Mô tả**: Gán một thực thể vào một thực thể khác (VD: Gắn cảm biến vào Gateway).
- **Dữ liệu gửi lên (Body JSON)**:
  ```json
  {
    "from_id": "gateway-id",
    "from_type": "DEVICE",
    "to_id": "sensor-id",
    "to_type": "DEVICE",
    "relation_type": "Contains"
  }
  ```

### 5.3 Xóa liên kết
- **Đường dẫn**: `DELETE http://localhost:3000/relations/:id`
- **Mô tả**: Xóa mối quan hệ giữa 2 thiết bị. `:id` là ID kết hợp định dạng: `fromId_toId_relationType` do Frontend tự động tạo ra.

