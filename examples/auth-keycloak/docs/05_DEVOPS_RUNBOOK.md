# 🛠️ Sổ Tay Vận Hành & Bảo Trì Cụm K3s (DevOps Runbook)

Tài liệu này là **"Cẩm nang sinh tồn"** dành cho người quản trị hệ thống (System Admin / DevOps). Nó cung cấp các câu lệnh và quy trình chuẩn để Cài đặt, Kiểm tra, Nâng cấp và Bảo trì toàn bộ hệ sinh thái K3s đã được vẽ trong sơ đồ `04_K3S_ECOSYSTEM.md`.

Mọi câu lệnh dưới đây đều sử dụng công cụ `kubectl` - chiếc gậy chỉ huy quyền năng nhất trong Kubernetes/K3s.

---

## 1. 🚀 HƯỚNG DẪN KIỂM TRA & GIÁM SÁT (INSPECTION)

Là người bảo trì, công việc đầu buổi sáng của bạn là "khám sức khỏe" cho toàn bộ hệ thống xem có ai đang bị ốm không.

### 1.1. Kiểm tra toàn bộ các "Hộp chứa" (Pods)
Gõ lệnh này để xem tất cả các phần mềm có đang chạy bình thường không:
```bash
kubectl get pods
```
**Cách đọc kết quả:**
- Cột `STATUS`: Trạng thái phải là `Running`. Nếu thấy `CrashLoopBackOff` hoặc `Error` nghĩa là phần mềm đó đang bị lỗi và liên tục khởi động lại thất bại.
- Cột `READY`: Phải là `1/1` (Nghĩa là phần mềm đã sẵn sàng nhận kết nối).

### 1.2. Bắt mạch khám bệnh (Xem Logs)
Nếu thấy hộp `backend` bị lỗi, hãy xem nhật ký hoạt động (Logs) của nó để biết lỗi cụ thể (do sai mật khẩu DB, hay do code lỗi...):
```bash
# Xem log của pod tên là backend-xxxx
kubectl logs -f pod/backend-xxxx

# Hoặc xem nhanh log của toàn bộ cụm backend không cần biết tên pod chính xác
kubectl logs -f deployment/backend
```

### 1.3. Khám sức khỏe phần cứng (RAM/CPU)
Để xem xem phần mềm nào đang ngốn nhiều RAM hay CPU nhất:
```bash
kubectl top pods
```
*(Nếu EMQX hoặc Backend báo CPU lên tới 90%, đó là lúc bạn cần Mở rộng hệ thống ở Phần 3).*

---

## 2. 🚑 XỬ LÝ SỰ CỐ & BẢO TRÌ (TROUBLESHOOTING)

Dựa vào sơ đồ K3s, đây là các sự cố thường gặp nhất và cách giải quyết:

### Trường hợp 1: Biểu đồ Web không nhảy số (Dữ liệu bị nghẽn)
- **Nguyên nhân 1 (Nghẽn băng chuyền):** 
  - Khả năng cao là "Công nhân dọn rác" (Telemetry Worker) đang bị đình công, khiến rổ hàng trên Redis bị ứ đọng.
  - **Cách xử lý:** Mở cửa sổ Dòng lệnh kết nối vào Redis, gõ lệnh `LLEN telemetry_queue`. Nếu con số trả về quá lớn (VD: 50.000) và không giảm đi, bạn cần khởi động lại Backend Worker: `kubectl rollout restart deployment backend`.

- **Nguyên nhân 2 (EMQX từ chối thiết bị):**
  - **Cách xử lý:** Xem log của EMQX `kubectl logs -f deployment/emqx`. Nếu thấy lỗi `Auth failed`, nghĩa là Thiết bị gửi sai Mật khẩu, hoặc Backend chặn không cho phép. Kiểm tra lại mã Device Key của thiết bị.

