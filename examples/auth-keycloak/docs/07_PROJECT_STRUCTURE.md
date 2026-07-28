# 📂 Thuyết Minh Cấu Trúc Code & Kiến Trúc Dự Án (Project Structure)

Tài liệu này là cẩm nang toàn diện giải thích chi tiết cấu trúc thư mục, chức năng của từng file code quan trọng trong toàn bộ dự án (cả Frontend và Backend). Nó được thiết kế đặc biệt để giúp một lập trình viên mới (amateur) có thể nhanh chóng nắm bắt, hiểu cách hệ thống vận hành và dễ dàng phát triển thêm tính năng mới.

---

## 🏗️ 1. Tổng Quan Kiến Trúc (Architecture Overview)

Dự án này là một hệ thống IoT Dashboard dạng Monorepo thu nhỏ, bao gồm 2 phần chính đặt trong cùng một thư mục lớn:
- **Frontend (Gốc thư mục)**: Ứng dụng Web React.js sử dụng bộ khung (framework) Refine (chuyên dùng cho Dashboard nội bộ).
- **Backend (Thư mục `backend/`)**: Máy chủ API Node.js/Express, làm nhiệm vụ giao tiếp với Database (PostgreSQL), Redis, MQTT (EMQX) và xác thực người dùng qua Keycloak.

Cả hai phần này giao tiếp với nhau qua chuẩn REST API (Frontend gửi request HTTP lên Backend). Đồng thời Frontend còn kết nối trực tiếp với EMQX qua WebSockets để nhận dữ liệu thời gian thực (Real-time).

---

## 🎨 2. Cấu Trúc Frontend (Thư mục gốc)

Mã nguồn của Frontend nằm chủ yếu trong thư mục `src/`.

### Các file cấu hình nền móng:
- `package.json`: Chứa danh sách các thư viện (dependencies) của Frontend (như `react`, `@refinedev/core`, `axios`, `mqtt`, `recharts`). Các lệnh khởi chạy (như `npm run dev`) cũng được định nghĩa ở đây.
- `vite.config.ts`: Cấu hình của công cụ Vite (Trình đóng gói siêu tốc). Nó làm nhiệm vụ biến code React thành HTML/JS cho trình duyệt đọc được.
- `index.html`: Khung sườn HTML duy nhất của cả trang web.

### Thư mục `src/` (Trái tim của Frontend):
- **`src/index.tsx`**: Cửa ngõ đầu tiên. Nó bọc toàn bộ ứng dụng bằng công cụ bảo mật của Keycloak (`<ReactKeycloakProvider>`) trước khi gọi đến App chính.
- **`src/App.tsx`**: Bộ điều hướng tổng (Router). Nơi định nghĩa các "Tài nguyên" (Resources) của hệ thống như `devices`, `gateways`. Nó liên kết đường dẫn Web (URL) với các thành phần giao diện tương ứng (Ví dụ: `/devices` sẽ mở trang `DeviceList`).
- **`src/custom.css`**: File CSS chứa các quy tắc thiết kế giao diện tùy chỉnh (như màu sắc, độ bo góc, animation).

### Thư mục `src/providers/` (Cầu nối dữ liệu):
- **`apiDeviceProvider.ts`**: Nơi chứa hàm tùy biến để Frontend biết cách gọi REST API xuống Backend (GET, POST, PUT, DELETE). Ví dụ: Lấy danh sách thiết bị.
- **`liveProvider.ts`**: Đây là cầu nối Thời Gian Thực (Real-time). Chứa code kết nối trực tiếp đến MQTT (EMQX) bằng thư viện `mqtt.js` qua cổng WebSockets 8083. Khi có dữ liệu mới, nó chọc thẳng vào Cache của React Query để màn hình nhảy số tức thời.

### Thư mục `src/pages/` (Các trang giao diện):
Nơi chứa code hiển thị của từng màn hình. Quan trọng nhất là `src/pages/devices/`:
- **`list.tsx`**: Trang danh sách Thiết bị và Gateway. Chứa một bảng (Table) danh sách và một ngăn kéo (Drawer) mở ra khi click vào một thiết bị. Trong Drawer này, nó nhúng các Tab con.
- **`telemetry.tsx`**: Tab Dữ liệu đo lường. Chứa bảng thông số hiện tại và biểu đồ lịch sử (dùng `recharts`).
- **`attributes.tsx`**: Tab Thuộc tính cấu hình. Chia làm Server/Client/Shared Attributes, có nút thêm, sửa, xóa cấu hình.
- **`relations.tsx`**: Tab Quan hệ. Nơi định nghĩa thiết bị này đang cắm vào Gateway nào (Sơ đồ Topology).

