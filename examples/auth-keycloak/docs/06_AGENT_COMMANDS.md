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
- **Xác thực và phân quyền:** Authentication bắt buộc dùng Keycloak. Không mô phỏng ThingsBoard PE RBAC. Nếu phát sinh yêu cầu kiểm soát quyền cơ bản, chỉ dùng role/group từ Keycloak theo yêu cầu cụ thể đã được xác nhận.
- **Gateway:** Cờ Gateway chuẩn là `devices.additional_info.gateway`, độc lập với `type`/Device Profile. Chỉ đọc `isGateway` để tương thích dữ liệu v2.0.8 cũ. Gateway MQTT API tham chiếu ThingsBoard CE và phải giữ cô lập tenant.
- **Hệ Thống Phân Tán (Scale-Out):** Mọi Backend API phải thiết kế ở dạng KHÔNG LƯU TRẠNG THÁI (Stateless). Bắt buộc phải sử dụng Redis (cho Queue/Cache) và EMQX (cho MQTT) làm trung gian. Điều này đảm bảo khi hệ thống trên K3s nhân bản lên 100 Pods, mọi thứ vẫn chạy trơn tru.
- **Redis Queue production:** Không dùng Redis List `LPUSH/RPOP` cho telemetry. Phải đi qua abstraction `TelemetryQueue`, hiện thực bằng Redis Streams sharded theo tenant/device, consumer group, ACK sau PostgreSQL commit, reclaim pending, retry và DLQ. MQTT ingestion phải dùng shared subscription. Production tách `REDIS_QUEUE_URL` (AOF, `noeviction`) khỏi Redis cache; không mô tả Redis Streams là kiến trúc queue mặc định của ThingsBoard vì ThingsBoard production dùng Kafka.
- **PostgreSQL telemetry:** Ghi batch trong transaction, `lastActivityTime` một lần/device/batch, inactivity dùng bulk SQL. Partition migration chỉ chạy trong maintenance window; retention mặc định tắt và chỉ bật khi đã có backup/giám sát.
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
  1. Mã nguồn ThingsBoard CE tham chiếu: `/Volumes/KINGSTON/Github/thingsboard`
  2. Thư mục dự án hiện tại: `/Volumes/KINGSTON/Github/refine/examples/auth-keycloak`
  3. Tài liệu dự án: `/Volumes/KINGSTON/Github/refine/examples/auth-keycloak/docs`
  Điều này đảm bảo code bám cấu trúc dự án thực tế và hành vi ThingsBoard CE liên quan, nhưng không sao chép cơ chế RBAC ThingsBoard PE.

### 2.3. Trạng thái Gateway v2.0.9

- Đã hỗ trợ `v1/gateway/connect`, `disconnect`, `telemetry`, `attributes`.
- EMQX Webhook phải gửi `username`, `topic`, `payload` tới `/api/mqtt/gateway` với `x-emqx-hook-secret`.
- Credential không xuất hiện trong API danh sách/chi tiết chung; chỉ lấy qua `/devices/:id/credentials` sau xác thực Keycloak.
- Chưa hỗ trợ Gateway attribute request/response, RPC, shared-attribute push và remote connector configuration. Không được ghi tài liệu hoặc UI như thể các phần này đã hoàn thành.
