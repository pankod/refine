# 🤖 Bảng Lệnh & Quy Tắc Trợ Lý AI (AI Agent Commands & Rules)

Tài liệu này tổng hợp toàn bộ các "Lệnh tự động" (Workflows) và "Quy tắc bắt buộc" (Rules) mà Trợ lý AI đã được học qua tính năng `/learn`. 

Bất cứ khi nào bạn gõ đúng các lệnh dưới đây vào khung chat, AI sẽ tự động kích hoạt một chuỗi hành động được lập trình sẵn mà không cần bạn phải giải thích lại từ đầu.

---

## 🌍 PHẦN 1: CÁC LỆNH VÀ QUY TẮC TOÀN CẦU (GLOBAL RULES)
*(Các quy tắc này được áp dụng mặc định cho tất cả các dự án mã nguồn của hệ thống)*

### 1.1. Các Lệnh Tự Động (Workflows)

| Lệnh gõ vào chat | Hành động tự động của AI |
| :--- | :--- |
| **"cập nhật k3s"** | 1. Tự động Tăng phiên bản (Version Bump).<br>2. Build Docker Image (Cả Frontend & Backend).<br>3. Đẩy Image lên Docker Hub (Push).<br>4. Gọi lệnh K3s cập nhật Pods (kubectl set image).<br>5. Báo cáo sức khỏe Pods.<br>6. Commit & Push mã nguồn lên GitHub. |
| **"cập nhật docs"** | 1. Tự động rà soát toàn bộ Codebase.<br>2. So sánh với các file tài liệu hiện tại.<br>3. Tìm ra các điểm mù/điểm thay đổi.<br>4. Tự động viết lại tài liệu đồng bộ 100% với Code mới nhất. |
| **"thuyết minh cấu trúc code"** | 1. Rà soát lại toàn bộ cấu trúc thư mục.<br>2. Liệt kê các file quan trọng.<br>3. Đưa ra giải thích cực kỳ chi tiết về nội dung, tính năng và mục đích của từng file.<br>4. Đóng gói lại thành tài liệu chuẩn hóa để lập trình viên nghiệp dư dễ dàng tiếp cận và triển khai tiếp dự án. |

### 1.2. Các Nguyên Tắc Kiến Trúc Bắt Buộc (Architecture Rules)

- **Chuẩn IoT ThingsBoard:** Mọi thiết kế cơ sở dữ liệu phải chia cấp bậc `Tenant -> Customer -> Device`. Dữ liệu lịch sử (biểu đồ) luôn lưu tại bảng `telemetry_kv`, các trạng thái cấu hình lưu tại `attribute_kv`. Phải áp dụng xóa phân tầng (Cascading Deletions).
- **Hệ Thống Phân Tán (Scale-Out):** Mọi Backend API phải thiết kế ở dạng KHÔNG LƯU TRẠNG THÁI (Stateless). Bắt buộc phải sử dụng Redis (cho Queue/Cache) và EMQX (cho MQTT) làm trung gian. Điều này đảm bảo khi hệ thống trên K3s nhân bản lên 100 Pods, mọi thứ vẫn chạy trơn tru.
- **Viết Tài Liệu Siêu Chi Tiết:** Mỗi khi sửa đổi Code, AI bị ép buộc phải cập nhật tài liệu cực kỳ chi tiết, giải thích mộc mạc từng dòng lệnh để người không chuyên (Non-expert) cũng có thể hiểu và vận hành.

---

## 📂 PHẦN 2: CÁC LỆNH VÀ QUY TẮC DỰ ÁN (PROJECT RULES)
*(Chỉ áp dụng riêng trong dự án Web Refine / GreenIQ này)*

### 2.1. Lệnh Tự Động Riêng

| Lệnh gõ vào chat | Hành động tự động của AI |
| :--- | :--- |
| **"cập nhật thông tin hệ sinh thái k3s"** | Kích hoạt tự động tạo/cập nhật file `04_K3S_ECOSYSTEM.md`. Bao gồm: Vẽ sơ đồ kiến trúc Mermaid, giải thích luồng truyền tải dữ liệu từ Thiết bị -> EMQX -> Backend -> Redis -> DB, và bóc tách cấu hình bảo trì chi tiết. |

### 2.2. Nguyên Tắc Cốt Lõi Dự Án

- **Ưu Tiên Đọc Mã Nguồn Gốc (Context Priority):** Khi phát triển dự án này, AI không được phép "đoán" code. Bắt buộc AI phải chủ động quét và tham chiếu mã nguồn từ đúng 2 đường dẫn ưu tiên sau trước khi sửa code:
  1. Thư mục lõi (Core): `C:\Users\vthea\Documents\GitHub\refine`
  2. Thư mục dự án mẫu (Ví dụ hiện tại): `C:\Users\vthea\Documents\GitHub\refine\examples\auth-keycloak`
  Điều này đảm bảo mọi đoạn code sinh ra đều giống hệt với văn phong gốc của Refine.
