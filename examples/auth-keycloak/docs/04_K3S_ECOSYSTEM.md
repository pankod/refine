# 🌐 Hướng Dẫn Vận Hành Hệ Sinh Thái K3s & Kiến Trúc Dữ Liệu
*(Phiên bản dành cho người vận hành không chuyên)*

Tài liệu này là "bản đồ kho báu" giúp bạn nhìn thấu toàn bộ hệ thống IoT của chúng ta. Dù bạn không viết ra những dòng code này, bạn vẫn sẽ hiểu luồng đi của dữ liệu, các thành phần đang chạy và cách chúng kết nối với nhau trong cụm máy chủ ảo K3s.

---

## 1. Sơ Đồ Kết Nối Tổng Thể (Hệ Sinh Thái)

Dưới đây là sơ đồ mạng lưới hoạt động của toàn bộ hệ thống. 
*(Sơ đồ này đọc từ dưới lên trên hoặc từ trái sang phải).*

```mermaid
graph TD
    %% Khai báo các thực thể bằng chuỗi trích dẫn (Bảo mật cú pháp)
    Dev["Thiết bị IoT / Cảm biến"]
    EMQX("EMQX Broker - Trạm thu phát MQTT")
    BackendAuth["Backend API - Cổng Bảo vệ Auth/ACL"]
    BackendMQTT["Backend API - Bộ lắng nghe MQTT"]
    Redis[("Redis - Bộ nhớ đệm RAM")]
    Worker["Telemetry Worker - Công nhân dọn rác"]
    Postgres[("PostgreSQL - Cơ Sở Dữ Liệu K3s")]
    Frontend["Giao diện Web Green IQ"]
    Keycloak("Keycloak SSO - Trạm gác cổng")
    BackendAPI["Backend API - Máy chủ trung tâm"]

    %% Khai báo luồng dữ liệu
    Dev -->|1. Gửi dữ liệu MQTT| EMQX
    
    EMQX -->|2. Hỏi quyền truy cập HTTP| BackendAuth
    EMQX -->|3. Báo dữ liệu mới| BackendMQTT
    
    BackendMQTT -->|4. Nhét vào hàng đợi| Redis
    
    Worker -->|5. Gom dữ liệu mỗi giây| Redis
    Worker -->|6. Ghi hàng loạt Batch| Postgres
    
    Frontend -->|7. Gọi API & Xác thực| Keycloak
    Frontend -->|8. Xin biểu đồ & Danh sách| BackendAPI
    BackendAPI -->|9. Lấy dữ liệu vĩnh viễn| Postgres
    
    %% Định dạng màu sắc để dễ nhìn
    style Dev fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style EMQX fill:#ff9,stroke:#333,stroke-width:2px,color:#000
    style Redis fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style Postgres fill:#69f,stroke:#333,stroke-width:2px,color:#000
    style Keycloak fill:#9f9,stroke:#333,stroke-width:2px,color:#000
```

**Giải thích vai trò:**
- **Thiết bị IoT:** Máy đo nhiệt độ, độ ẩm...
- **EMQX:** Tổng đài nhận tin nhắn. Dành cho việc thu phát và phân phối tín hiệu diện rộng.
- **Backend API:** Bộ não xử lý của chúng ta.
- **Redis:** Cuốn sổ nháp, tốc độ ánh sáng, dùng để chứa tin nhắn tạm thời và làm hàng đợi (Queue).
- **PostgreSQL (Trong K3s):** Tủ hồ sơ lưu trữ vĩnh viễn, chống mất mát dữ liệu, thiết kế chuẩn IoT.
- **Keycloak:** Chú bảo vệ kiểm tra thẻ ra vào.

---

## 1.5. Sơ Đồ Hạ Tầng Cụm K3s (Infrastructure Architecture)

Để hệ thống chạy được trên môi trường thực tế (Production), chúng ta đóng gói tất cả vào một nền tảng ảo hóa gọi là **K3s (Kubernetes hạng nhẹ)**. Dưới đây là sơ đồ mạng lưới các dịch vụ (Services) được triển khai bên trong cụm K3s:

