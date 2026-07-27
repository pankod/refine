import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import crypto from 'crypto';
import { redis } from './redis/redisClient';
import { startMqttClient, publishLiveEvent } from './mqtt/mqttClient';
import { startTelemetryWorker } from './workers/telemetryWorker';

/**
 * ============================================================================
 * MODULE: BACKEND CORE (Trái tim của hệ thống quản lý)
 * ============================================================================
 * Nhiệm vụ:
 * - Cung cấp toàn bộ các API (Cổng giao tiếp) để Frontend (Web) có thể tương tác.
 * - Quản lý việc tạo/xóa/sửa Thiết bị và Bảng điều khiển (Dashboards).
 * - Cung cấp cổng xác thực (Auth/ACL) cho máy chủ EMQX Broker để kiểm duyệt
 *   quyền truy cập của các thiết bị IoT.
 * - Khởi chạy các Background Worker (Telemetry, MQTT) ngay khi server khởi động.
 */

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const port = process.env.PORT || 3000;

app.use(cors({
  exposedHeaders: ['x-total-count']
}));
app.use(express.json());

// Tích hợp Keycloak JWT Middleware
/**
 * Lớp bảo vệ (Middleware): Xác thực JWT Token thông qua Keycloak
 * Nhiệm vụ:
 * - Mọi yêu cầu (Request) gọi vào API đều phải đi qua chốt chặn này.
 * - Nó sẽ liên hệ với Keycloak (Máy chủ SSO) để lấy khóa giải mã (JWKS).
 * - Nếu thẻ VIP (Token) hợp lệ, chưa hết hạn, và do đúng Keycloak cấp, nó mới cho đi qua.
 * - Ngược lại, nó sẽ đá văng ra ngoài với mã lỗi 401 Unauthorized.
 */
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true, // Trống tấn công DDoS vào hệ thống giải mã
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://auth.greeniq.vn/realms/master/protocol/openid-connect/certs'
  }) as GetVerificationKey,
  issuer: 'https://auth.greeniq.vn/realms/master',
  algorithms: ['RS256']
}).unless({
  // Ngoại lệ: Các đường dẫn này không cần thẻ VIP (Token)
  // /api/mqtt/* được dùng riêng cho EMQX gọi nội bộ, đã có cơ chế bảo mật riêng.
  path: ['/', '/api/mqtt/auth', '/api/mqtt/acl']
});

// Áp dụng JWT cho toàn bộ API
app.use(checkJwt);

/**
 * Xử lý lỗi (Error Handler) cho JWT
 * Nếu Token sai hoặc hết hạn, trả về thông báo lỗi rõ ràng bằng tiếng Việt cho Frontend.
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Token đăng nhập không hợp lệ hoặc đã hết hạn.' });
  } else {
    next(err);
  }
});

/**
 * Hàm phụ trợ: Tạo chuỗi ký tự ngẫu nhiên siêu bảo mật.
 * Dùng để cấp "Mã Thiết Bị" (deviceKey) và "Mật Khẩu" (secretToken) khi tạo mới thiết bị.
 * @param length Độ dài của chuỗi cần tạo
 * @returns Chuỗi ký tự ngẫu nhiên
 */
const generateSecureToken = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.randomFillSync(randomArray); // Dùng thư viện mã hóa của Node.js để đảm bảo không thể đoán được
  for (let i = 0; i < length; i++) {
    result += chars[randomArray[i] % chars.length];
  }
  return result;
};

/**
 * Hàm phụ trợ: Lấy ID của Công ty mặc định (Tenant).
 * Kiến trúc chuẩn IoT (ThingsBoard) yêu cầu mọi thực thể (Thiết bị, Dashboard)
 * đều phải thuộc sở hữu của một Công ty (Tenant) hoặc Khách hàng (Customer).
 * Hàm này sẽ tự động tạo một Tenant mặc định nếu chưa có trong Database.
 * @returns UUID của Tenant
 */
