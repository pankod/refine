# 📚 TÀI LIỆU HƯỚNG DẪN HỆ THỐNG IOT CHUYÊN NGHIỆP (GREENIQ)

Chào mừng bạn đến với tài liệu hướng dẫn hệ thống IoT toàn diện. Tài liệu này giải thích chi tiết toàn bộ các thành phần cấu thành nên hệ thống (Từ Web, Backend đến Máy chủ) theo ngôn ngữ bình dân, dễ hiểu nhất.

---

## 🏗️ 1. SƠ ĐỒ KIẾN TRÚC TỔNG THỂ (AI CŨNG HIỂU ĐƯỢC)

Hãy tưởng tượng hệ thống IoT của chúng ta giống như một **"Hệ sinh thái Siêu thị & Nhà máy"**:

```mermaid
graph TD
    A[Nông Trại - Thiết Bị IoT ESP32] -->|Chở hàng tới| B(Trạm Thu Phí - EMQX Broker)
    B -->|Shared subscription| C{Redis Streams - Consumer Group}
    C -->|Batch + ACK sau commit| D[Node.js Queue Worker]
    D -->|Lưu trữ vào Kho| E[(Kho Hàng - PostgreSQL)]
    
    F[Khách Hàng - Giao diện Web Refine] -->|Gõ cửa xin phép| G(Bảo vệ - Keycloak)
    G -->|Cấp Thẻ VIP| F
    F -->|Đưa Thẻ VIP ra| H[Quản lý - Node.js Backend API]
    H <-->|Lấy hàng cho khách| E
```

### Giải thích vai trò từng thành phần trong Hệ Sinh Thái:
1. **Giao diện Web Refine (Siêu thị của Khách hàng)**: Đây là trang web để bạn đăng nhập vào xem nhiệt độ, tạo thiết bị mới. Refine giúp việc xây dựng trang quản trị (Admin Panel) cực kỳ nhanh.
2. **Keycloak (Chú Bảo vệ kiêm Máy cấp thẻ)**: Một hệ thống quản lý danh tính độc lập. Khi bạn mở Web lên, Web sẽ đá bạn sang Keycloak để đăng nhập. Nếu đúng tài khoản, Keycloak cấp cho bạn 1 cái "Thẻ VIP" (Token).
3. **Thiết bị IoT (Nông trại)**: Liên tục thu hoạch dữ liệu (Nhiệt độ, độ ẩm) và chở lên mạng.
4. **EMQX (Trạm thu phí MQTT)**: Chịu tải hàng vạn kết nối từ Nông trại.
5. **Redis Streams**: Giữ payload trong shard queue cho đến khi worker xác nhận PostgreSQL đã commit; hỗ trợ pending, retry và DLQ.
6. **Node.js Worker**: Các pod cùng consumer group, ghi batch telemetry/attributes/activity và chỉ ACK sau transaction.
7. **PostgreSQL (Kho hàng)**: Nơi lưu trữ vĩnh viễn mọi dữ liệu, tổ chức giống hệt kiến trúc của ThingsBoard.

---

## 💻 2. KHỐI GIAO DIỆN WEB (FRONTEND - REFINE)

Thư mục: `src/` (Ngoài cùng)

Giao diện Web của chúng ta dùng **React** kết hợp bộ khung **Refine**. Refine lo hết mọi thứ khó khăn như: Phân trang, Hiển thị bảng, Sắp xếp, v.v...

### Các File Trọng Tâm (Dành cho người xem Code)

#### File: `src/App.tsx` (Bảng điều khiển Trung tâm)
Đây là nơi lắp ráp toàn bộ Web. Nó khai báo các trang (Pages) như: Danh sách thiết bị, Dashboard.
```typescript
// Định nghĩa tài nguyên "Thiết bị"
<Resource 
  name="devices" 
  list={DeviceList} 
  create={DeviceCreate} 
/>
```

