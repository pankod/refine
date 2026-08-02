import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { redis } from '../redis/redisClient';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const CACHE_TTL_SECONDS = Math.max(30, parseInt(process.env.DEVICE_CREDENTIAL_CACHE_TTL_SECONDS || '300', 10));

export interface CachedDeviceCredential {
  deviceId: string;
  tenantId: string;
  deviceKey: string;
  secret: string | null;
  gateway: boolean;
}

const cacheKey = (deviceKey: string) => `credential_device:${deviceKey}`;

export const getDeviceByCredential = async (deviceKey: string): Promise<CachedDeviceCredential | null> => {
  const cached = await redis.get(cacheKey(deviceKey));
  if (cached) return JSON.parse(cached) as CachedDeviceCredential;

  const credential = await prisma.device_credentials.findUnique({
    where: { credentials_id: deviceKey },
    include: { device: { select: { id: true, tenant_id: true, additional_info: true } } }
  });
  if (!credential) return null;
  const info = (credential.device.additional_info as Record<string, unknown>) || {};
  const result: CachedDeviceCredential = {
    deviceId: credential.device.id,
    tenantId: credential.device.tenant_id,
    deviceKey: credential.credentials_id,
    secret: credential.credentials_value,
    gateway: Boolean(info.gateway ?? info.isGateway ?? false)
  };
  await redis.set(cacheKey(deviceKey), JSON.stringify(result), 'EX', CACHE_TTL_SECONDS);
  return result;
};

export const invalidateDeviceCredential = async (deviceKey: string): Promise<void> => {
  await redis.del(cacheKey(deviceKey));
};