### Trường hợp 2: Hộp CSDL (Postgres) báo lỗi Crash
- **Nguyên nhân:** Ổ cứng ảo (PVC) bị đầy, không còn chỗ để ghi dữ liệu lịch sử.
- **Cách xử lý:** 
  1. Kiểm tra dung lượng ổ cứng: `kubectl describe pvc pg-pvc`
  2. Nếu ổ cứng báo đầy (Capacity 100%), bạn phải xin cấp phát thêm dung lượng trên Server vật lý, sau đó sửa cấu hình PVC để cấp thêm (VD: Từ 10GB lên 50GB).

### Trường hợp 3: Nâng cấp Code mà làm sập Web
- **Nguyên nhân:** Phiên bản code mới tung ra bị lỗi.
- **Cách xử lý (Quay xe thần thánh):** K3s có khả năng quay về phiên bản code cũ ngay lập tức (như cỗ máy thời gian).
  ```bash
  kubectl rollout undo deployment frontend
  kubectl rollout undo deployment backend
  ```

---

## 3. 📈 NÂNG CẤP & MỞ RỘNG HỆ THỐNG (SCALING & UPGRADE)

### 3.1. Phép thuật Phân thân (Scale Out)
Hôm nay công ty bán được thêm 10.000 thiết bị, hệ thống bắt đầu giật lag. Bạn không cần mua máy chủ mới mạnh hơn, chỉ cần ra lệnh cho K3s "phân thân" Backend ra làm nhiều bản sao để chia sẻ tải:
```bash
# Nhân bản Backend lên 3 Pods chạy song song
kubectl scale deployment backend --replicas=3

# Nhân bản Frontend lên 2 Pods
kubectl scale deployment frontend --replicas=2
```
*Lưu ý:* Redis và Postgres không nên dùng lệnh này vì dữ liệu cần sự đồng nhất. Chỉ phân thân Frontend, Backend và EMQX (Cần cấu hình EMQX Cluster).

### 3.2. Cập nhật Phiên bản (Code mới) theo chuẩn K3s
Bất cứ khi nào bạn (hoặc Dev) code xong tính năng mới, quy trình tung bản cập nhật (Deploy) lên K3s sẽ diễn ra theo 3 bước:
1. **Đóng gói Code mới:** Đóng gói code thành file ảnh (Docker Image), ví dụ: `myregistry/greeniq-backend:v2.0`
2. **Đẩy lên mây:** `docker push myregistry/greeniq-backend:v2.0`
3. **Ra lệnh K3s cập nhật (Quan trọng):**
   ```bash
   kubectl set image deployment/backend backend=myregistry/greeniq-backend:v2.0
   ```
*(K3s sẽ rất thông minh: Nó sẽ tạo 1 hộp mới chạy code v2.0, đợi hộp mới chạy ngon lành rồi nó mới âm thầm xóa hộp cũ v1.0. Quá trình này giúp hệ thống cập nhật mà người dùng không hề bị mất kết nối - **Zero Downtime Deployment**).*

---

## 4. ⚙️ QUY TRÌNH CÀI ĐẶT SERVER MỚI (INSTALLATION)

Nếu công ty mua một cái máy tính trắng tinh và bắt bạn dựng lại toàn bộ Sơ đồ hệ thống. Dưới đây là các bước:

1. **Cài nền móng K3s:**
   ```bash
   curl -sfL https://get.k3s.io | sh -
   ```
2. **Cắm ổ cứng (Cài đặt PVC):** Tạo file `postgres-pvc.yaml` và áp dụng lệnh `kubectl apply -f postgres-pvc.yaml`.
3. **Dựng các hộp chứa (Deployments):** Tạo các file cấu hình tương ứng cho Redis, Postgres, EMQX, Keycloak, Backend, Frontend. Khởi chạy bằng lệnh `kubectl apply -f .`
4. **Bật bộ định tuyến (Ingress):** Cấu hình Traefik Ingress để trỏ tên miền (VD: `api.greeniq.vn`) vào hộp `Backend`, và (`greeniq.vn`) vào hộp `Frontend`.

---

## 5. 👁️ HƯỚNG DẪN THAO TÁC TRỰC QUAN BẰNG PHẦN MỀM LENS (LENS IDE)