### Thư mục `src/components/`:
- Chứa các khối giao diện dùng chung nhỏ lẻ, ví dụ như Header, Menu, Footer.

---

## ⚙️ 3. Cấu Trúc Backend (Thư mục `backend/`)

Mã nguồn Backend tập trung trong `backend/src/` và `backend/prisma/`.

### Các file cấu hình nền móng:
- `backend/package.json`: Chứa thư viện của Backend (như `express`, `pg`, `ioredis`, `mqtt`, `prisma`).
- `backend/.env`: File chứa các biến môi trường nhạy cảm (Tài khoản Database, Link kết nối Keycloak, Link Redis, EMQX). Tuyệt đối không đưa file này lên mạng.
- `backend/swagger.ts` & `swagger_output.json`: Công cụ tự động sinh tài liệu API. Nó đọc code và đẻ ra một trang web hướng dẫn API cho lập trình viên.

### Thư mục `backend/prisma/` (Cơ sở dữ liệu):
- **`schema.prisma`**: Đây là bản vẽ thiết kế Database (PostgreSQL). Mọi bảng trong hệ thống (`devices`, `device_telemetry`, `attribute_kv`, `relation`) đều được khai báo rõ ràng bằng code ở đây. Khi chạy `prisma migrate dev`, Prisma sẽ dịch file này thành câu lệnh SQL để tạo bảng thực tế.

### Thư mục `backend/src/` (Trái tim của Backend):
- **`backend/src/index.ts`**: Cửa ngõ (Entry point) của Server.
  - Chứa cấu hình Express.js.
  - Chứa "Bác bảo vệ" (`checkJwt`): Middleware chuyên kiểm tra Token từ Keycloak xem người dùng có quyền hay không.
  - Chứa **TẤT CẢ REST API**: Mọi đường dẫn (Endpoints) như `GET /devices`, `POST /devices`, `GET /relations` đều được lập trình logic xử lý ngay trong file này.
- **`backend/src/mqtt/mqttClient.ts`**: Kênh giao tiếp với trạm MQTT (EMQX).
  - Lắng nghe sự kiện kết nối.
  - Bắt các tin nhắn (Payload) từ thiết bị IoT gửi về qua các Topic `v1/devices/...`.
  - Phân loại và đẩy tin nhắn vào **Hàng đợi Redis** thay vì lưu thẳng vào Database để chống nghẽn mạng.
- **`backend/src/workers/telemetryWorker.ts`**: "Anh công nhân dọn rác" (Batch Processor).
  - Chạy ngầm định kỳ mỗi 1-2 giây.
  - Nhiệm vụ: Vào Redis vét sạch toàn bộ tin nhắn tồn đọng, nén lại và dùng lệnh `prisma.$executeRaw` Upsert hàng loạt (Batch Insert) vào PostgreSQL trong 1 lần duy nhất. Giúp hệ thống chịu tải hàng triệu tin nhắn.

---

## 🚀 4. Lời Khuyên Dành Cho Lập Trình Viên Mới

Nếu bạn muốn thêm một **tính năng mới** (Ví dụ: Tính năng Cảnh báo - Alarms), bạn nên đi theo quy trình 3 bước sau:

1. **Làm Database trước**: 
   - Mở `backend/prisma/schema.prisma` tạo bảng `alarms`. 
   - Chạy `npx prisma migrate dev` trong thư mục backend để tạo bảng.
2. **Viết API Backend**: 
   - Mở `backend/src/index.ts` viết các đường dẫn `app.get('/alarms')`, `app.post('/alarms')`.
3. **Làm Giao diện Frontend**: 
   - Tạo file `src/pages/alarms/list.tsx`.
   - Mở `src/App.tsx` và khai báo `<Refine resources={[{ name: "alarms", list: "/alarms" }]}>`.

Với cấu trúc được chia nhỏ rành mạch theo chuẩn MVC và kiến trúc Microservices (sử dụng Redis, EMQX) thu nhỏ này, bạn hoàn toàn có thể yên tâm phát triển dự án đến quy mô công nghiệp mà không sợ bị sập hệ thống do quá tải.