#### File: `src/providers/apiDeviceProvider.ts` (Người giao vận của Web)
Khi bạn bấm nút "Tải dữ liệu" trên Web, Web không tự động lấy được, nó phải nhờ người Giao vận (Data Provider) chạy đi lấy.
```typescript
import axios from "axios";

// Mỗi khi Giao vận đi lấy hàng, luôn luôn đính kèm Thẻ VIP (Token) vào Header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("keycloak-token"); // Lấy thẻ VIP từ ví (localStorage)
  config.headers["Authorization"] = `Bearer ${token}`; // Đính lên trán rồi mới đi gọi API
  return config;
});

// Lệnh đi lấy danh sách thiết bị từ Quản lý kho (Backend)
export const apiDeviceProvider = {
  getList: async () => {
    const response = await axios.get("http://localhost:3000/devices");
    return response.data;
  }
}
```

---

## 🧰 2.1. KHỞI ĐỘNG BACKEND TRÊN WINDOWS, MACOS VÀ LINUX

Khi chạy `npm run dev` trong thư mục `backend`, script chuẩn bị môi trường thực hiện ba việc:

1. Đọc URI PostgreSQL từ Secret `iot-db-cluster-app` và mật khẩu Redis từ Secret `redis`, sau đó ghi vào `.env` đã git-ignore.
2. Hỏi Redis Sentinel để xác định pod primary hiện tại, tránh kết nối nhầm replica read-only.
3. Tạo port-forward PostgreSQL về `localhost:5432`, Redis primary về `localhost:6379` và EMQX về `localhost:1883`.

Script không hard-code đường dẫn Windows. Thứ tự tìm kubeconfig là:

1. Biến `K3S_KUBECONFIG`.
2. Biến chuẩn `KUBECONFIG`.
3. File `k3s/kubeconfig.yaml` nằm cạnh repo `refine`.
4. File mặc định `~/.kube/config`.

Ví dụ trên macOS/Linux:

```bash
export K3S_KUBECONFIG="/duong-dan/toi/kubeconfig.yaml"
cd backend
npm run dev
```

Ví dụ PowerShell trên Windows:

```powershell
$env:K3S_KUBECONFIG = "C:\duong-dan\kubeconfig.yaml"
cd backend
npm run dev
```

Mặc định, khi kubeconfig hợp lệ, Redis và EMQX của K3s được dùng cho dev local (`USE_K3S_REDIS=true`, `USE_K3S_EMQX=true`), nên không cần Docker Desktop. Đặt biến tương ứng thành `false` nếu muốn chạy Redis hoặc EMQX bằng Docker. Khi Redis Sentinel thực hiện failover trong lúc đang dev, chạy lại `npm run dev` để script tìm primary mới và tạo lại port-forward.

Nếu Docker hoặc kubeconfig chưa sẵn sàng, script sẽ cảnh báo và bỏ qua dịch vụ tương ứng, không làm Node.js crash. Có thể chủ động dùng cấu hình có sẵn mà không đồng bộ K3s bằng:

```bash
SKIP_K8S_SYNC=true SKIP_K8S_PORT_FORWARD=true npm run dev
```

Các biến tùy chỉnh khác gồm `K8S_NAMESPACE`, `K8S_DB_SECRET`, `K8S_DB_SERVICE`, `K8S_REDIS_SECRET`, `K8S_REDIS_SENTINEL_POD`, `K8S_EMQX_SERVICE`, `LOCAL_DB_HOST`, `LOCAL_DB_PORT`, `LOCAL_REDIS_HOST`, `LOCAL_REDIS_PORT` và `LOCAL_EMQX_PORT`.

---

## ⚙️ 3. KHỐI XỬ LÝ TRUNG TÂM (BACKEND - NODE.JS)

Thư mục: `backend/src/`

Nhiệm vụ của Backend là làm "Quản lý Kho". Chỉ ai có Thẻ VIP thật mới được mở Kho.