const getDefaultTenant = async () => {
  let tenant = await prisma.tenants.findFirst();
  if (!tenant) {
    tenant = await prisma.tenants.create({
      data: {
        title: 'GreenIQ Default Tenant',
        email: 'admin@greeniq.vn'
      }
    });
  }
  return tenant.id;
};

// ==========================================
// NHÓM API QUẢN LÝ BẢNG ĐIỀU KHIỂN (DASHBOARDS)
// ==========================================

/**
 * [GET] Lấy danh sách toàn bộ Bảng điều khiển (Dashboards)
 * @description API này được Frontend gọi để vẽ danh sách Dashboard.
 * Dữ liệu trả về sẽ được format (chế biến lại) cho đúng chuẩn cấu trúc mà Frontend cần.
 */
app.get('/dashboards', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [dashboards, total] = await Promise.all([
    prisma.dashboards.findMany({
      orderBy: { created_at: 'desc' },
      skip,
      take: limit
    }),
    prisma.dashboards.count()
  ]);
  const formatted = dashboards.map(d => ({
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '', // Ép kiểu JSON an toàn
    createdAt: d.created_at
  }));
  res.setHeader('x-total-count', total.toString());
  res.json(formatted);
});

/**
 * [GET] Lấy chi tiết một Bảng điều khiển cụ thể
 * @param id Mã định danh của Dashboard
 */
app.get('/dashboards/:id', async (req, res) => {
  const d = await prisma.dashboards.findUnique({
    where: { id: req.params.id }
  });
  if (!d) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json({
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  });
});

/**
 * [POST] Tạo mới Bảng điều khiển
 * @description Khi người dùng điền Form tạo mới và bấm "Lưu", API này sẽ lưu vào DB.
 * Đồng thời, nó bắn 1 cái loa thông báo (Live Event) qua MQTT để các Web khác biết mà reload lại trang.
 */
app.post('/dashboards', async (req, res) => {
  const { title, description } = req.body;
  const tenantId = await getDefaultTenant();
  
  const d = await prisma.dashboards.create({
    data: { 
      title, 
      tenant_id: tenantId,
      configuration: { description: description || '' } 
    }
  });
  const payload = {
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  };
  
  publishLiveEvent('dashboards', 'created', payload); // Bắn thông báo cập nhật thời gian thực
  res.status(201).json(payload);
});

/**
 * [PATCH] Cập nhật thông tin Bảng điều khiển
 * @param id Mã định danh của Dashboard
 */
app.patch('/dashboards/:id', async (req, res) => {
  const { title, description } = req.body;
  const d = await prisma.dashboards.update({
    where: { id: req.params.id },
    data: { 
      title, 
      configuration: { description: description || '' }
    }
  });
  const payload = {
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  };
  publishLiveEvent('dashboards', 'updated', payload);
  res.json(payload);
});

/**
 * [DELETE] Xóa một Bảng điều khiển
 * @param id Mã định danh của Dashboard
 */
app.delete('/dashboards/:id', async (req, res) => {
  await prisma.dashboards.delete({
    where: { id: req.params.id }
  });
  publishLiveEvent('dashboards', 'deleted', { id: req.params.id });
  res.json({ success: true });
});

// ==========================================
// NHÓM API QUẢN LÝ THIẾT BỊ (DEVICES)
// ==========================================
app.get('/', (req, res) => {
  res.send('Backend API Running...');
});

// ==========================================
// NHÓM API BẢO MẬT MQTT (EMQX HTTP AUTH/ACL)
// ==========================================

/**
 * [POST] Kiểm tra Đăng nhập MQTT (Authentication)
 * @description Máy chủ EMQX sẽ gọi API này mỗi khi có một thiết bị hoặc user muốn kết nối.
 * Hệ thống sẽ kiểm tra xem Tên đăng nhập và Mật khẩu có đúng không.
 */
