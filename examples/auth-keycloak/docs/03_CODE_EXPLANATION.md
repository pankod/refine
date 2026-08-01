# 🧠 Diễn Giải Kiến Trúc & Code (Dành cho người muốn tìm hiểu sâu)

Tài liệu này giải thích các phần code quan trọng của hệ thống v2.0.9. Dù bạn không phải là lập trình viên chuyên nghiệp, bạn vẫn có thể nắm được cách hệ thống xử lý dữ liệu.

---

## 1. Giải thích phần Frontend (Giao diện web)

Tệp quan trọng nhất của Frontend là `src/pages/devices/list.tsx` (Nơi hiển thị cửa sổ Thiết bị).

### Form sửa thiết bị theo chuẩn ThingsBoard

Form sửa thiết bị bám theo cấu trúc của `DeviceComponent` trong ThingsBoard: tên thiết bị, hồ sơ thiết bị, nhãn, tùy chọn Gateway, tùy chọn ghi đè thời gian hoạt động và mô tả. Trạng thái Online/Offline không xuất hiện trong form vì đây là trạng thái runtime do MQTT quản lý, không phải metadata do người dùng nhập thủ công.

Các trường `label`, `description`, `gateway` và `overwriteActivityTime` được backend lưu trong JSON `devices.additional_info`. Cờ `gateway` độc lập với Device Profile (`type`), giống mô hình ThingsBoard. Backend vẫn đọc `isGateway` cũ để nâng cấp không gián đoạn, nhưng loại bỏ key cũ khi bản ghi được chỉnh sửa.

Trang `/gateways` dùng resource Refine `gateways`; `apiDeviceProvider` ánh xạ resource này về REST API `/devices` và luôn bổ sung `gateway: true` khi tạo. Modal đặt `redirect: false` để Save không chuyển sang trang Thiết bị. Backend tự sinh credential mặc định nên form không có checkbox tự sinh Access Token.

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
    const credential = await getDeviceByCredential(deviceKey);
    await telemetryQueue.enqueue({
      type: 'telemetry', tenantId: credential.tenantId,
      deviceId: credential.deviceId, deviceKey,
      ts: Date.now(), values: JSON.parse(message.toString())
    });
});
```
- **Ý nghĩa**: Bất cứ khi nào thiết bị IoT gửi dữ liệu lên, Backend KHÔNG ghi trực tiếp vào Database ngay lập tức (vì sẽ làm sập Server nếu có hàng triệu thiết bị gửi cùng lúc).
- EMQX chia tải giữa các backend bằng shared subscription `$share/telemetry-ingest/...`. Cấu hình EMQX production nên dùng `hash_clientid` để cùng một publisher được đưa ổn định về cùng consumer.
- Backend cache ánh xạ Device Key sang `tenantId/deviceId`, sau đó ghi nguyên MQTT payload thành một entry Redis Stream. Stream được chia shard theo hash `tenantId + deviceId`.
- Worker đọc bằng `XREADGROUP`, gom batch PostgreSQL, chỉ `XACK` và `XDEL` sau khi transaction commit. Entry lỗi được retry, consumer chết được thu hồi bằng `XAUTOCLAIM`, quá số lần thử sẽ chuyển sang DLQ.
- `lastActivityTime` được cập nhật một lần cho mỗi device trong batch, không còn query cho từng telemetry key.
- Interface `TelemetryQueue` tách ingestion khỏi Redis để sau này có thể thêm Kafka implementation mà không sửa MQTT parser.

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

Mô hình thiết bị được thiết kế mở rộng, tham chiếu cấu trúc thực thể của ThingsBoard CE.

### Tính năng: Bảng `relation`
- **Ý nghĩa**: Trong thế giới IoT, các thiết bị hiếm khi đứng độc lập. Một Cảm biến (Sensor) thường phải cắm vào một Bộ Thu Thập (Gateway). 
- Bảng `relation` sinh ra để giải quyết bài toán này mà không làm phình to bảng `devices`. Nó lưu mối quan hệ giữa bất kỳ 2 thực thể nào:
  - `from_id`: ID của thực thể gốc (VD: Gateway)
  - `to_id`: ID của thực thể đích (VD: Sensor)
  - `relation_type`: Loại quan hệ (VD: `Contains` - Chứa đựng, hoặc `Manages` - Quản lý).
- **Tính hai chiều (Bi-directional)**: Dù trong Database chỉ lưu 1 chiều (Từ A -> B), Backend API `/relations` được thiết kế thông minh để khi bạn truy vấn `B`, nó sẽ tự tra ngược lại để cho bạn biết `B` đang được cắm vào `A` (Từ `To` truy ngược ra `From`). Điều này giúp vẽ sơ đồ Topology dễ dàng.

### Gateway transport và cô lập tenant

Topic chuẩn `v1/gateway/*` không chứa Device Key trong đường dẫn. Vì vậy MQTT subscriber thông thường không thể biết Gateway nào đã publish. EMQX Rule/Webhook chuyển tiếp thêm `username` MQTT tới `POST /api/mqtt/gateway`; backend kiểm tra credential, cờ `gateway`, rồi mới xử lý payload trong tenant của Gateway.

Module `backend/src/mqtt/gatewayService.ts` đảm nhiệm:

- tự tạo downstream device khi nhận connect/telemetry/attributes;
- tạo relation `Contains` giữa Gateway và downstream device;
- đẩy cả telemetry và client attributes vào Redis Streams để worker batch/ACK;
- cập nhật `active`, `lastConnectTime`, `lastDisconnectTime`, `lastActivityTime`;
- áp dụng `overwriteActivityTime` cho các thiết bị đang kết nối.

Credential được tách khỏi response danh sách thiết bị và chỉ lấy qua endpoint riêng. Điều này tránh phát tán Secret trong mọi lần tải bảng.
