import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { publishLiveEvent } from '../mqtt/mqttClient';
import { acquireDistributedLock, ReleaseLock } from '../redis/distributedLock';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const INACTIVITY_TIMEOUT_MS = parseInt(process.env.INACTIVITY_TIMEOUT_MS || '600000', 10);
const INACTIVITY_CHECK_INTERVAL = parseInt(process.env.INACTIVITY_CHECK_INTERVAL_MS || '60000', 10);

/**
 * Bulk inactivity detector. Mot query tim toan bo device het han, sau do hai
 * statement cap nhat attribute/status cho ca batch. Khong con N+1 query khi
 * he thong co hang tram nghin device.
 */
export const startInactivityWorker = (): void => {
  console.log(`[InactivityWorker] check=${INACTIVITY_CHECK_INTERVAL / 1000}s timeout=${INACTIVITY_TIMEOUT_MS / 1000}s`);
  let running = false;

  setInterval(async () => {
    if (running) return;
    running = true;
    let releaseLock: ReleaseLock | null = null;
    try {
      releaseLock = await acquireDistributedLock('inactivity-worker', Math.max(300_000, INACTIVITY_CHECK_INTERVAL * 2));
      if (!releaseLock) return;
      const now = Date.now();
      const cutoff = now - INACTIVITY_TIMEOUT_MS;
      const expired = await prisma.$queryRaw<{ id: string }[]>`
        SELECT d.id
        FROM devices d
        LEFT JOIN attribute_kv activity
          ON activity.entity_type = 'DEVICE'
         AND activity.entity_id = d.id
         AND activity.attribute_type = 'SERVER_SCOPE'
         AND activity.attribute_key = 'lastActivityTime'
        WHERE d.additional_info->>'status' = 'online'
          AND (activity.long_v IS NULL OR activity.long_v < ${cutoff})
      `;
      if (!expired.length) return;

      const ids = expired.map(item => item.id);
      await prisma.$transaction(async tx => {
        await tx.$executeRaw`
          INSERT INTO attribute_kv
            (entity_type, entity_id, attribute_type, attribute_key, bool_v,
             str_v, long_v, dbl_v, json_v, last_update_ts)
          SELECT 'DEVICE', u.id, 'SERVER_SCOPE', 'active', false,
            NULL, NULL, NULL, NULL, ${now}
          FROM unnest(${ids}::uuid[]) AS u(id)
          ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
          DO UPDATE SET bool_v = false, long_v = NULL,
            last_update_ts = EXCLUDED.last_update_ts;
        `;
        await tx.$executeRaw`
          UPDATE devices
          SET additional_info = COALESCE(additional_info, '{}'::jsonb) || '{"status":"offline"}'::jsonb
          WHERE id = ANY(${ids}::uuid[]);
        `;
      });

      for (const id of ids) {
        publishLiveEvent('devices', 'updated', { id, status: 'offline' });
      }
      console.log(`[InactivityWorker] ${ids.length} devices -> offline`);
    } catch (error) {
      console.error('[InactivityWorker] Error:', error);
    } finally {
      if (releaseLock) await releaseLock().catch(error => console.error('[InactivityWorker] Release lock error:', error));
      running = false;
    }
  }, INACTIVITY_CHECK_INTERVAL);
};