app.post('/api/mqtt/auth', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username) return res.status(401).send('ignore');

  // 1. Dành cho Backend Service: Cho phép vào và cấp quyền Siêu quản trị (is_superuser: true)
  // Backend cần quyền này để đăng ký nghe mọi chủ đề của mọi thiết bị.
  if (username === 'backend_service') {
    if (password === process.env.BACKEND_MQTT_SECRET || password === 'super_secret_backend') {
      return res.status(200).json({ result: 'allow', is_superuser: true });
    }
    return res.status(401).send('deny');
  }

  // 2. Dành cho Frontend Web: Chỉ cho phép vào nhưng KHÔNG có quyền quản trị (is_superuser: false)
  // Frontend chỉ được phép nghe thông báo chứ không được điều khiển hệ thống.
  if (username === 'frontend_readonly') {
    if (password === 'public_frontend_token') {
      return res.status(200).json({ result: 'allow', is_superuser: false });
    }
    return res.status(401).send('deny');
  }

  // 3. Dành cho Thiết bị IoT (ESP32)
  // Username chính là MÃ_THIẾT_BỊ (deviceKey), Password là MÃ_BÍ_MẬT (secretToken).
  const creds = await prisma.device_credentials.findUnique({
    where: { credentials_id: username }
  });

  if (creds && creds.credentials_value === password) {
    return res.status(200).json({ result: 'allow', is_superuser: false });
  }

  // Chặn cửa nếu sai mật khẩu
  return res.status(401).send('deny');
});

/**
 * [POST] Kiểm tra Phân quyền MQTT (Authorization - ACL)
 * @description Sau khi kết nối thành công, EMQX sẽ gọi API này mỗi khi thiết bị 
 * muốn "Gửi dữ liệu" (publish) hoặc "Nghe lén" (subscribe) một kênh (topic) nào đó.
 */
app.post('/api/mqtt/acl', (req, res) => {
  const { username, topic, action } = req.body;

  // Hành động có thể là: 'publish' (gửi) hoặc 'subscribe' (nghe)
  
  // 1. Backend Service: Đã được cấp quyền is_superuser nên EMQX không cần gọi API này nữa.
  // Nhưng nếu lỡ gọi, ta vẫn cho phép tất cả (allow)
  if (username === 'backend_service') {
    return res.status(200).json({ result: 'allow' });
  }

  // 2. Frontend Web: Chỉ được phép NGHE (subscribe)
  if (username === 'frontend_readonly') {
    if (action === 'subscribe') {
      // Chỉ cho phép nghe kênh thông báo hệ thống (refine) hoặc dữ liệu thiết bị (telemetry)
      if (topic.startsWith('v1/sys/refine/') || topic.startsWith('v1/devices/')) {
        return res.status(200).json({ result: 'allow' });
      }
    }
    return res.status(401).send('deny');
  }

  // 3. Thiết bị IoT: Chỉ được phép GỬI (publish) dữ liệu
  // Quan trọng: Nó chỉ được gửi lên đúng kênh có chứa MÃ_THIẾT_BỊ của nó.
  // Format bắt buộc: v1/devices/<DEVICE_KEY>/telemetry
  if (action === 'publish' && topic === `v1/devices/${username}/telemetry`) {
    return res.status(200).json({ result: 'allow' });
  }

  // Chặn mọi hành vi gửi/nghe không đúng quy định
  return res.status(401).send('deny');
});

/**
 * [GET] Lấy danh sách toàn bộ Thiết bị
 * @description API này giúp Frontend vẽ danh sách Thiết bị.
 * Phải dùng cú pháp "include" của Prisma để nối bảng `device_credentials`,
 * từ đó lấy ra được Mã bí mật của thiết bị hiển thị lên giao diện.
 */
app.get('/devices', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [devices, total] = await Promise.all([
    prisma.devices.findMany({
      include: { device_credentials: true }, // Nối bảng để lấy Mật khẩu (Secret)
      orderBy: { created_at: 'desc' }, // Sắp xếp mới nhất lên đầu
      skip,
      take: limit
    }),
    prisma.devices.count()
  ]);
  
  // Định dạng lại JSON theo cấu trúc mà Giao diện Refine yêu cầu
  const formatted = devices.map(d => ({
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  }));
  res.setHeader('x-total-count', total.toString());
  res.json(formatted);
});

