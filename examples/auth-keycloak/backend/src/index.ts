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
import { startMqttClient, publishLiveEvent, publishSharedAttributes } from './mqtt/mqttClient';
import { processGatewayMessage } from './mqtt/gatewayService';
import { startTelemetryWorker } from './workers/telemetryWorker';
import { startInactivityWorker } from './workers/inactivityWorker';
import { startTelemetryRetentionWorker } from './workers/telemetryRetentionWorker';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger_output.json';
import { getDeviceByCredential, invalidateDeviceCredential } from './cache/deviceCredentialCache';
import { telemetryQueue } from './queue/telemetryQueue';
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

// Setup Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



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
  path: ['/', '/api/mqtt/auth', '/api/mqtt/acl', '/api/mqtt/gateway']
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

const getDeviceInfo = (additionalInfo: unknown): Record<string, any> & {
  gateway: boolean;
  overwriteActivityTime: boolean;
} => {
  const info = (additionalInfo as Record<string, any>) || {};
  return {
    ...info,
    gateway: info.gateway ?? info.isGateway ?? false,
    overwriteActivityTime: info.overwriteActivityTime ?? false
  };
};

const formatDevice = (device: any, connectedDeviceCount = 0) => {
  const info = getDeviceInfo(device.additional_info);
  return {
    id: device.id,
    name: device.name,
    type: device.type,
    status: info.status || 'offline',
    gateway: info.gateway,
    // Alias tam thoi de cac client v2.0.8 cu khong bi vo khi nang cap.
    isGateway: info.gateway,
    overwriteActivityTime: info.overwriteActivityTime,
    label: info.label || '',
    description: info.description || '',
    connectedDeviceCount,
    created_at: device.created_at
  };
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
  /* #swagger.tags = ['Dashboards'] */
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
  /* #swagger.tags = ['Dashboards'] */
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
  /* #swagger.tags = ['Dashboards'] */
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
  /* #swagger.tags = ['Dashboards'] */
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
  /* #swagger.tags = ['Dashboards'] */
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
  /* #swagger.tags = ['System'] */
  res.send('Backend API Running...');
});

