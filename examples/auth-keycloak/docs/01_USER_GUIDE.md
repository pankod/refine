# 📘 Hướng Dẫn Sử Dụng & Khởi Chạy Dự Án (Version 2.0.9)

Chào mừng bạn đến với tài liệu hướng dẫn của hệ thống IoT Dashboard v2.0.9. Tài liệu này được viết theo cách đơn giản nhất để bất kỳ ai (dù không chuyên về lập trình) cũng có thể hiểu và làm theo.

## 1. Tổng quan hệ thống
Hệ thống này gồm 3 thành phần chính:
1. **Frontend (Giao diện web)**: Xây dựng bằng React & Refine. Nơi hiển thị danh sách thiết bị, bảng dữ liệu (Telemetry) và biểu đồ.
2. **Backend (Máy chủ xử lý)**: Xây dựng bằng Node.js & Express. Làm nhiệm vụ kết nối CSDL (PostgreSQL), lưu trữ lịch sử dữ liệu và bảo mật bằng Keycloak.
3. **MQTT Broker (Trạm trung chuyển dữ liệu)**: Dùng EMQX. Là nơi các thiết bị IoT (như cảm biến nhiệt độ, độ ẩm) gửi dữ liệu về.

---

## 2. Cách khởi chạy hệ thống (Cho người mới)

### Bước 1: Bật Backend (Máy chủ API)
Hệ thống ưu tiên dùng PostgreSQL, Redis và EMQX trong cụm K3s cho môi trường local. Script đọc kubeconfig Lens tại `backend/.kube/lens-kubeconfig.yaml`, đồng bộ secret cần thiết và mở port-forward. Docker Compose chỉ là phương án dự phòng khi đặt `USE_K3S_REDIS=false` hoặc `USE_K3S_EMQX=false`.

Bạn cần có `kubectl` và kubeconfig Lens hợp lệ. Chỉ cần bật Docker Desktop nếu chủ động dùng dịch vụ Docker local.
1. Mở Terminal (Command Prompt / PowerShell).
2. Di chuyển vào thư mục `backend`, chạy lệnh:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Nếu thành công, bạn sẽ thấy thông báo: `🚀 Backend API đã chạy thành công trên địa chỉ: http://localhost:3000` cùng trạng thái port-forward PostgreSQL, Redis và EMQX.

### Bước 2: Bật Frontend (Giao diện người dùng)
1. Mở một cửa sổ Terminal **mới**.
2. Đứng ở thư mục gốc của dự án (`auth-keycloak`), chạy lệnh:
   ```bash
   npm install
   npm run dev
   ```
3. Trình duyệt sẽ tự động mở trang web tại `http://localhost:5173`. Trang Loading với logo "Green IQ" sẽ hiện ra. Bạn đăng nhập bằng tài khoản Keycloak để vào hệ thống.

---

## 3. Cách mô phỏng thiết bị gửi dữ liệu (Bằng phần mềm MQTTX)

Để thấy biểu đồ và bảng dữ liệu nhảy số trực tiếp trên web, bạn có thể đóng giả làm 1 thiết bị IoT bằng phần mềm **MQTTX**.

**Cài đặt kết nối trong MQTTX:**
- **Name**: Nhập gì cũng được (vd: `ThietBi_Test`)
- **Host**: `mqtt://mqtt.greeniq.vn` (hoặc localhost nếu chạy local)
- **Port**: `1883`
- **Username**: Mã `DEVICE_KEY` của thiết bị
- **Password**: Mã `SECRET_TOKEN` của thiết bị
- Bấm **Connect**. Nếu đèn báo xanh lá cây là kết nối thành công.

**Cách gửi dữ liệu:**
1. Chọn kết nối vừa tạo.
2. Ở ô **Topic**, bạn nhập: `v1/devices/DEVICE_KEY/telemetry`
   *(Thay `DEVICE_KEY` bằng Key của thiết bị bạn thấy trên giao diện web).*
3. Ở ô **Payload** (Nội dung), bạn chọn định dạng `JSON` và dán đoạn chữ sau vào:
   ```json
   {
     "temperature": 28.5,
     "humidity": 65.2,
     "fan_speed": 100,
     "status": true
   }
   ```
4. Bấm **Send** (Gửi).

**Cách gửi thuộc tính (Attributes):**
1. Chọn kết nối vừa tạo.
2. Ở ô **Topic**, nhập: `v1/devices/DEVICE_KEY/attributes`
3. Ở ô **Payload**, dán đoạn JSON sau:
   ```json
   {
     "firmware_version": "v1.2.3",
     "battery_level": 98
   }
   ```