/**
 * [GET] Lấy chi tiết một Thiết bị
 * @param id Mã định danh của thiết bị
 */
app.get('/devices/:id', async (req, res) => {
  const d = await prisma.devices.findUnique({
    where: { id: req.params.id },
    include: { device_credentials: true }
  });
  if (!d) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json({
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  });
});

/**
 * [POST] Tạo mới Thiết bị
 * @description Quy trình:
 * 1. Lấy mã Tenant.
 * 2. Tạo thiết bị mới trong bảng `devices`.
 * 3. Sinh mã ngẫu nhiên và chèn vào bảng `device_credentials` (Nối bảng).
 * 4. Bắn loa thông báo (Live Event) cho Frontend cập nhật UI.
 */
app.post('/devices', async (req, res) => {
  const { name, type } = req.body;
  const tenantId = await getDefaultTenant();
  
  // Tạo Thiết bị và đồng thời chèn Mã Token vào bảng device_credentials (Nối bảng)
  const d = await prisma.devices.create({
    data: {
      name,
      type: type || 'default',
      tenant_id: tenantId,
      additional_info: { status: 'offline' },
      device_credentials: {
        create: {
          credentials_type: 'ACCESS_TOKEN',
          credentials_id: generateSecureToken(20), // Tạo Mã thiết bị ngẫu nhiên
          credentials_value: generateSecureToken(32) // Tạo Mật khẩu ngẫu nhiên
        }
      }
    },
    include: { device_credentials: true }
  });
  
  const payload = {
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  };
  publishLiveEvent('devices', 'created', payload);
  res.status(201).json(payload);
});

/**
 * [PATCH] Cập nhật thông tin Thiết bị
 * @param id Mã định danh thiết bị
 */
app.patch('/devices/:id', async (req, res) => {
  const { name, type, status } = req.body;
  
  const d = await prisma.devices.update({
    where: { id: req.params.id },
    data: { 
      name, 
      type, 
      additional_info: { status: status || 'offline' }
    },
    include: { device_credentials: true }
  });
  
  const payload = {
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  };
  publishLiveEvent('devices', 'updated', payload);
  res.json(payload);
});

/**
 * [DELETE] Xóa Thiết bị (Có chế độ dọn rác - Cascading Delete)
 * @param id Mã định danh thiết bị
 * @description Chuẩn IoT ThingsBoard bắt buộc khi xóa thiết bị phải dọn sạch rác
 * (Lịch sử đo lường telemetry_kv) để tránh phình to cơ sở dữ liệu vô ích.
 */
app.delete('/devices/:id', async (req, res) => {
  const deviceId = req.params.id;

  // 1. Quét dọn rác: Xóa toàn bộ dữ liệu đo lường (telemetry) của thiết bị này trước
  await prisma.telemetry_kv.deleteMany({
    where: { entity_id: deviceId }
  });

  // 2. Sau khi đã sạch rác, tiến hành xóa thiết bị
  await prisma.devices.delete({
    where: { id: deviceId }
  });
  
  publishLiveEvent('devices', 'deleted', { id: deviceId });
  res.json({ success: true });
});

// ==========================================
// NHÓM API QUẢN LÝ DỮ LIỆU ĐO LƯỜNG (TELEMETRY)
// ==========================================

/**
 * [GET] Lấy Dữ liệu Đo lường Mới Nhất
 * @param id Mã định danh thiết bị
 * @description (TỐI ƯU HÓA BỞI REDIS) - Đọc thẳng từ RAM tốc độ 0ms thay vì quét ổ cứng Database
 */