app.get('/api/system/queue/health', async (req, res) => {
  /* #swagger.tags = ['System'] */
  try {
    res.json({ status: 'ok', queue: 'redis-streams', streams: await telemetryQueue.stats() });
  } catch (error: any) {
    res.status(503).json({ status: 'unavailable', error: error?.message || String(error) });
  }
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
  /* #swagger.tags = ['MQTT Auth/ACL'] */
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
  const creds = await getDeviceByCredential(username);
  const suppliedSecret = typeof password === 'string' ? password : '';
  const storedSecret = creds?.secret || '';
  const secretMatches = suppliedSecret.length === storedSecret.length && storedSecret.length > 0 &&
    crypto.timingSafeEqual(Buffer.from(suppliedSecret), Buffer.from(storedSecret));

  if (creds && secretMatches) {
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
app.post('/api/mqtt/acl', async (req, res) => {
  /* #swagger.tags = ['MQTT Auth/ACL'] */
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

  // 3. Thiết bị IoT: Được phép GỬI (publish) dữ liệu telemetry và attributes
  // Chuẩn ThingsBoard: Device publish v1/devices/{deviceKey}/telemetry VÀ v1/devices/{deviceKey}/attributes
  if (action === 'publish' && (
    topic === `v1/devices/${username}/telemetry` ||
    topic === `v1/devices/${username}/attributes`
  )) {
    return res.status(200).json({ result: 'allow' });
  }

  // Gateway API dung topic chung, nen chi device co additionalInfo.gateway=true moi duoc dung.
  // Ho tro doc isGateway cua du lieu v2.0.8 trong giai doan chuyen doi.
  if (typeof username === 'string' && topic?.startsWith('v1/gateway/')) {
    const credential = await getDeviceByCredential(username);
    const isGateway = credential?.gateway || false;
    const publishTopics = new Set([
      'v1/gateway/connect',
      'v1/gateway/disconnect',
      'v1/gateway/telemetry',
      'v1/gateway/attributes',
      'v1/gateway/attributes/request',
      'v1/gateway/rpc/response'
    ]);
    const subscribeTopics = new Set([
      'v1/gateway/attributes',
      'v1/gateway/attributes/response',
      'v1/gateway/rpc'
    ]);
    if (isGateway && (
      (action === 'publish' && publishTopics.has(topic)) ||
      (action === 'subscribe' && subscribeTopics.has(topic))
    )) {
      return res.status(200).json({ result: 'allow' });
    }
  }

  // Chặn mọi hành vi gửi/nghe không đúng quy định
  return res.status(401).send('deny');
});

/**
 * EMQX Rule/Webhook chuyen tiep Gateway message vao day, kem username MQTT.
 * Khong xu ly truc tiep tu MQTT subscriber vi topic v1/gateway/* khong chua danh tinh
 * publisher; lam vay se co nguy co ghi cheo tenant.
 */
app.post('/api/mqtt/gateway', async (req, res) => {
  /* #swagger.tags = ['Gateway MQTT API']
     #swagger.summary = 'EMQX Webhook xử lý các luồng dữ liệu chuẩn Gateway'
     #swagger.description = '<h3>1. Thông Tin Kết Nối</h3><ul><li><b>Host</b>: <code>mqtt.greeniq.vn</code></li><li><b>Port</b>: <code>1883</code> (TCP) / <code>8083</code> (WS)</li><li><b>Username/Password</b>: Lấy từ thông tin thiết bị (Bắt buộc thiết bị phải bật cờ Gateway)</li></ul><h3>2. Các Topic Hỗ Trợ</h3><b>Kết nối thiết bị con</b><ul><li>Topic: <code>v1/gateway/connect</code></li><li>Payload: <code>{"device":"Device A","type":"sensor"}</code></li></ul><b>Ngắt kết nối thiết bị con</b><ul><li>Topic: <code>v1/gateway/disconnect</code></li><li>Payload: <code>{"device":"Device A"}</code></li></ul><b>Gửi Telemetry</b><ul><li>Topic: <code>v1/gateway/telemetry</code></li><li>Payload: <code>{"Device A":[{"ts":1700000000000,"values":{"temperature":23.5}}]}</code></li></ul><b>Gửi Client Attributes</b><ul><li>Topic: <code>v1/gateway/attributes</code></li><li>Payload: <code>{"Device A":{"firmware":"1.0"}}</code></li></ul><b>Yêu cầu Shared Attributes</b><ul><li>Topic gửi: <code>v1/gateway/attributes/request</code><br/>Payload: <code>{"id": 1, "device": "Device A", "clientKeys": "attr1", "sharedKeys": "shared1"}</code></li><li>Topic nhận: <code>v1/gateway/attributes/response</code></li></ul><b>Server-side RPC (Nhận lệnh từ Server)</b><ul><li>Topic nhận lệnh: <code>v1/gateway/rpc</code><br/>Payload: <code>{"device": "Device A", "data": {"id": 123, "method": "setRelay", "params": {}}}</code></li><li>Topic phản hồi: <code>v1/gateway/rpc/response</code><br/>Payload: <code>{"device": "Device A", "id": 123, "data": {"success": true}}</code></li></ul>'
  */
  const hookSecret = process.env.EMQX_WEBHOOK_SECRET;
  const providedSecret = req.header('x-emqx-hook-secret');
  const secretMatches = !!hookSecret && !!providedSecret &&
    Buffer.byteLength(hookSecret) === Buffer.byteLength(providedSecret) &&
    crypto.timingSafeEqual(Buffer.from(hookSecret), Buffer.from(providedSecret));
  if (!secretMatches) {
    return res.status(401).json({ error: 'EMQX webhook secret khong hop le.' });
  }

  const { username, topic, payload } = req.body || {};
  if (typeof username !== 'string' || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Thieu username hoac topic.' });
  }

  try {
    const result = await processGatewayMessage(username, topic, payload);
    return res.status(202).json(result);
  } catch (error: any) {
    const status = error?.statusCode || 400;
    return res.status(status).json({ error: error?.message || 'Gateway message khong hop le.' });
  }
});

/**
 * [GET] Lấy danh sách toàn bộ Thiết bị
 * @description API này giúp Frontend vẽ danh sách Thiết bị.
 * Credential khong duoc tra trong list; frontend chi lay qua endpoint rieng khi can.
 */
app.get('/devices', async (req, res) => {
  /* #swagger.tags = ['Devices'] */
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const gateway = req.query.gateway === 'true' || req.query.isGateway === 'true';
  const search = String(req.query.search || '').trim();
  const where: any = {};
  const filters: any[] = [];
  if (gateway) {
    filters.push({
      OR: [
        { additional_info: { path: ['gateway'], equals: true } },
        { additional_info: { path: ['isGateway'], equals: true } }
      ]
    });
  }
  if (search) {
    filters.push({ name: { contains: search, mode: 'insensitive' } });
  }
  if (filters.length) {
    where.AND = filters;
  }

  const [devices, total] = await Promise.all([
    prisma.devices.findMany({
      where,
      orderBy: { created_at: 'desc' }, // Sắp xếp mới nhất lên đầu
      skip,
      take: limit
    }),
    prisma.devices.count({ where })
  ]);
  
  // Định dạng lại JSON theo cấu trúc mà Giao diện Refine yêu cầu
  const relationCounts = gateway && devices.length
    ? await prisma.relation.groupBy({
        by: ['from_id'],
        where: {
          from_id: { in: devices.map(device => device.id) },
          from_type: 'DEVICE',
          to_type: 'DEVICE',
          relation_type_group: 'COMMON',
          relation_type: 'Contains'
        },
        _count: { _all: true }
      })
    : [];
  const countByGateway = new Map(relationCounts.map(row => [row.from_id, row._count._all]));
  const formatted = devices.map(device => formatDevice(device, countByGateway.get(device.id) || 0));
  res.setHeader('x-total-count', total.toString());
  res.json(formatted);
});

/**
 * [GET] Lấy chi tiết một Thiết bị
 * @param id Mã định danh của thiết bị
 */
app.get('/devices/:id', async (req, res) => {
  /* #swagger.tags = ['Devices'] */
  const d = await prisma.devices.findUnique({
    where: { id: req.params.id }
  });
  if (!d) return res.status(404).json({ error: 'Không tìm thấy' });
  res.json(formatDevice(d));
});

app.get('/devices/:id/credentials', async (req, res) => {
  /* #swagger.tags = ['Devices'] */
  const credential = await prisma.device_credentials.findUnique({
    where: { device_id: req.params.id },
    select: { credentials_type: true, credentials_id: true, credentials_value: true }
  });
  if (!credential) return res.status(404).json({ error: 'Thiết bị chưa có credential.' });
  res.json({
    credentialsType: credential.credentials_type,
    deviceKey: credential.credentials_id,
    secret: credential.credentials_value || ''
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
  /* #swagger.tags = ['Devices'] */
  const { name, type, label, description, gateway, isGateway, overwriteActivityTime } = req.body;
  const tenantId = await getDefaultTenant();
  const gatewayFlag = gateway !== undefined ? !!gateway : !!isGateway;
  
  // Tạo Thiết bị và đồng thời chèn Mã Token vào bảng device_credentials (Nối bảng)
  const d = await prisma.devices.create({
    data: {
      name,
      type: type || 'default',
      tenant_id: tenantId,
      additional_info: {
        status: 'offline',
        gateway: gatewayFlag,
        overwriteActivityTime: !!overwriteActivityTime,
        label: label || '',
        description: description || ''
      },
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
  
  const payload = formatDevice(d);
  publishLiveEvent('devices', 'created', payload);
  res.status(201).json(payload);
});

/**
 * [PATCH] Cập nhật thông tin Thiết bị
 * @param id Mã định danh thiết bị
 * @description Chuẩn ThingsBoard: Admin chỉ được cập nhật metadata (name, type, gateway).
 * Trạng thái kết nối (status, lastConnectTime...) là Server Attribute do MQTT layer quản lý,
 * KHÔNG được phép ghi đè từ REST API. Hàm này merge additional_info thay vì overwrite.
 */
app.patch('/devices/:id', async (req, res) => {
  /* #swagger.tags = ['Devices'] */
  const { name, type, label, description, gateway, isGateway, overwriteActivityTime } = req.body;
  const gatewayValue = gateway !== undefined ? gateway : isGateway;
  // Lưu ý: KHÔNG cho phép REST API ghi đè 'status' - trạng thái do MQTT/SYS quản lý

  // Đọc additional_info hiện tại để MERGE (không overwrite trạng thái kết nối)
  const current = await prisma.devices.findUnique({
    where: { id: req.params.id },
    select: { additional_info: true }
  });
  const currentInfo = (current?.additional_info as any) || {};
  const { isGateway: _legacyGateway, ...canonicalInfo } = currentInfo;

  const d = await prisma.devices.update({
    where: { id: req.params.id },
    data: { 
      name, 
      type,
      // Merge: Giữ nguyên status/lastConnectTime/... chỉ ghi đè gateway nếu được gửi lên
      additional_info: {
        ...canonicalInfo, // Bảo tồn trạng thái cũ, đồng thời loại cờ isGateway legacy.
        ...(gatewayValue !== undefined ? { gateway: !!gatewayValue } : {}),
        ...(overwriteActivityTime !== undefined ? { overwriteActivityTime: !!overwriteActivityTime } : {}),
        ...(label !== undefined ? { label } : {}),
        ...(description !== undefined ? { description } : {})
      }
    },
    include: { device_credentials: true }
  });
  
  const payload = formatDevice(d);
  if (d.device_credentials?.credentials_id) {
    await invalidateDeviceCredential(d.device_credentials.credentials_id);
  }
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
  /* #swagger.tags = ['Devices'] */
  const deviceId = req.params.id;
  const credential = await prisma.device_credentials.findUnique({
    where: { device_id: deviceId }, select: { credentials_id: true }
  });

  // 1. Quét dọn rác: Xóa toàn bộ dữ liệu đo lường (telemetry) của thiết bị này trước
  await prisma.telemetry_kv.deleteMany({
    where: { entity_id: deviceId }
  });

  await prisma.attribute_kv.deleteMany({
    where: { entity_id: deviceId, entity_type: 'DEVICE' }
  });

  await prisma.relation.deleteMany({
    where: { OR: [{ from_id: deviceId }, { to_id: deviceId }] }
  });

  // 2. Sau khi đã sạch rác, tiến hành xóa thiết bị
  await prisma.devices.delete({
    where: { id: deviceId }
  });
  if (credential?.credentials_id) {
    await invalidateDeviceCredential(credential.credentials_id);
  }
  
  publishLiveEvent('devices', 'deleted', { id: deviceId });
  res.json({ success: true });
});

// ==========================================
// NHÓM API QUẢN LÝ DỮ LIỆU ĐO LƯỜNG (TELEMETRY)
// ==========================================

// ==========================================
// NHÓM API QUẢN LÝ THUỘC TÍNH (ATTRIBUTES)
// ==========================================

/**
 * [GET] Lấy danh sách Attributes của thiết bị
 */
// -----------------------------------------------------------------------------------------------------
// Server-side RPC API
// -----------------------------------------------------------------------------------------------------

/**
 * Gửi Server-side RPC (Two-way) tới thiết bị (trực tiếp hoặc thông qua Gateway)
 */
app.post('/devices/:id/rpc', async (req, res) => {
  /* #swagger.tags = ['Devices']
     #swagger.summary = 'Send RPC command to device'
     #swagger.parameters['id'] = { description: 'Device ID', required: true }
     #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               method: { type: "string" },
               params: { type: "object" }
             }
           }
         }
       }
     }
  */
  const { id } = req.params;
  const { method, params } = req.body;
  if (!method) return res.status(400).send('Missing method in body');

  try {
    const device = await prisma.devices.findUnique({ where: { id } });
    if (!device) return res.status(404).send('Device not found');

    const credential = await prisma.device_credentials.findUnique({
      where: { device_id: id }
    });
    if (!credential) return res.status(404).send('Credential not found');

    const additionalInfo = (device.additional_info as Record<string, any>) || {};
    const isGatewaySubDevice = !!additionalInfo.provisionedByGatewayId;
    
    // Generate a random RPC request ID between 1 and 2147483647
    const rpcId = Math.floor(Math.random() * 2147483647) + 1;

    // Use publishRpc function
    const { publishRpc } = await import('./mqtt/mqttClient');
    if (isGatewaySubDevice) {
      publishRpc(credential.credentials_id, true, device.name, method, params || {}, rpcId);
    } else {
      publishRpc(credential.credentials_id, false, device.name, method, params || {}, rpcId);
    }

    res.status(200).json({ success: true, rpcId });
  } catch (error) {
    console.error('Error sending RPC:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/devices/:id/attributes', async (req, res) => {
  /* #swagger.tags = ['Attributes'] */
  try {
    const scope = req.query.scope as string;
    
    // Fallback: If deviceId is provided, look it up first
    const creds = await prisma.device_credentials.findFirst({
      where: { device_id: req.params.id }
    });

    const whereClause: any = { entity_id: req.params.id };
    if (scope) {
      whereClause.attribute_type = scope;
    }
    
    const attributes = await prisma.$queryRawUnsafe<any[]>(
      `SELECT attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts, attribute_type 
       FROM attribute_kv WHERE entity_id = $1::uuid ${scope ? 'AND attribute_type = $2' : ''} 
       ORDER BY last_update_ts DESC`,
      req.params.id,
      ...(scope ? [scope] : [])
    );

    const formatted = attributes.map(a => ({
      key: a.attribute_key,
      value: a.dbl_v !== null ? a.dbl_v : (a.long_v !== null ? Number(a.long_v) : (a.bool_v !== null ? a.bool_v : (a.json_v !== null ? a.json_v : a.str_v))),
      lastUpdateTs: Number(a.last_update_ts),
      scope: a.attribute_type
    }));
    res.json(formatted);
  } catch (err) {
    console.error('[API] Error fetching attributes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * [POST] Cập nhật / Thêm mới Attributes (Server/Shared)
 */
app.post('/devices/:id/attributes/:scope', async (req, res) => {
  /* #swagger.tags = ['Attributes'] */
  try {
    const { id, scope } = req.params;
    if (scope !== 'SERVER_SCOPE' && scope !== 'SHARED_SCOPE') {
      return res.status(400).json({ error: 'Chỉ được phép sửa SERVER_SCOPE hoặc SHARED_SCOPE' });
    }
    const payload = req.body;
    const ts = new Date().getTime();
    for (const [key, value] of Object.entries(payload)) {
      const bool_v = typeof value === 'boolean' ? value : null;
      const str_v = typeof value === 'string' ? value : null;
      const long_v = typeof value === 'number' && Number.isInteger(value) ? value : null;
      const dbl_v = typeof value === 'number' && !Number.isInteger(value) ? value : null;
      const json_v = typeof value === 'object' && value !== null ? JSON.stringify(value) : null;
      
      await prisma.$executeRaw`
        INSERT INTO attribute_kv (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
        VALUES ('DEVICE', ${id}::uuid, ${scope}, ${key}, ${bool_v}, ${str_v}, ${long_v}, ${dbl_v}, ${json_v}::json, ${ts})
        ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key) 
        DO UPDATE SET bool_v = EXCLUDED.bool_v, str_v = EXCLUDED.str_v, long_v = EXCLUDED.long_v, dbl_v = EXCLUDED.dbl_v, json_v = EXCLUDED.json_v, last_update_ts = EXCLUDED.last_update_ts;
      `;
    }
    
    // Nếu là SHARED_SCOPE, publish MQTT xuống thiết bị
    if (scope === 'SHARED_SCOPE') {
      const creds = await prisma.device_credentials.findFirst({ where: { device_id: id } });
      if (creds?.credentials_id) {
        publishSharedAttributes(creds.credentials_id, payload);
      }
    }
    
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[API] Error saving attributes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * [DELETE] Xoá Attributes
 */
app.delete('/devices/:id/attributes/:scope', async (req, res) => {
  /* #swagger.tags = ['Attributes'] */
  try {
    const { id, scope } = req.params;
    const keys = (req.query.keys as string || '').split(',');
    if (keys.length === 0 || !keys[0]) {
      return res.status(400).json({ error: 'Thiếu keys' });
    }
    
    // Prisma queryRaw for DELETE
    const placeholders = keys.map((_, i) => '$' + (i + 3)).join(',');
    await prisma.$executeRawUnsafe(
      `DELETE FROM attribute_kv WHERE entity_id = $1::uuid AND attribute_type = $2 AND attribute_key IN (${placeholders})`,
      id,
      scope,
      ...keys
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[API] Error deleting attributes:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/**
 * [GET] Lấy Dữ liệu Đo lường Mới Nhất
 * @param id Mã định danh thiết bị
 * @description (TỐI ƯU HÓA BỞI REDIS) - Đọc thẳng từ RAM tốc độ 0ms thay vì quét ổ cứng Database
 */
app.get('/devices/:id/telemetry', async (req, res) => {
  /* #swagger.tags = ['Telemetry'] */
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
  /* #swagger.tags = ['Telemetry'] */
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
// RELATION API
// ==========================================

// GET /relations?from_id=... hoặc ?to_id=...
app.get('/relations', async (req: any, res: any) => {
  try {
    const { from_id, to_id } = req.query;
    
    const filters: any = {};
    if (from_id) filters.from_id = from_id;
    if (to_id) filters.to_id = to_id;

    if (!from_id && !to_id) {
      return res.status(400).json({ error: 'Missing from_id or to_id query parameter' });
    }

    const relations = await prisma.relation.findMany({
      where: filters
    });

    // Cần lấy TÊN của entity đối diện (để UI dễ hiển thị)
    // Giả sử chỉ join với devices và dashboards
    const enriched = await Promise.all(relations.map(async (r) => {
      let toEntityName = r.to_id;
      if (r.to_type === 'DEVICE') {
        const d = await prisma.devices.findUnique({ where: { id: r.to_id } });
        if (d) toEntityName = d.name;
      } else if (r.to_type === 'DASHBOARD') {
        const d = await prisma.dashboards.findUnique({ where: { id: r.to_id } });
        if (d) toEntityName = d.title;
      }

      let fromEntityName = r.from_id;
      if (r.from_type === 'DEVICE') {
        const d = await prisma.devices.findUnique({ where: { id: r.from_id } });
        if (d) fromEntityName = d.name;
      } else if (r.from_type === 'DASHBOARD') {
        const d = await prisma.dashboards.findUnique({ where: { id: r.from_id } });
        if (d) fromEntityName = d.title;
      }

      return {
        ...r,
        to_entity_name: toEntityName,
        from_entity_name: fromEntityName,
        id: `${r.from_id}_${r.to_id}_${r.relation_type}` // Fake ID for Refine UI
      };
    }));

    // Hỗ trợ Refine Header
    res.setHeader('x-total-count', enriched.length.toString());
    res.setHeader('Access-Control-Expose-Headers', 'x-total-count');
    res.json(enriched);
  } catch (err: any) {
    console.error('[API] Error fetching relations:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /relations
app.post('/relations', async (req: any, res: any) => {
  try {
    const { from_id, from_type, to_id, to_type, relation_type } = req.body;
    
    if (!from_id || !to_id || !relation_type) {
      return res.status(400).json({ error: 'Missing required relation fields' });
    }

    const rel = await prisma.relation.create({
      data: {
        from_id,
        from_type: from_type || 'DEVICE',
        to_id,
        to_type: to_type || 'DEVICE',
        relation_type,
        relation_type_group: 'COMMON'
      }
    });

    res.status(201).json(rel);
  } catch (err: any) {
    console.error('[API] Error creating relation:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// DELETE /relations
app.delete('/relations/:id', async (req: any, res: any) => {
  try {
    // ID từ Refine gửi lên là fake ID: fromId_toId_relationType
    // Hoặc query params ?from_id=...&to_id=...&relation_type=...
    const idParam = req.params.id;
    let from_id, to_id, relation_type;

    if (idParam.includes('_')) {
      const parts = idParam.split('_');
      from_id = parts[0];
      to_id = parts[1];
      relation_type = parts.slice(2).join('_');
    } else {
       from_id = req.query.from_id;
       to_id = req.query.to_id;
       relation_type = req.query.relation_type;
    }

    if (!from_id || !to_id || !relation_type) {
      return res.status(400).json({ error: 'Missing primary keys for relation' });
    }

    await prisma.relation.delete({
      where: {
        from_id_from_type_relation_type_group_relation_type_to_id_to_type: {
          from_id,
          to_id,
          relation_type,
          from_type: 'DEVICE',
          to_type: 'DEVICE',
          relation_type_group: 'COMMON'
        }
      }
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error('[API] Error deleting relation:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// ==========================================
// KHỞI ĐỘNG CÁC DỊCH VỤ NỀN (BACKGROUND SERVICES)
// ==========================================

// Bật MQTT Client: Lắng nghe liên tục kết nối từ EMQX Broker
startMqttClient();

// Bật Telemetry Worker: Định kỳ hốt dữ liệu từ Redis nạp vào DB mỗi giây
startTelemetryWorker();

// Bat Inactivity Worker: Phat hien thiet bi mat mang dot ngot (khong gui DISCONNECT)
// Ref: ThingsBoard TransportActivityManager.hasExpired()
startInactivityWorker();

// Tao partition thang tiep theo va ap dung retention neu duoc bat.
startTelemetryRetentionWorker();

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

// Trigger reload
