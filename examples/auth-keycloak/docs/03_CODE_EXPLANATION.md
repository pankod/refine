# 🧠 Diễn Giải Kiến Trúc & Code (Dành cho người muốn tìm hiểu sâu)

Tài liệu này sẽ giải thích một cách mộc mạc và dễ hiểu nhất về những đoạn Code quan trọng nhất trong hệ thống v1.0.0. Dù bạn không phải là lập trình viên chuyên nghiệp, bạn vẫn sẽ nắm được "cách hệ thống suy nghĩ".

---

## 1. Giải thích phần Frontend (Giao diện web)

Tệp quan trọng nhất của Frontend là `src/pages/devices/list.tsx` (Nơi hiển thị cửa sổ Thiết bị).

### Form sửa thiết bị theo chuẩn ThingsBoard

Form sửa thiết bị bám theo cấu trúc của `DeviceComponent` trong ThingsBoard: tên thiết bị, hồ sơ thiết bị, nhãn, tùy chọn Gateway, tùy chọn ghi đè thời gian hoạt động và mô tả. Trạng thái Online/Offline không xuất hiện trong form vì đây là trạng thái runtime do MQTT quản lý, không phải metadata do người dùng nhập thủ công.

Các trường `label`, `description`, `isGateway` và `overwriteActivityTime` được backend lưu trong JSON `devices.additional_info`. Khi cập nhật, backend luôn merge với JSON hiện tại để không làm mất `status` và các timestamp hoạt động do MQTT ghi nhận.

### Tính năng: Tải dữ liệu "Tức thời" bằng React Query Cache
```typescript
  const { data: telemetryData = [], isLoading: isLoadingTelemetry } = useQuery({
    queryKey: ['telemetry', deviceId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/devices/${deviceId}/telemetry`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes cache
  });
```
- **Ý nghĩa**: Đoạn code này chịu trách nhiệm gọi API lấy dữ liệu. Tuy nhiên, nó rất thông minh nhờ có `useQuery`.
- Thay vì mỗi lần bạn mở cửa sổ lên nó đều bắt bạn đợi (như trình duyệt thông thường), nó có 2 tham số là `staleTime` và `gcTime`. 
- Nó sẽ lưu nháp (Cache) dữ liệu vào RAM trong 10 phút. Nếu bạn vô tình đóng cửa sổ rồi bấm mở lại, nó sẽ lấy dữ liệu từ RAM hiển thị ra ngay lập tức (0s độ trễ) cho bạn xem trước, rồi ngầm tự động tải dữ liệu mới từ Server ở phía sau (được gọi là kiến trúc **Stale-While-Revalidate**). Đây là "bí thuật" giúp các trang web lớn như ThingsBoard chạy mượt mà.

### Tính năng: Cập nhật dữ liệu Thời gian thực (Real-time MQTT)
```typescript
  React.useEffect(() => {
    if (payload) {
      // 1. Cập nhật Bảng (Table) Cache
      queryClient.setQueryData(['telemetry', deviceId], (oldData: any[]) => {
         // ... Ghi đè dữ liệu mới nhận được từ MQTT vào Cache của React Query
      });
    }
  }, [payload, deviceId, queryClient]);