#### File: `backend/src/index.ts` (Trái tim của Quản lý Kho)
```typescript
import { expressjwt } from 'express-jwt'; 

// 1. Dựng cổng bảo vệ bằng Express-JWT
const checkJwt = expressjwt({
  // Liên hệ với đường dây nóng của Keycloak để lấy khóa giải mã Thẻ VIP
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://auth.greeniq.vn/realms/master/protocol/openid-connect/certs'
  }),
  algorithms: ['RS256']
});
app.use(checkJwt); // Khóa toàn bộ các API lại!

// 2. API Cấp quyền tạo Thiết bị (POST /devices)
app.post('/devices', async (req, res) => {
  // Tạo Khóa ngẫu nhiên cho thiết bị phần cứng
  const deviceKey = taoChuoiNgauNhien(20); 
  
  // Lưu vào Kho (PostgreSQL) thông qua Prisma
  const thietBiMoi = await prisma.devices.create({ ... });
  // Response metadata khong chua credential. UI lay credential khi can qua endpoint rieng.
  res.json({ ...thietBiMoi, gateway: false });
});
```

Credential được lưu trong `device_credentials`, nhưng không trả trong `GET /devices` hoặc `GET /devices/:id`. Người dùng đã đăng nhập Keycloak chỉ tải credential khi mở chi tiết bằng `GET /devices/:id/credentials`.

#### File: `backend/src/mqtt/mqttClient.ts` (Người lấy hàng từ Trạm thu phí)
```typescript
export const startMqttClient = () => {
  const client = mqtt.connect('mqtt://emqx:1883'); // Nối dây vào EMQX

  client.on('message', async (topic, message) => {
    // Khi thiết bị phần cứng gửi lên kênh v1/devices/ABCD/telemetry
    const deviceKey = topic.split('/')[2]; // Lấy chữ ABCD ra
    
    const credential = await getDeviceByCredential(deviceKey);
    await telemetryQueue.enqueue({
      type: 'telemetry', tenantId: credential.tenantId,
      deviceId: credential.deviceId, deviceKey,
      ts: Date.now(), values: payload
    });
  });
};
```

#### File: `backend/src/workers/telemetryWorker.ts` (Công nhân đóng gói)
```typescript
export const startTelemetryWorker = () => {
  const deliveries = await telemetryQueue.read('telemetry', consumerName, batchSize);
  await prisma.$transaction(async tx => {
    await tx.telemetry_kv.createMany({ data: rows, skipDuplicates: true });
    await updateActivityBatch(tx, messages);
  });
  await telemetryQueue.ack(deliveries);
};
```

Nếu worker chết trước commit, entry vẫn nằm trong Pending Entries List và pod khác thu hồi bằng `XAUTOCLAIM`. Sau số lần retry cấu hình, entry lỗi được chuyển sang DLQ. `GET /api/system/queue/health` hiển thị entries, pending và dead-letter. Production nên tách `REDIS_QUEUE_URL` (AOF, `noeviction`) khỏi Redis cache.

---

## 🚢 4. KHỐI HẠ TẦNG MÁY CHỦ (KUBERNETES - K3S)

Toàn bộ "Nhà máy" này không chạy trên một cái máy tính cùi bắp, mà nó chạy trên **Cụm K3s (Kubernetes)**. K3s giống như một "Thành phố Công nghiệp".

1. **EMQX Pod**: Đây là trạm thu phí chuyên nghiệp của thành phố.
2. **Redis Pod**: Các kho trung chuyển tạm thời (RAM siêu tốc).
3. **PostgreSQL (CNPG)**: Hệ thống Kho lưu trữ công nghệ cao, tự động nhân bản dữ liệu (Cluster) để chống mất mát (chạy bằng toán tử CloudNative-PG).
4. **Backend Pod**: Được đóng gói thành 1 cái "Container" (Giống container chở hàng ngoài cảng). 
   - Đã được đẩy lên mạng (Docker Hub) dưới tên: `vtaboss/vtapro-backend:latest`
   - File cấu hình `vtapro-backend.yaml` sẽ ra lệnh cho Thành phố K3s tải cái Container này về, cắm điện vào chạy, và tự động liên kết (Network) với Redis, EMQX, và PostgreSQL nội bộ.

---

## 🚀 5. HƯỚNG DẪN KẾT NỐI PHẦN CỨNG THẬT (ESP32)

Bây giờ bạn đã có 1 hệ thống hoành tráng, bạn chỉ cần nạp đoạn Code này vào con ESP32 (Arduino) là nó tự động bơm dữ liệu lên.