```mermaid
graph TD
    subgraph K3S ["Cụm Máy Chủ K3s - Production"]
        Ingress["Traefik Ingress - Bộ định tuyến"]
        
        subgraph AppLayer ["Tầng Ứng dụng"]
            Frontend["Frontend Pod - Giao diện Web"]
            Backend["Backend API Pod - Xử lý Logic"]
            Keycloak["Keycloak Pod - Máy chủ Bảo mật"]
        end
        
        subgraph IotLayer ["Tầng IoT"]
            EMQX["EMQX Pod - Máy chủ MQTT"]
        end
        
        subgraph DataLayer ["Tầng Dữ liệu"]
            Redis["Redis Pod - Hàng đợi RAM"]
            Postgres["PostgreSQL Pod - Lưu trữ vĩnh viễn"]
        end
        
        subgraph StorageLayer ["Ổ cứng lưu trữ (PVC)"]
            PG_PVC[("Ổ cứng Postgres PVC")]
            Redis_PVC[("Ổ cứng Redis PVC")]
        end
    end
    
    User(("Người Dùng"))
    IoT(("Thiết Bị IoT"))
    
    %% Kết nối từ ngoài vào
    User -->|Truy cập web| Ingress
    IoT -->|Gửi MQTT| EMQX
    
    %% Kết nối nội bộ
    Ingress --> Frontend
    Ingress --> Backend
    Ingress --> Keycloak
    
    Frontend --> Backend
    Frontend --> Keycloak
    
    Backend --> Redis
    Backend --> Postgres
    Backend --> EMQX
    Backend --> Keycloak
    
    %% Kết nối ổ cứng
    Postgres --> PG_PVC
    Redis --> Redis_PVC
    
    %% Tùy chỉnh màu sắc
    classDef pod fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000;
    classDef storage fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000;
    classDef external fill:#f1f8e9,stroke:#689f38,stroke-width:2px,color:#000;
    
    class Frontend,Backend,Keycloak,EMQX,Redis,Postgres pod;
    class PG_PVC,Redis_PVC storage;
    class User,IoT external;
```

**Cách vận hành cụm K3s này:**
- **Pods (Hộp chứa):** Mỗi phần mềm (Postgres, Redis, Backend, Frontend) bị nhốt vào một hộp chứa riêng biệt gọi là Pod. Nếu một hộp bị treo, K3s sẽ tự động giết nó và sinh ra một hộp mới y hệt (Tính năng tự phục hồi - Auto-healing).
- **Ingress (Người chỉ đường):** Khi bạn gõ `greeniq.vn` trên trình duyệt, Ingress sẽ tự biết dẫn đường vào hộp `Frontend`. Khi Frontend gọi `/api/...`, Ingress sẽ tự bẻ lái vào hộp `Backend`.
- **Ổ cứng (PVC - Persistent Volume Claim):** Nếu hộp Postgres lỡ bị sập và tạo lại, dữ liệu bên trong sẽ mất trắng. Do đó, K3s cắm một ổ cứng ảo `pg_pvc` ở ngoài vào hộp Postgres. Dù hộp có sập 100 lần, ổ cứng vẫn còn nguyên vẹn.
- **Dễ dàng nâng cấp mở rộng (Scale Out):** Nếu lượng người dùng tăng đột biến, bạn chỉ cần gõ lệnh `kubectl scale deployment backend --replicas=3`, K3s sẽ lập tức copy hộp Backend ra làm 3 cái chạy song song chia sẻ tải với nhau.

---

## 2. Luồng Dữ Liệu (Data Flow) - Chi Tiết Từng Bước

Khi một thiết bị phần cứng gửi nhiệt độ về, hệ thống xử lý thế nào mà không bị sập mạng?

1. **Gửi tin nhắn (Publish):** Thiết bị IoT bắn gói tin JSON `{ "temperature": 25 }` lên kênh `v1/devices/KEY_THIET_BI/telemetry` tới máy chủ EMQX.
2. **Kiểm duyệt (Auth/ACL):** Ngay lập tức, EMQX gọi về Backend hỏi: *"Ê, thằng này có mã bí mật đúng không? Nó có được phép gửi vào kênh này không?"*. Backend check CSDL (Postgres) và gật đầu (trả về HTTP 200 Allow).
3. **Tiếp nhận:** Backend (đang mở sẵn một kênh nghe ẩn) nhận được nhiệt độ 25.
4. **Hàng đợi Redis Streams:** Backend ghi payload vào một trong các stream shard `greeniq:queue:telemetry:{NN}` hoặc `attributes:{NN}`. Redis giữ entry cho tới khi worker xác nhận đã lưu thành công.
5. **Consumer Group Worker:** Các Backend Pod cùng tham gia consumer group `postgres-writers-v1`, đọc batch bằng `XREADGROUP`, ghi PostgreSQL trong transaction rồi mới `XACK`. Pod chết giữa chừng không làm mất entry; pod khác thu hồi bằng `XAUTOCLAIM`.
6. **Retry/DLQ:** Entry lỗi được thử lại tối đa theo `REDIS_STREAM_MAX_RETRIES`, sau đó chuyển vào `greeniq:queue:dlq:{telemetry|attributes}` để vận hành kiểm tra.

