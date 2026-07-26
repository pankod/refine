import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import crypto from 'crypto';
import { startMqttClient } from './mqtt/mqttClient';
import { startTelemetryWorker } from './workers/telemetryWorker';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Tích hợp Keycloak JWT Middleware
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://auth.greeniq.vn/realms/master/protocol/openid-connect/certs'
  }) as GetVerificationKey,
  issuer: 'https://auth.greeniq.vn/realms/master',
  algorithms: ['RS256']
}).unless({
  // Bỏ qua JWT cho các đường dẫn nào (nếu cần)
  path: ['/']
});

// Áp dụng JWT cho toàn bộ API
app.use(checkJwt);

// Bắt lỗi khi Token không hợp lệ
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Token đăng nhập không hợp lệ hoặc đã hết hạn.' });
  } else {
    next(err);
  }
});

const generateSecureToken = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.randomFillSync(randomArray);
  for (let i = 0; i < length; i++) {
    result += chars[randomArray[i] % chars.length];
  }
  return result;
};

// Hàm tự động cấp mã Công ty (Tenant)
// Do cấu trúc DB chuẩn yêu cầu Thiết bị phải thuộc về 1 Công ty nào đó
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
app.get('/dashboards', async (req, res) => {
  const dashboards = await prisma.dashboards.findMany({
    orderBy: { created_at: 'desc' }
  });
  const formatted = dashboards.map(d => ({
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  }));
  res.json(formatted);
});

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
  res.status(201).json({
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  });
});

app.patch('/dashboards/:id', async (req, res) => {
  const { title, description } = req.body;
  const d = await prisma.dashboards.update({
    where: { id: req.params.id },
    data: { 
      title, 
      configuration: { description: description || '' }
    }
  });
  res.json({
    id: d.id,
    title: d.title,
    description: (d.configuration as any)?.description || '',
    createdAt: d.created_at
  });
});

app.delete('/dashboards/:id', async (req, res) => {
  await prisma.dashboards.delete({
    where: { id: req.params.id }
  });
  res.json({ success: true });
});

// ==========================================
// NHÓM API QUẢN LÝ THIẾT BỊ (DEVICES)
// ==========================================
app.get('/devices', async (req, res) => {
  const devices = await prisma.devices.findMany({
    include: { device_credentials: true }, // Nối bảng để lấy Mật khẩu (Secret)
    orderBy: { created_at: 'desc' }
  });
  
  // Format lại JSON để Giao diện Frontend Refine dễ hiểu
  const formatted = devices.map(d => ({
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  }));
  res.json(formatted);
});

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
          credentials_id: generateSecureToken(20),
          credentials_value: generateSecureToken(32)
        }
      }
    },
    include: { device_credentials: true }
  });
  
  res.status(201).json({
    id: d.id,
    name: d.name,
    type: d.type,
    status: (d.additional_info as any)?.status || 'offline',
    device_key: d.device_credentials?.credentials_id || '',
    secret: d.device_credentials?.credentials_value || '',
    created_at: d.created_at
  });
});

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

app.delete('/devices/:id', async (req, res) => {
  await prisma.devices.delete({
    where: { id: req.params.id }
  });
  res.json({ success: true });
});

// ==========================================
// NHÓM API QUẢN LÝ DỮ LIỆU ĐO LƯỜNG (TELEMETRY)
// ==========================================
app.get('/devices/:id/telemetry', async (req, res) => {
  try {
    console.log(`[API] Fetching telemetry for device: ${req.params.id}`);
    // Lấy dữ liệu từ bảng TimescaleDB (telemetry_kv)
    const telemetries = await prisma.telemetry_kv.findMany({
      where: { entity_id: req.params.id },
      orderBy: { ts: 'desc' },
      take: 50 // Giới hạn 50 điểm
    });
    
    console.log(`[API] Found ${telemetries.length} telemetry records for device ${req.params.id}`);

    // Lọc lấy giá trị mới nhất cho mỗi key
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
    const finalData = Array.from(latestByKey.values());
    console.log(`[API] Returning telemetry data:`, JSON.stringify(finalData));
    res.json(finalData);
  } catch (err) {
    console.error('[API] Error fetching telemetry:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API lấy Lịch sử Đo lường cho Biểu đồ
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
      ts: t.ts
    }));

    res.json(historyData);
  } catch (err: any) {
    console.error('[API] Error fetching telemetry history:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Chạy MQTT Client (Nhận dữ liệu) và Telemetry Worker (Batch Insert)
startMqttClient();
startTelemetryWorker();

app.use((err: any, req: any, res: any, next: any) => { 
  console.error('EXPRESS ERROR 500:', err); 
  res.status(500).json({ error: err.message, stack: err.stack, name: err.name }); 
});

// Bắt đầu Server
app.listen(port, () => {
  console.log(`🚀 Backend API đã chạy thành công trên địa chỉ: http://localhost:${port}`);
});
