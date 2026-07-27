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
4. **Hàng đợi Redis (Queue):** Thay vì mở tủ hồ sơ (Postgres) cất ngay, Backend sẽ quăng tờ giấy ghi nhiệt độ 25 vào một cái rổ gọi là `telemetry_queue` trong Redis. (Redis làm bằng RAM nên quăng cả triệu tờ giấy 1 giây cũng không đầy).
5. **Công nhân xử lý (Worker):** Có một đoạn code chạy ngầm tên là `telemetryWorker`. Cứ đúng 1 giây, nó ra rổ Redis, gom hết tất cả giấy tờ (dù là 1 tờ hay 1000 tờ) và cất 1 lượt vào tủ hồ sơ PostgreSQL (`prisma.telemetry_kv.createMany`). 
   - *Lợi ích:* Database Postgres không bị quá tải do phải mở tủ 1000 lần mỗi giây.

---

## 3. Cơ Cấu Dữ Liệu (Data Structures)

### Trong PostgreSQL (K3s)
Dữ liệu được tổ chức theo chuẩn ThingsBoard, chia làm nhiều bảng. Các bảng quan trọng nhất:

- **Bảng `devices`**: Chứa thông tin cơ bản của thiết bị.
  - `id`: Mã định danh hệ thống.
  - `name`: Tên thiết bị (VD: Cảm biến Phòng Khách).
  - `type`: Loại thiết bị.
  
- **Bảng `device_credentials`**: Chứa chìa khóa của thiết bị.
  - `credentials_id`: Tên đăng nhập (Device Key) của thiết bị.
  - `credentials_value`: Mật khẩu siêu bảo mật.

- **Bảng `telemetry_kv`**: Nơi chứa lịch sử nhảy số (Biểu đồ).
  - `entity_id`: Mã thiết bị.
  - `key`: Tên thông số (VD: `temperature`, `humidity`).
  - `ts`: Thời gian (Timestamp) lúc đo.
  - `dbl_v`, `long_v`, `str_v`, `bool_v`: Cột chứa giá trị. Nếu là số thực (25.5) nó sẽ nằm ở cột `dbl_v`.

### Trong Redis (RAM)
- **Danh sách `telemetry_queue`**: Một mảng (List) chứa các chuỗi JSON chờ được lưu vào Database.

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

### Cấu hình MQTT & Cơ chế hàng đợi (File: `backend/src/index.ts`)

```typescript
// 1. Nhận tin nhắn từ EMQX
mqttClient.on('message', async (topic, message) => {
    // 2. Chuyển tin nhắn thành chữ
    const payload = message.toString();
    
    // 3. Nhét vào rổ (hàng đợi Redis) bằng lệnh lPush (Left Push - Đẩy vào bên trái hàng)
    await redisClient.lPush('telemetry_queue', JSON.stringify({
      deviceId: device.id,
      payload: payload
    }));
});
```
- **Giải thích:** Hàm `.on('message')` giống như tổng đài viên trực điện thoại. Khi có người gọi (tin nhắn tới), nó sẽ gói lại bằng lệnh `JSON.stringify` (bọc nilon) rồi ném vào rổ `telemetry_queue` bằng lệnh `.lPush`.
- **Bảo trì:** Nếu biểu đồ web không nhảy số, hãy kiểm tra Redis xem rổ `telemetry_queue` có bị kẹt (quá đầy mà không ai dọn) hay không bằng lệnh `LLEN telemetry_queue`.

### Công nhân dọn rác (File: `backend/src/workers/telemetryWorker.ts`)

```typescript
// 1. Công nhân chạy định kỳ mỗi 1 giây
setInterval(async () => {
    // 2. Gom tối đa 1000 tin nhắn mỗi lần
    const batchSize = 1000;
    const messages = await redisClient.rPopCount('telemetry_queue', batchSize);
    
    // 3. Lấy ra (rPop - Lấy từ bên phải hàng)
    if (messages && messages.length > 0) {
        // ... Code chế biến dữ liệu ...
        
        // 4. Lưu hàng loạt vào PostgreSQL
        await prisma.telemetry_kv.createMany({ data: dbRecords });
    }
}, 1000);
```
- **Giải thích:** `setInterval` là đồng hồ hẹn giờ (cứ 1000ms = 1 giây là reo). Hàm `rPopCount` nghĩa là bốc tối đa 1000 gói hàng ra khỏi rổ. `createMany` là lệnh của Database chèn siêu tốc nhiều dòng cùng lúc.
- **Bảo trì:** Nếu hệ thống IoT có quá nhiều thiết bị, bạn có thể giảm con số `1000` (ms) xuống `500` (nửa giây) để công nhân chạy nhanh hơn, hoặc tăng `batchSize` lên `5000` để công nhân bê được nhiều hơn trong 1 lần.

---

## 5. Cấu hình Biến Môi Trường (.env)
Bất kỳ máy tính mới nào muốn chạy hệ thống đều phải khai báo thẻ căn cước (File `.env`).

```env
# 1. Chìa khóa mở cửa vào tủ hồ sơ PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/greeniq?schema=public"

# 2. Địa chỉ trạm nhận thư (MQTT EMQX)
MQTT_BROKER_URL="mqtt://localhost:1883"

# 3. Địa chỉ bộ nhớ tạm (Redis)
REDIS_URL="redis://localhost:6379"
```
- **Bảo trì:** Nếu mật khẩu Database thay đổi, bạn không cần sửa code, chỉ cần vào file `.env` sửa ở dòng số 1 là toàn bộ hệ thống sẽ tự biết chìa khóa mới.

---
*Tài liệu này được tạo tự động để đảm bảo mọi nhà quản lý, kỹ sư vận hành và lập trình viên đều có thể chung tiếng nói kiểm soát dự án.*
