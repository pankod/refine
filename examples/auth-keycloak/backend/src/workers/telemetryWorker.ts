import { redis } from '../redis/redisClient';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const BATCH_SIZE = 1000;
const PROCESS_INTERVAL_MS = 1000;

export const startTelemetryWorker = () => {
  console.log('👷 Telemetry Worker started (Batching 1000 msgs/sec)');

  setInterval(async () => {
    try {
      // Đọc hàng loạt dữ liệu từ Redis (RPOP)
      const messages = [];
      for (let i = 0; i < BATCH_SIZE; i++) {
        const msg = await redis.rpop('telemetry_queue');
        if (!msg) break;
        messages.push(JSON.parse(msg));
      }

      if (messages.length === 0) return;

      console.log(`📦 Worker processing batch of ${messages.length} telemetry records...`);

      // Lấy danh sách thiết bị từ DB để ánh xạ deviceKey sang device_id (tenant_id, id)
      const uniqueKeys = [...new Set(messages.map(m => m.deviceKey))];
      
      const credentials = await prisma.device_credentials.findMany({
        where: { credentials_id: { in: uniqueKeys } },
        select: { device_id: true, credentials_id: true }
      });

      // Tạo bản đồ (map) deviceKey -> device_id
      const keyToDeviceId = credentials.reduce((acc, curr) => {
        acc[curr.credentials_id] = curr.device_id;
        return acc;
      }, {} as Record<string, string>);

      // Lọc các bản tin có thiết bị hợp lệ (có trong DB)
      // Tiếp theo tìm tenant_id và entity_id
      const validMessages = messages.filter(m => keyToDeviceId[m.deviceKey]);

      if (validMessages.length === 0) {
        console.warn('⚠️ No valid devices found in this batch, dropping messages.');
        return;
      }

      const devices = await prisma.devices.findMany({
        where: { id: { in: validMessages.map(m => keyToDeviceId[m.deviceKey]) } },
        select: { id: true, tenant_id: true }
      });

      const deviceToTenant = devices.reduce((acc, curr) => {
        acc[curr.id] = curr.tenant_id;
        return acc;
      }, {} as Record<string, string>);

      // Định dạng lại dữ liệu cho bảng telemetry_kv
      const telemetryData = validMessages.map(m => {
        const deviceId = keyToDeviceId[m.deviceKey];
        const tenantId = deviceToTenant[deviceId];
        return {
          _internal_tenant_id: tenantId, // Chỉ để filter
          entity_id: deviceId,
          key: m.key,
          ts: new Date(m.ts),
          bool_v: m.bool_v,
          str_v: m.str_v,
          long_v: m.long_v,
          dbl_v: m.dbl_v,
        };
      }).filter(t => t._internal_tenant_id).map(t => {
        const { _internal_tenant_id, ...rest } = t;
        return rest;
      });

      if (telemetryData.length === 0) return;

      // Lưu 1 lần duy nhất vào PostgreSQL bằng createMany
      await prisma.telemetry_kv.createMany({
        data: telemetryData,
        skipDuplicates: true
      });

      console.log(`✅ Successfully batch inserted ${telemetryData.length} records to DB!`);

    } catch (err) {
      console.error('❌ Telemetry Worker Error:', err);
    }
  }, PROCESS_INTERVAL_MS);
};