### Luồng ThingsBoard Gateway MQTT API

Gateway dùng các topic chung `v1/gateway/*`, vì vậy topic không chứa Device Key như luồng thiết bị trực tiếp. Luồng xử lý trên K3s là:

1. Gateway đăng nhập EMQX bằng Device Key/Secret của chính Gateway.
2. EMQX gọi `/api/mqtt/acl`; backend chỉ cho phép namespace Gateway nếu `devices.additional_info.gateway = true`.
3. EMQX Webhook chuyển `username`, `topic` và `payload` tới `POST /api/mqtt/gateway`.
4. Backend xác thực header `x-emqx-hook-secret`, tra Gateway từ `username`, rồi cô lập downstream device trong đúng tenant.
5. `gatewayService.ts` tự tạo downstream device/relation `Contains`, rồi đưa telemetry/attributes vào cùng Redis Streams queue với thiết bị trực tiếp.

Không cho backend MQTT subscriber xử lý trực tiếp `v1/gateway/*`: subscriber chỉ thấy topic/payload và không biết publisher nào đã gửi, nên có nguy cơ ghi chéo tenant.

---

## 3. Cơ Cấu Dữ Liệu (Data Structures)

### Trong PostgreSQL (K3s)
Dữ liệu được tổ chức theo chuẩn ThingsBoard, chia làm nhiều bảng. Các bảng quan trọng nhất:

- **Bảng `devices`**: Chứa thông tin cơ bản của thiết bị.
  - `id`: Mã định danh hệ thống.
  - `name`: Tên thiết bị (VD: Cảm biến Phòng Khách).
  - `type`: Loại thiết bị.
  - `additional_info.gateway`: Cờ Gateway chuẩn; độc lập với `type`/Device Profile.
  - `additional_info.overwriteActivityTime`: Cho phép hoạt động của Gateway làm mới thời gian hoạt động downstream.
  
- **Bảng `device_credentials`**: Chứa chìa khóa của thiết bị.
  - `credentials_id`: Tên đăng nhập (Device Key) của thiết bị.
  - `credentials_value`: Mật khẩu siêu bảo mật.

- **Bảng `telemetry_kv`**: Nơi chứa lịch sử nhảy số (Biểu đồ).
  - `entity_id`: Mã thiết bị.
  - `key`: Tên thông số (VD: `temperature`, `humidity`).
  - `ts`: Thời gian (Timestamp) lúc đo.
  - `dbl_v`, `long_v`, `str_v`, `bool_v`: Cột chứa giá trị. Nếu là số thực (25.5) nó sẽ nằm ở cột `dbl_v`.

### Trong Redis
- **Credential cache:** `credential_device:{deviceKey}` có TTL, giảm truy vấn PostgreSQL khi authenticate/ingest.
- **Latest cache:** `latest_telemetry:{deviceKey}` phục vụ API dữ liệu mới nhất.
- **Durable streams:** nhiều shard telemetry/attributes, consumer group, pending entries, retry counter và DLQ. Production nên đặt `REDIS_QUEUE_URL` tới Redis AOF + `noeviction`, tách khỏi Redis cache.

### Secret và cấu hình EMQX Gateway

- Backend cần biến `EMQX_WEBHOOK_SECRET`; giá trị thật phải nằm trong Kubernetes Secret, không ghi vào Git.
- EMQX Webhook dùng cùng secret trong header `x-emqx-hook-secret`.
- Webhook chỉ lắng nghe bốn topic đã hỗ trợ: `connect`, `disconnect`, `telemetry`, `attributes` dưới `v1/gateway/`.
- URL nội bộ khuyến nghị: `http://vtapro-backend:3000/api/mqtt/gateway` nếu tên Service backend là `vtapro-backend`.