4. Bấm **Send**. Quay lại giao diện web, mở tab **Thuộc tính (Attributes)** và chọn **Client Attributes**, bạn sẽ thấy các thông số này xuất hiện.

**Cách nhận lệnh cấu hình (Shared Attributes):**
Để thiết bị biết khi nào quản trị viên sửa thuộc tính trên Web:
1. Trong MQTTX, bấm **New Subscription** (Theo dõi kênh mới).
2. Nhập Topic: `v1/devices/DEVICE_KEY/attributes/response/shared`
3. Quay lại trang Web, mở tab **Shared Attributes**, tạo một thuộc tính (VD: `temp_limit = 40`).
4. Quay lại MQTTX, bạn sẽ thấy thiết bị lập tức nhận được bản tin JSON chứa cấu hình mới!

**Kết quả:**
Ngay lập tức, bạn sẽ thấy trên giao diện web (bảng và biểu đồ) xuất hiện thông số bạn vừa gửi mà không cần tải lại trang. Hệ thống cũng đã ngầm lưu lịch sử này vào Database!

---

## 4. Khắc phục sự cố thường gặp (Troubleshooting)

- **Lỗi màn hình trắng khi bấm vào thiết bị:** Hãy thử F5 (tải lại trang). Đảm bảo Backend (cửa sổ chạy `npm run dev` ở thư mục backend) không báo lỗi đỏ.
- **Biểu đồ không nhảy dữ liệu:** Kiểm tra lại ô Topic trong MQTTX xem gõ đúng chữ `v1/devices/DEVICE_KEY/telemetry` chưa. Phải đúng chữ thường. Đồng thời kiểm tra xem thiết bị đã cấu hình đúng Username/Password chưa.
- **Báo lỗi 401 Unauthorized:** Token đăng nhập đã hết hạn. Bạn hãy đăng xuất ở góc trên bên phải màn hình web và đăng nhập lại.

---

## 5. Quản lý Gateway và thiết bị kết nối

Nền tảng hỗ trợ sơ đồ mạng lưới thiết bị (Topology) giống như Thingsboard:

- **Gateway** là thiết bị cổng trung tâm. Nút **Thêm Gateway** luôn tạo thiết bị có cờ chuẩn ThingsBoard `additionalInfo.gateway = true`; Device Profile vẫn là một thuộc tính độc lập.
- Trang Gateway dùng resource riêng ở frontend nhưng vẫn lưu chung bảng `devices`. Khi Save, provider cưỡng chế `gateway=true`, giữ người dùng tại trang Gateway và backend luôn sinh credential mặc định; form không hiển thị tùy chọn tự sinh Access Token.
- Cột **Thiết bị kết nối** cho biết số thiết bị downstream hiện được Gateway quản lý.
- Khi bật **Ghi đè thời gian hoạt động**, hoạt động của Gateway sẽ làm mới `lastActivityTime` cho các thiết bị đang kết nối qua Gateway.
- Credential không còn nằm trong API danh sách. Chỉ khi mở chi tiết thiết bị, giao diện mới gọi API credential riêng để phục vụ thao tác sao chép.

### Kết nối bằng ThingsBoard Gateway MQTT API

Gateway đăng nhập EMQX bằng Device Key và Secret của chính Gateway, sau đó dùng các topic chuẩn:

- `v1/gateway/connect`: báo một thiết bị downstream đã kết nối, ví dụ `{"device":"Sensor A","type":"sensor"}`.
- `v1/gateway/disconnect`: báo thiết bị ngắt kết nối, ví dụ `{"device":"Sensor A"}`.
- `v1/gateway/telemetry`: gửi telemetry cho một hoặc nhiều thiết bị.
- `v1/gateway/attributes`: gửi client attributes cho một hoặc nhiều thiết bị.

Thiết bị downstream chưa tồn tại sẽ được tự tạo trong cùng tenant với Gateway. Hệ thống cũng tự tạo relation `Gateway --Contains--> Device`; không cần tạo relation thủ công cho thiết bị đi qua Gateway API.

> EMQX phải cấu hình Rule/Webhook cho các topic `v1/gateway/connect`, `v1/gateway/disconnect`, `v1/gateway/telemetry`, `v1/gateway/attributes`. Webhook gửi `username`, `topic`, `payload` tới `/api/mqtt/gateway` và header `x-emqx-hook-secret` phải khớp biến môi trường `EMQX_WEBHOOK_SECRET` của backend. Đây là điều kiện để backend xác định đúng Gateway/tenant từ topic chung.
