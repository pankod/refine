# 📘 Hướng Dẫn Sử Dụng & Khởi Chạy Dự Án (Version 1.0.0)

Chào mừng bạn đến với tài liệu hướng dẫn của hệ thống IoT Dashboard v1.0.0. Tài liệu này được viết theo cách đơn giản nhất để bất kỳ ai (dù không chuyên về lập trình) cũng có thể hiểu và làm theo.

## 1. Tổng quan hệ thống
Hệ thống này gồm 3 thành phần chính:
1. **Frontend (Giao diện web)**: Xây dựng bằng React & Refine. Nơi hiển thị danh sách thiết bị, bảng dữ liệu (Telemetry) và biểu đồ.
2. **Backend (Máy chủ xử lý)**: Xây dựng bằng Node.js & Express. Làm nhiệm vụ kết nối CSDL (PostgreSQL), lưu trữ lịch sử dữ liệu và bảo mật bằng Keycloak.
3. **MQTT Broker (Trạm trung chuyển dữ liệu)**: Dùng EMQX. Là nơi các thiết bị IoT (như cảm biến nhiệt độ, độ ẩm) gửi dữ liệu về.

---

## 2. Cách khởi chạy hệ thống (Cho người mới)

### Bước 1: Khởi động các dịch vụ nền (Database, Redis, MQTT)
Bạn cần đảm bảo Docker đã được cài đặt trên máy.
1. Mở Terminal (Command Prompt / PowerShell).
2. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
3. Chạy lệnh để bật tất cả các dịch vụ (PostgreSQL, Redis, EMQX, Keycloak):
   ```bash
   docker-compose up -d
   ```
   *(Lưu ý: Mất khoảng 1-2 phút cho lần chạy đầu tiên. Chữ `-d` giúp chạy ngầm).*

### Bước 2: Bật Backend (Máy chủ API)
1. Vẫn ở trong thư mục `backend`, chạy lệnh:
   ```bash
   npm install
   npm run dev
   ```
2. Nếu thành công, bạn sẽ thấy dòng chữ: `Backend server is running on port 3000` và `Connected to Redis successfully`.

### Bước 3: Bật Frontend (Giao diện người dùng)
1. Mở một cửa sổ Terminal **mới**.
2. Đứng ở thư mục gốc của dự án (`auth-keycloak`), chạy lệnh:
   ```bash
   npm install
   npm run dev
   ```
3. Trình duyệt sẽ tự động mở trang web tại `http://localhost:5173`. Bạn đăng nhập bằng tài khoản Keycloak để vào hệ thống.

---

## 3. Cách mô phỏng thiết bị gửi dữ liệu (Bằng phần mềm MQTTX)

Để thấy biểu đồ và bảng dữ liệu nhảy số trực tiếp trên web, bạn có thể đóng giả làm 1 thiết bị IoT bằng phần mềm **MQTTX**.

**Cài đặt kết nối trong MQTTX:**
- **Name**: Nhập gì cũng được (vd: `ThietBi_Test`)
- **Host**: `mqtt://emqx.greeniq.vn` (hoặc localhost nếu chạy local)
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

**Kết quả:**
Ngay lập tức, bạn sẽ thấy trên giao diện web (bảng và biểu đồ) xuất hiện thông số bạn vừa gửi mà không cần tải lại trang. Hệ thống cũng đã ngầm lưu lịch sử này vào Database!

---

## 4. Khắc phục sự cố thường gặp (Troubleshooting)

- **Lỗi màn hình trắng khi bấm vào thiết bị:** Hãy thử F5 (tải lại trang). Đảm bảo Backend (cửa sổ chạy `npm run dev` ở thư mục backend) không báo lỗi đỏ.
- **Biểu đồ không nhảy dữ liệu:** Kiểm tra lại ô Topic trong MQTTX xem gõ đúng chữ `v1/devices/DEVICE_KEY/telemetry` chưa. Phải đúng chữ thường. Đồng thời kiểm tra xem thiết bị đã cấu hình đúng Username/Password chưa.
- **Báo lỗi 401 Unauthorized:** Token đăng nhập đã hết hạn. Bạn hãy đăng xuất ở góc trên bên phải màn hình web và đăng nhập lại.