---

## 4. Giải Thích Cấu Hình (Configurations) & Code Vận Hành

### Cấu hình Port-forward của K3s (File: `backend/scripts/start-dev-services.js`)

Khi code trên máy tính cá nhân (Môi trường Dev), ta không thể nối thẳng vào K3s (máy chủ thật). Ta phải dùng kỹ thuật **Port-Forward (Đào hầm)**.

```javascript
// Dòng code đào hầm tới CSDL PostgreSQL đang nằm trong K3s
const kubectl = spawn('kubectl', ['port-forward', 'pod/postgres-0', '5432:5432']);
```
- **Giải thích:** Câu lệnh này mượn công cụ `kubectl` (chiếc xẻng) để đào một đường ống từ cổng `5432` trên máy tính của bạn chạy thẳng vào cổng `5432` của chiếc máy ảo chứa Postgres trong hệ sinh thái K3s. 
- **Bảo trì:** Nếu báo lỗi "Port 5432 is already in use", nghĩa là đường hầm cũ chưa bị lấp. Lệnh `taskkill /F /IM kubectl.exe` đã được thêm vào file script để tự động dọn dẹp các đường hầm hỏng trước khi chạy.

### Cấu hình MQTT & Cơ chế hàng đợi

```typescript
client.subscribe('$share/telemetry-ingest/v1/devices/+/telemetry');
await telemetryQueue.enqueue({ type: 'telemetry', tenantId, deviceId, deviceKey, ts, values });
```
- **Giải thích:** Shared subscription đảm bảo một MQTT message chỉ đến một backend trong nhóm. Queue abstraction chọn shard ổn định theo device và ghi bằng `XADD`.
- **Bảo trì:** Dùng `GET /api/system/queue/health` để xem tổng entries, pending và dead-letter thay vì `LLEN`.

### Công nhân dọn rác (File: `backend/src/workers/telemetryWorker.ts`)

```typescript
const deliveries = await telemetryQueue.read('telemetry', consumerName, batchSize);
await prisma.$transaction(async tx => {
  await tx.telemetry_kv.createMany({ data: rows, skipDuplicates: true });
  await updateActivityBatch(tx, messages);
});
await telemetryQueue.ack(deliveries);
```
- **Giải thích:** Message không bị xóa khi đọc. Chỉ sau khi PostgreSQL commit, worker mới ACK và xóa entry. Đây là at-least-once; khóa chính `(ts, entity_id, key)` giúp lần xử lý lại không nhân đôi telemetry.
- **Bảo trì:** Điều chỉnh `TELEMETRY_BATCH_SIZE` và `TELEMETRY_PROCESS_INTERVAL_MS` dựa trên queue lag và PostgreSQL latency, không tăng mù quáng.

---

## 5. Cấu hình Biến Môi Trường (.env)
Bất kỳ máy tính mới nào muốn chạy hệ thống đều phải khai báo thẻ căn cước (File `.env`).

```env
# 1. Chìa khóa mở cửa vào tủ hồ sơ PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/greeniq?schema=public"

# 2. Địa chỉ trạm nhận thư (MQTT EMQX)
EMQX_URL="mqtt://localhost:1883"

# 3. Địa chỉ bộ nhớ tạm (Redis)
REDIS_URL="redis://localhost:6379"

# Redis queue production tach rieng cache
REDIS_QUEUE_URL="redis://localhost:6379"
REDIS_STREAM_SHARDS="16"
TELEMETRY_BATCH_SIZE="1000"
TELEMETRY_RETENTION_DAYS="0"

# 4. Secret xác thực Webhook Gateway (không dùng giá trị mẫu ở production)
EMQX_WEBHOOK_SECRET="replace-with-a-long-random-secret"
```
- **Bảo trì:** Nếu mật khẩu Database thay đổi, bạn không cần sửa code, chỉ cần vào file `.env` sửa ở dòng số 1 là toàn bộ hệ thống sẽ tự biết chìa khóa mới.

---
*Tài liệu này được tạo tự động để đảm bảo mọi nhà quản lý, kỹ sư vận hành và lập trình viên đều có thể chung tiếng nói kiểm soát dự án.*