- **Máy chủ MQTT (Server)**: `mqtt.greeniq.vn`
- **Cổng (Port)**: `1883`
- **Tên đăng nhập (Username)**: Mã `DEVICE_KEY` (Lấy từ giao diện Web Refine)
- **Mật khẩu (Password)**: Mã `SECRET_TOKEN` (Lấy từ giao diện Web Refine)
- **Chủ đề (Topic) để gửi dữ liệu**: `v1/devices/MÃ_DEVICE_KEY_CỦA_BẠN/telemetry`

*Lưu ý bảo mật (Chuẩn Vàng)*: EMQX đã được bảo vệ bằng Hệ thống **HTTP Auth/ACL**, vì vậy nếu bạn nhập sai Tên Đăng Nhập hoặc Mật Khẩu, bạn sẽ không thể kết nối. Hơn nữa, mỗi thiết bị chỉ được phép gửi dữ liệu vào đúng cái `Topic` có chứa `DEVICE_KEY` của chính nó, nếu cố tình gửi sai chỗ sẽ bị EMQX chặn (Deny) lập tức.

#### Code mẫu Arduino (ESP32/ESP8266) sử dụng thư viện PubSubClient:
```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "WIFI_CUA_BAN";
const char* password = "MAT_KHAU_WIFI";
const char* mqtt_server = "mqtt.greeniq.vn";
const char* mqtt_user = "ABCD123"; // Mã DEVICE_KEY
const char* mqtt_pass = "XYZ987_SECRET_TOKEN"; // Mã SECRET_TOKEN
const char* mqtt_topic = "v1/devices/ABCD123/telemetry"; // Đổi ABCD123 thành DEVICE_KEY của bạn

WiFiClient espClient;
PubSubClient client(espClient);
```

**Dữ liệu gửi lên (Chuẩn JSON)**:
```json
{
  "temperature": 28.5,
  "humidity": 75.2
}
```

**BÙM!** Ngay khi ESP32 gửi chuỗi JSON này lên, chỉ trong chưa tới 1 giây, nó đã đi qua EMQX -> rớt xuống băng chuyền Redis -> Bị Node.js Worker hốt trọn -> Nằm vĩnh viễn trong CSDL PostgreSQL -> và cuối cùng hiện lên Đồ thị trên giao diện Web Refine của bạn!

### Kết nối Gateway

Gateway là một Device có `additional_info.gateway = true`; không dùng `type = gateway` để thay thế Device Profile. Gateway đăng nhập bằng credential của chính nó và dùng:

- `v1/gateway/connect`
- `v1/gateway/disconnect`
- `v1/gateway/telemetry`
- `v1/gateway/attributes`

EMQX phải chuyển message-publish qua Webhook tới `/api/mqtt/gateway`, kèm metadata `username`, `topic`, `payload` và header `x-emqx-hook-secret`. Backend chỉ nhận khi secret khớp `EMQX_WEBHOOK_SECRET`. Xem quy trình đầy đủ tại `docs/05_DEVOPS_RUNBOOK.md`.

---

## 📡 6. GIAO THỨC MQTT VÀ CƠ CHẾ PUB/SUB CHI TIẾT

**MQTT** là giao thức nhắn tin "siêu nhẹ" được thiết kế riêng cho vạn vật kết nối (IoT). Nó hoạt động dựa trên cơ chế **Publish/Subscribe (Pub/Sub - Phát hành/Đăng ký)** thay vì mô hình Yêu cầu/Phản hồi (Request/Response) truyền thống của HTTP.

### 6.1. Cơ chế Pub/Sub là gì?

Hãy tưởng tượng MQTT Broker (EMQX của chúng ta) giống như một **Đài phát thanh (Radio Station)**, và các Topic (Chủ đề) giống như các **Tần số FM**.

- **Publisher (Người phát thanh):** Là người cầm micro nói vào một tần số cụ thể (ví dụ: `99.9 MHz`). Họ không cần biết ai đang nghe, họ chỉ việc nói.
- **Subscriber (Người nghe đài):** Là người vặn radio dò đúng tần số `99.9 MHz` để nghe. Bất cứ khi nào có người nói vào tần số đó, tất cả những người đang dò đúng tần số đều sẽ nghe thấy cùng một lúc (Realtime).

