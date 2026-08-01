import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { acquireDistributedLock, ReleaseLock } from '../redis/distributedLock';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const RETENTION_DAYS = Math.max(0, parseInt(process.env.TELEMETRY_RETENTION_DAYS || '0', 10));
const INTERVAL_MS = Math.max(60_000, parseInt(process.env.TELEMETRY_RETENTION_INTERVAL_MS || '21600000', 10));
const DELETE_BATCH = Math.max(1_000, parseInt(process.env.TELEMETRY_RETENTION_DELETE_BATCH || '50000', 10));

const monthStart = (date: Date): Date => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
const addMonths = (date: Date, months: number): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));

const ensurePartitions = async (): Promise<boolean> => {
  const rows = await prisma.$queryRaw<{ partitioned: boolean }[]>`
    SELECT EXISTS (
      SELECT 1 FROM pg_partitioned_table p
      JOIN pg_class c ON c.oid = p.partrelid
      WHERE c.relname = 'telemetry_kv'
    ) AS partitioned
  `;
  if (!rows[0]?.partitioned) return false;

  const start = monthStart(new Date());
  for (let offset = 0; offset <= 2; offset += 1) {
    const from = addMonths(start, offset);
    const to = addMonths(start, offset + 1);
    const suffix = `${from.getUTCFullYear()}_${String(from.getUTCMonth() + 1).padStart(2, '0')}`;
    // Ten bang va moc thoi gian deu duoc sinh noi bo tu UTC month, khong nhan
    // input cua nguoi dung. PostgreSQL utility statement khong nhan bind param.
    await prisma.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS telemetry_kv_${suffix} PARTITION OF telemetry_kv ` +
      `FOR VALUES FROM ('${from.toISOString()}') TO ('${to.toISOString()}')`
    );
  }
  return true;
};

const cleanupExpired = async (): Promise<number> => {
  if (!RETENTION_DAYS) return 0;
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  return prisma.$executeRaw`
    DELETE FROM telemetry_kv
    WHERE (ts, entity_id, key) IN (
      SELECT ts, entity_id, key FROM telemetry_kv
      WHERE ts < ${cutoff}
      ORDER BY ts
      LIMIT ${DELETE_BATCH}
    )
  `;
};

export const startTelemetryRetentionWorker = (): void => {
  let running = false;
  let partitionWarningLogged = false;
  const run = async () => {
    if (running) return;
    running = true;
    let releaseLock: ReleaseLock | null = null;
    try {
      releaseLock = await acquireDistributedLock('telemetry-retention-worker', Math.max(1_800_000, INTERVAL_MS));
      if (!releaseLock) return;
      const partitioned = await ensurePartitions();
      if (!partitioned && !partitionWarningLogged) {
        console.warn('[TelemetryRetention] telemetry_kv chua partitioned; chay migration trong maintenance window.');
        partitionWarningLogged = true;
      }
      const deleted = await cleanupExpired();
      if (deleted) console.log(`[TelemetryRetention] deleted ${deleted} expired rows`);
    } catch (error) {
      console.error('[TelemetryRetention] Error:', error);
    } finally {
      if (releaseLock) await releaseLock().catch(error => console.error('[TelemetryRetention] Release lock error:', error));
      running = false;
    }
  };
  void run();
  setInterval(run, INTERVAL_MS);
};