```
- **Ý nghĩa**: Khi thiết bị phần cứng gửi dữ liệu qua MQTT, cái `payload` (chính là dữ liệu đó) sẽ kích hoạt hàm này.
- Hàm này không chỉ vẽ số mới lên màn hình, mà nó còn dùng `queryClient.setQueryData` để **chọc thẳng vào bộ nhớ đệm Cache** và cập nhật lại số liệu. 
- Nhờ vậy, ngay cả khi bạn đóng cửa sổ, bộ nhớ Cache vẫn đang giữ đúng con số mới nhất. Lần sau mở lên bạn sẽ thấy luôn số mới.

---

## 2. Giải thích phần Backend (Máy chủ API)

Tệp trung tâm của Backend là `backend/src/index.ts`.

### Tính năng: Lưu dữ liệu MQTT thông qua Hàng Đợi (Message Queue)
```typescript
mqttClient.on('message', async (topic, message) => {
    // 1. Phân loại tin nhắn (Telemetry hay Attributes)
    // 2. Đẩy dữ liệu vào Hàng đợi Redis (telemetry_queue hoặc attributes_queue)
    await redis.lpush('telemetry_queue', JSON.stringify(queueItem));
});
```
- **Ý nghĩa**: Bất cứ khi nào thiết bị IoT gửi dữ liệu lên, Backend KHÔNG ghi trực tiếp vào Database ngay lập tức (vì sẽ làm sập Server nếu có hàng triệu thiết bị gửi cùng lúc).
- Thay vào đó, Backend đẩy dữ liệu vào **Redis Queue** (Hàng đợi `telemetry_queue` cho dữ liệu đo lường, và `attributes_queue` cho thông số cài đặt). Redis là RAM nên tốc độ cực kỳ nhanh (hàng triệu tin nhắn mỗi giây).
- Đằng sau hệ thống có một **Telemetry Worker** (Công nhân dọn rác). Cứ mỗi 1 giây (hoặc khi gom đủ 1000 tin nhắn), anh công nhân này sẽ hốt trọn bộ dữ liệu từ Redis và dùng lệnh `prisma.$executeRaw` (Upsert) để lưu **hàng loạt (Batch Insert)** vào PostgreSQL cùng một lúc.
- Đây chính là kiến trúc **Message Queue & Batch Processing**, bí quyết giúp các hệ thống IoT chuẩn Công nghiệp xử lý hàng tỷ bản ghi mà không bao giờ bị nghẽn mạng!

### Tính năng: Xác thực bảo mật Token (Keycloak)
```typescript
const checkJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
       // ... kiểm tra chìa khóa
    } else {
       return res.status(401).json({ error: "Unauthorized" });
    }
}
app.use(checkJwt); // Bật khiên bảo vệ cho toàn bộ hệ thống
```
- **Ý nghĩa**: Đoạn code này đóng vai trò là "Bác bảo vệ". Bất kỳ ai gọi API (`/devices/...`) đều phải đi qua hàm này (gọi là middleware). 
- Bác bảo vệ sẽ kiểm tra xem người này có đeo "Thẻ nhân viên" (Token) hợp lệ do Keycloak phát hành hay không. Nếu không có hoặc thẻ giả, bác bảo vệ sẽ đá ra ngoài bằng lỗi `401 Unauthorized` ngay lập tức, không cho phép truy cập vào Database.

---

## 3. Kiến trúc CSDL Lõi: Bảng Relations

Mô hình thiết bị v1.0.0 đã được thiết kế mở rộng lấy cảm hứng từ cấu trúc phân tầng của Thingsboard.

### Tính năng: Bảng `relation`
- **Ý nghĩa**: Trong thế giới IoT, các thiết bị hiếm khi đứng độc lập. Một Cảm biến (Sensor) thường phải cắm vào một Bộ Thu Thập (Gateway). 
- Bảng `relation` sinh ra để giải quyết bài toán này mà không làm phình to bảng `devices`. Nó lưu mối quan hệ giữa bất kỳ 2 thực thể nào:
  - `from_id`: ID của thực thể gốc (VD: Gateway)
  - `to_id`: ID của thực thể đích (VD: Sensor)
  - `relation_type`: Loại quan hệ (VD: `Contains` - Chứa đựng, hoặc `Manages` - Quản lý).
- **Tính hai chiều (Bi-directional)**: Dù trong Database chỉ lưu 1 chiều (Từ A -> B), Backend API `/relations` được thiết kế thông minh để khi bạn truy vấn `B`, nó sẽ tự tra ngược lại để cho bạn biết `B` đang được cắm vào `A` (Từ `To` truy ngược ra `From`). Điều này giúp vẽ sơ đồ Topology dễ dàng.