app.get('/devices/:id/telemetry', async (req, res) => {
  try {
    const deviceId = req.params.id;
    
    // 1. Lấy DeviceKey (Mã thiết bị thực tế) từ UUID
    const creds = await prisma.device_credentials.findFirst({
      where: { device_id: deviceId }
    });
    
    if (creds?.credentials_id) {
      // 2. Đọc TOÀN BỘ dữ liệu mới nhất từ RAM (Redis) siêu tốc độ (O(1))
      const cachedData = await redis.hgetall(`latest_telemetry:${creds.credentials_id}`);
      
      if (cachedData && Object.keys(cachedData).length > 0) {
        // Chuyển đổi từ chuỗi Redis thành Mảng JSON cho Frontend
        const finalData = Object.values(cachedData).map(str => {
          const item = JSON.parse(str);
          return {
            key: item.key,
            value: item.dbl_v !== null ? item.dbl_v : (item.long_v !== null ? item.long_v : (item.bool_v !== null ? item.bool_v : item.str_v)),
            lastUpdate: new Date(item.ts)
          };
        });
        
        return res.json(finalData); // Trả về siêu tốc, Bỏ qua việc quét Database!
      }
    }

    // 3. FALLBACK: Nếu Redis bị khởi động lại hoặc mất mát, mới chui xuống Postgres quét đĩa
    console.warn(`[API] Cache miss for ${deviceId}, falling back to Postgres...`);
    const telemetries = await prisma.telemetry_kv.findMany({
      where: { entity_id: deviceId },
      orderBy: { ts: 'desc' }, 
      take: 50
    });
    
    const latestByKey = new Map();
    for (const t of telemetries) {
      if (!latestByKey.has(t.key)) {
        latestByKey.set(t.key, {
          key: t.key,
          value: t.dbl_v !== null ? t.dbl_v : (t.long_v !== null ? Number(t.long_v) : (t.bool_v !== null ? t.bool_v : t.str_v)),
          lastUpdate: t.ts
        });
      }
    }
    
    res.json(Array.from(latestByKey.values()));
  } catch (err) {
    console.error('[API] Error fetching telemetry:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * [GET] Lấy Lịch sử Đo lường (Cho Biểu Đồ)
 * @param id Mã định danh thiết bị
 * @description Hàm này được Frontend gọi để vẽ biểu đồ Line Chart (Ví dụ: biến thiên nhiệt độ).
 * Nó sẽ lấy 200 điểm dữ liệu trong quá khứ và không cần lọc giá trị mới nhất.
 */
app.get('/devices/:id/telemetry/history', async (req, res) => {
  try {
    const telemetries = await prisma.telemetry_kv.findMany({
      where: { entity_id: req.params.id },
      orderBy: { ts: 'desc' },
      take: 200 // Lấy 200 điểm gần nhất
    });

    const historyData = telemetries.map(t => ({
      key: t.key,
      value: t.dbl_v !== null ? t.dbl_v : (t.long_v !== null ? Number(t.long_v) : (t.bool_v !== null ? t.bool_v : t.str_v)),
      ts: t.ts // Giữ nguyên mốc thời gian để vẽ đồ thị
    }));

    res.json(historyData);
  } catch (err: any) {
    console.error('[API] Error fetching telemetry history:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ==========================================
// KHỞI ĐỘNG CÁC DỊCH VỤ NỀN (BACKGROUND SERVICES)
// ==========================================

// Bật MQTT Client: Lắng nghe liên tục kết nối từ EMQX Broker
startMqttClient();

// Bật Telemetry Worker: Định kỳ hốt dữ liệu từ Redis nạp vào DB mỗi giây
startTelemetryWorker();

/**
 * Xử lý lỗi cấp cao (Global Error Handler)
 * Đảm bảo Server không bị crash (tắt ngang) nếu có lỗi không mong muốn xảy ra.
 */
app.use((err: any, req: any, res: any, next: any) => { 
  console.error('EXPRESS ERROR 500:', err); 
  res.status(500).json({ error: err.message, stack: err.stack, name: err.name }); 
});

// Bắt đầu mở cổng Server (Mặc định: 3000)
app.listen(port, () => {
  console.log(`🚀 Backend API đã chạy thành công trên địa chỉ: http://localhost:${port}`);
});
