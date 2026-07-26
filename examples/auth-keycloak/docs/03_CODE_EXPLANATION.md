# 🧠 Diễn Giải Kiến Trúc & Code (Dành cho người muốn tìm hiểu sâu)

Tài liệu này sẽ giải thích một cách mộc mạc và dễ hiểu nhất về những đoạn Code quan trọng nhất trong hệ thống v1.0.0. Dù bạn không phải là lập trình viên chuyên nghiệp, bạn vẫn sẽ nắm được "cách hệ thống suy nghĩ".

---

## 1. Giải thích phần Frontend (Giao diện web)

Tệp quan trọng nhất của Frontend là `src/pages/devices/list.tsx` (Nơi hiển thị cửa sổ Thiết bị).

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

### Tính năng: Lưu dữ liệu MQTT vào Database và Redis
```typescript
mqttClient.on('message', async (topic, message) => {
    // 1. Lưu thông số mới nhất vào Redis (Tốc độ ánh sáng)
    await redisClient.hSet(`device:${device.id}:telemetry`, key, value);

    // 2. Lưu thành lịch sử vào PostgreSQL (Lưu trữ vĩnh viễn)
    await prisma.deviceTelemetry.create({
        data: {
            deviceId: device.id,
            key: key,
            value: Number(value) || 0
        }
    });
});
```
- **Ý nghĩa**: Đây là trái tim của hệ thống hứng dữ liệu. Bất cứ khi nào thiết bị IoT gửi dữ liệu lên, Backend sẽ làm song song 2 việc:
  1. Ghi vào **Redis**: Redis giống như một tờ giấy nháp, truy cập cực nhanh. Backend ghi đè số mới nhất lên đây để Frontend có thể lấy ra hiển thị lập tức mà không cần lục tìm khó khăn.
  2. Ghi vào **PostgreSQL**: Postgres giống như một cuốn sổ kho bìa cứng. Dữ liệu sẽ được ghi thành từng dòng lịch sử (Ngày này, giờ này, nhiệt độ là bao nhiêu). Dữ liệu này dùng để vẽ Biểu Đồ quá khứ.

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