Trong hệ thống GreenIQ, chúng ta áp dụng Pub/Sub cho 2 luồng dữ liệu chính:

### 6.2. Luồng 1: Thiết bị phần cứng gửi Dữ liệu (Telemetry)
- **Thiết bị (Publisher):** Phát dữ liệu lên kênh (Topic) mang tên mã bí mật của nó.
  - Ví dụ: ESP32 phát bản tin nhiệt độ lên Topic: `v1/devices/ABCD123/telemetry`
- **Node.js Backend (Subscriber):** Backend luôn túc trực (subscribe) ở tần số `v1/devices/+/telemetry` (Dấu `+` là ký tự đại diện cho mọi mã thiết bị ở cấp đó).
  - Ngay khi ESP32 phát tin, Backend lập tức bắt được bản tin này, sau đó đưa vào hàng đợi Redis để lưu vào CSDL.

**Ví dụ Code ESP32 (Publisher):**
```cpp
void setup() {
  client.setServer("mqtt.greeniq.vn", 1883);
}

void loop() {
  if (!client.connected()) {
    // Cần DEVICE_KEY (Username) và SECRET_TOKEN (Password)
    client.connect("ESP32Client", "ABCD123", "XYZ987_SECRET_TOKEN");
  }
  
  // Topic bảo mật: v1/devices/<DEVICE_KEY>/telemetry
  client.publish("v1/devices/ABCD123/telemetry", "{\"temperature\": 25.5}");
  delay(5000);
}
```

### 6.3. Luồng 2: Tự động đồng bộ Giao diện Web (LiveProvider)
Đây là tính năng Realtime nâng cao giúp các trình duyệt tự cập nhật dữ liệu (auto-refresh) khi có sự thay đổi mà không cần tải lại trang (F5).

- **Node.js Backend (Publisher):** Khi có người tạo, sửa, hoặc xóa một thiết bị qua API, Backend sẽ phát một thông báo lên đài phát thanh MQTT.
  - Ví dụ: Có thiết bị mới được tạo, Backend phát tin lên Topic `v1/refine/devices/created`.
- **Giao diện Web Refine (Subscriber):** Giao diện Web của bạn luôn dò sẵn tần số `v1/refine/devices/#` (Dấu `#` đại diện cho mọi hành động bên dưới thư mục devices: created, updated, deleted).
  - Khi bắt được tin từ Backend, Web sẽ tự động gọi lại API để vẽ thêm dòng mới vào bảng danh sách thiết bị ngay lập tức.

**Ví dụ Code Backend (Publisher):**
```typescript
// Khi API thêm thiết bị thành công, Backend báo cáo lên MQTT
mqttClient.publish("refine/devices/created", JSON.stringify({
  payload: { id: "1", name: "Cảm biến nhiệt" },
  date: new Date().toISOString()
}));
```

**Ví dụ Code Frontend (Subscriber):**
```typescript
// Trình duyệt Web lắng nghe kênh MQTT để tự động làm mới giao diện
client.subscribe("refine/devices/#");
client.on("message", (topic, message) => {
  if (topic === "refine/devices/created") {
    console.log("Cập nhật lại bảng danh sách thiết bị ngay lập tức!");
    // (Refine sẽ tự động xử lý phần việc này nhờ LiveProvider)
  }
});
```

### Tóm tắt lợi ích của MQTT Pub/Sub:
1. **Tiết kiệm băng thông:** Gói tin MQTT siêu nhỏ (chỉ mất vài byte overhead), cực kỳ phù hợp cho mạng 3G/4G chập chờn hoặc thiết bị pin yếu.
2. **Realtime (Thời gian thực):** Độ trễ truyền tải chỉ tính bằng mili-giây do kết nối (TCP Socket) luôn được giữ mở.
3. **Mở rộng dễ dàng (Decoupling):** Các thiết bị và máy chủ hoàn toàn độc lập với nhau. Có thể có hàng triệu thiết bị cùng nghe/nói mà không làm sập Backend nhờ sức mạnh điều phối của EMQX Broker.
