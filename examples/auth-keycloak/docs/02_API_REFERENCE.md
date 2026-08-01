# 🌍 Tổng Hợp API (Giao Tiếp Dữ Liệu) v2.0.9

Tài liệu này liệt kê toàn bộ các đường dẫn (API) mà hệ thống đang sử dụng để frontend giao tiếp với backend. Nó được viết một cách dễ hiểu để bất cứ ai cũng có thể dùng phần mềm Postman hoặc trình duyệt để kiểm tra.

> **Lưu ý quan trọng**: Tất cả các API này đều yêu cầu bảo mật. Bạn phải gửi kèm `Token` của Keycloak trong Header (phần `Authorization: Bearer <token>`). Nếu không, bạn sẽ nhận lỗi `401 Unauthorized`.

## Swagger UI

- Qua backend trực tiếp: `http://localhost:3000/api-docs`.
- Qua frontend dev server: `http://localhost:5173/api-docs`.
- Swagger UI được public để tải giao diện; các thao tác gọi API nghiệp vụ bên trong vẫn cần Bearer token Keycloak.
- Vite có proxy riêng cho `/api-docs`. Không gộp route này vào rule rewrite `/api`, vì `/api-docs` sẽ bị biến thành `-docs` và rơi vào JWT middleware.

### Queue health

- **Đường dẫn**: `GET /api/system/queue/health`
- **Bảo mật**: yêu cầu Keycloak Bearer token.
- **Mô tả**: trả loại queue và thống kê Redis Streams `entries`, `pending`, `deadLetters` riêng cho telemetry/attributes. `503` nghĩa là backend không đọc được queue.
- Endpoint chỉ quan sát; không ACK, xóa hoặc replay message.

---

## 1. API Quản lý Thiết bị (Devices)

Đây là các API do thư viện Refine tự động gọi để quản lý danh sách thiết bị (Thêm, sửa, xóa, xem danh sách).

### 1.1 Lấy danh sách thiết bị
- **Đường dẫn**: `GET http://localhost:3000/devices`
- **Mô tả**: Trả về toàn bộ danh sách thiết bị trong hệ thống.
- **Query**: `page`, `limit`, `search`; thêm `gateway=true` để chỉ lấy Gateway. `isGateway=true` chỉ còn là alias tương thích v2.0.8.
- **Kết quả trả về**:
  ```json
  [
    {
      "id": "4b344a0e-...",
      "name": "Cảm biến nhiệt độ",
      "type": "Nhiệt độ",
      "label": "Phòng khách",
      "status": "online",
      "gateway": false,
      "overwriteActivityTime": false,
      "connectedDeviceCount": 0,
      "created_at": "2026-07-26..."
    }
  ]
  ```

### 1.2 Xem chi tiết một thiết bị
- **Đường dẫn**: `GET http://localhost:3000/devices/:id`
- **Mô tả**: Trả về thông tin của 1 thiết bị cụ thể (thay `:id` bằng ID của thiết bị).

### 1.3 Tạo thiết bị mới
- **Đường dẫn**: `POST http://localhost:3000/devices`
- **Dữ liệu gửi lên (Body JSON)**:
  ```json
  {
    "name": "Cảm biến nhà kính",
    "type": "sensor",
    "label": "Nhà kính A",
    "description": "Theo dõi nhiệt độ và độ ẩm",
    "gateway": false,
    "overwriteActivityTime": false
  }
  ```

### 1.4 Sửa thông tin thiết bị
- **Đường dẫn**: `PATCH http://localhost:3000/devices/:id`
- **Các trường được phép sửa**: `name`, `type`, `label`, `description`, `gateway`, `overwriteActivityTime`.
- **Lưu ý theo chuẩn ThingsBoard**: Không được sửa `status` qua API này. Trạng thái Online/Offline do lớp MQTT và Server Attributes tự động quản lý.

`isGateway` vẫn được đọc như alias tương thích cho client v2.0.8, nhưng dữ liệu mới luôn được lưu bằng `additional_info.gateway`.

### 1.5 Lấy credential thiết bị

- **Đường dẫn**: `GET http://localhost:3000/devices/:id/credentials`
- **Mô tả**: Trả credential khi người dùng đã đăng nhập Keycloak và chủ động mở chi tiết thiết bị. API danh sách và API chi tiết thông thường không trả Device Key/Secret.

### 1.6 Xóa thiết bị
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
- **Cách Backend hoạt động**: Backend truy vấn PostgreSQL từ bảng `telemetry_kv` để lấy dữ liệu quá khứ.
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

- **Broker**: `mqtt.greeniq.vn` (Cổng `1883`) hoặc `localhost`
- **Xác thực**: Yêu cầu `Username` = `DEVICE_KEY` và `Password` = `SECRET_TOKEN`
- **Topic gửi dữ liệu (Telemetry)**: `v1/devices/<DEVICE_KEY>/telemetry`
- **Topic gửi thuộc tính (Attributes)**: `v1/devices/<DEVICE_KEY>/attributes` (Dùng cho `CLIENT_SCOPE`)
- **Topic nhận cấu hình Shared**: `v1/devices/<DEVICE_KEY>/attributes/response/shared` (Thiết bị lắng nghe để nhận lệnh cấu hình)
- **Định dạng dữ liệu**: JSON thuần túy (VD: `{"temperature": 25}`)
- **Luồng hoạt động**:
  1. Cảm biến gửi dữ liệu vào EMQX.
  2. Các Backend Pod dùng shared subscription; mỗi message chỉ được giao cho một pod trong group.
  3. Backend ghi Redis Streams và latest cache. Worker consumer group batch PostgreSQL, chỉ ACK sau commit; lỗi được retry/DLQ.
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

---

## 6. ThingsBoard Gateway MQTT API

Gateway chỉ được publish/subscribe namespace `v1/gateway/*` khi credential thuộc thiết bị có `additional_info.gateway = true`.

| Tác vụ | Topic | Payload chính |
|---|---|---|
| Kết nối device | `v1/gateway/connect` | `{"device":"Device A","type":"sensor"}` |
| Ngắt kết nối | `v1/gateway/disconnect` | `{"device":"Device A"}` |
| Telemetry | `v1/gateway/telemetry` | `{"Device A":[{"ts":1700000000000,"values":{"temperature":23.5}}]}` |
| Client attributes | `v1/gateway/attributes` | `{"Device A":{"firmware":"1.0"}}` |

EMQX Rule/Webhook gọi nội bộ `POST /api/mqtt/gateway` với body `{"username":"<gateway-device-key>","topic":"...","payload":"<json>"}` và header `x-emqx-hook-secret`. Endpoint này không dùng JWT Keycloak vì do broker gọi, nhưng bắt buộc dùng secret riêng `EMQX_WEBHOOK_SECRET`.

### Phạm vi hỗ trợ hiện tại

- Đã hỗ trợ: connect, disconnect, telemetry và client attributes.
- Gateway tự tạo downstream device trong cùng tenant và tạo relation `Contains`.
- Chưa hỗ trợ trong phiên bản này: attribute request/response, shared-attribute push, RPC và remote connector configuration. ACL không quảng bá các luồng publish chưa được backend xử lý.

### Phân quyền

REST API xác thực bằng Keycloak. Hệ thống không mô phỏng ThingsBoard PE RBAC; nếu cần quyền cơ bản sẽ ánh xạ role/group Keycloak theo yêu cầu cụ thể. MQTT Gateway dùng credential thiết bị và ACL riêng của EMQX.