Nếu bạn không thích việc phải gõ những dòng lệnh khô khan ở trên, bạn có thể sử dụng **Lens (The Kubernetes IDE)**. Đây là một phần mềm đồ họa giúp bạn quản lý K3s bằng cách "Click chuột".

### 5.1. Xem Trạng Thái Các Pods (Khám Sức Khỏe)
- **Vị trí:** Menu bên trái, chọn **Workloads** -> **Pods**.
- **Thao tác:** Bạn sẽ nhìn thấy danh sách toàn bộ các hộp chứa (Postgres, EMQX, Backend...). Cột Status có màu xanh (Running) là bình thường, màu đỏ là đang lỗi.
- **Xem Logs (Bắt Bệnh):** Muốn xem lỗi của Backend? Chỉ cần nhấn chuột vào dòng `backend-xxx`, một bảng bên phải hiện ra. Bấm vào biểu tượng **Tờ giấy (Logs)** ở góc phải phía trên cùng. Dòng chữ sẽ tự động nhảy y hệt như bạn đang nhìn màn hình thật của máy chủ.

### 5.2. Chui Vào Bên Trong Hộp Chứa (Terminal Shell)
- **Vị trí:** Cùng màn hình chi tiết của Pod ở trên.
- **Thao tác:** Thay vì bấm icon Logs, bạn bấm biểu tượng **Dấu nhắc lệnh (Shell)**. Một cửa sổ đen ngòm sẽ mở ra ngay phía dưới màn hình. Bạn đang "đứng" trực tiếp ở bên trong Pod đó. Bạn có thể gõ lệnh `ls` để xem file code, hoặc gõ `redis-cli` nếu đang chui vào hộp Redis.

### 5.3. Nâng Cấp/Mở Rộng Dịch Vụ (Scaling)
- **Vị trí:** Menu bên trái, chọn **Workloads** -> **Deployments**.
- **Thao tác:** Tìm dòng chữ `backend`. Nhấn chuột phải (hoặc nhấn vào dấu 3 chấm `...`) -> Chọn **Scale**.
- Một hộp thoại hiện ra hỏi bạn muốn bao nhiêu Pods. Bạn chỉ việc nhập số `3` hoặc `5` rồi bấm nút xác nhận. Ngay lập tức, bạn qua mục Pods sẽ thấy 3 cái hộp Backend đang được khởi động. Quá nhanh!

### 5.4. Sửa Lỗi Hộp Chứa Bị Treo (Khởi Động Lại)
- **Vị trí:** **Workloads** -> **Pods**.
- **Thao tác:** Đôi khi phần mềm bị lỗi lặt vặt (ví dụ kẹt bộ nhớ). Bạn chỉ cần chọn Pod bị lỗi, nhấn dấu `...` -> Chọn **Delete**.
- **Đừng lo:** Xóa Pod không làm hỏng hệ thống! K3s có cơ chế tự động phục hồi. Ngay khi bạn vừa xóa cái hộp lỗi, K3s sẽ lấy bản vẽ và lắp ráp ngay cho bạn một cái hộp mới cứng hoàn hảo chỉ trong 2 giây.

### 5.5. Kiểm Tra Ổ Cứng (PVC) Có Bị Đầy Không
- **Vị trí:** Menu bên trái, chọn **Storage** -> **Persistent Volume Claims**.
- **Thao tác:** Ở đây bạn sẽ thấy ổ `pg-pvc` (của Postgres) và `redis-pvc`. Nhìn cột **Capacity** (Dung lượng) và **Status**. Nếu muốn biết nó dùng hết bao nhiêu GB, bấm vào nó và cuộn xuống xem các thông số cảnh báo. 

*(Dùng Lens giúp việc quản lý K3s từ khó nhằn như Hacker trở nên dễ dàng như chơi game chiến thuật).*

---
*Ghi nhớ: K3s sinh ra là để tự động hóa, bạn đừng bao giờ cố gắng vào tận trong Pod để sửa file code hay cài cắm lặt vặt. Sửa ở môi trường Code gốc, tạo Docker Image mới và ra lệnh K3s thay áo mới là phương pháp chuẩn mực nhất!*
