import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { publishLiveEvent } from '../mqtt/mqttClient';

const pool    = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma  = new PrismaClient({ adapter });

/**
 * ============================================================================
 * WORKER: INACTIVITY TIMEOUT DETECTOR
 * ============================================================================
 * Chuc nang:
 * - Chay dinh ky moi 60 giay (co the cau hinh qua INACTIVITY_CHECK_INTERVAL_MS).
 * - Quet qua tat ca thiet bi dang "online" trong CSDL.
 * - Kiem tra xem moi thiet bi co con gui du lieu (telemetry) hay khong
 *   bang cach doc gia tri "lastActivityTime" trong bang attribute_kv.
 * - Neu mot thiet bi khong gui du lieu qua nguong INACTIVITY_TIMEOUT_MS,
 *   no se bi chuyen trang thai sang "offline" va ban tin Live Event len UI.
 *
 * TAI SAO CAN WORKER NAY?
 * Khi thiet bi mat dien dot ngot hoac mat mang ma khong gui goi TCP FIN/RST,
 * EMQX se khong bao cao su kien DISCONNECT ngay lap tuc. Chi sau khi TCP keepalive
 * het han (co the mat vai phut), EMQX moi biet. Trong thoi gian do, UI hien thi
 * sai trang thai (thiet bi thuc ra da tat nhung van xanh).
 *
 * Worker nay giai quyet van de nay bang cach kiem tra "lastActivityTime" -
 * dung chinh xac nhu ThingsBoard dung TransportActivityManager.hasExpired().
 * Ref: TransportActivityManager.java:95 - hasExpired(lastRecordedTime)
 *
 * INACTIVITY_TIMEOUT_MS (mac dinh: 600_000ms = 10 phut)
 * Co the cau hinh qua bien moi truong INACTIVITY_TIMEOUT_MS.
 */
const INACTIVITY_TIMEOUT_MS    = parseInt(process.env.INACTIVITY_TIMEOUT_MS || '600000');
const INACTIVITY_CHECK_INTERVAL = parseInt(process.env.INACTIVITY_CHECK_INTERVAL_MS || '60000');

export const startInactivityWorker = () => {
  console.log(`[InactivityWorker] Bat dau. Kiem tra moi ${INACTIVITY_CHECK_INTERVAL / 1000}s, timeout: ${INACTIVITY_TIMEOUT_MS / 1000}s`);

  setInterval(async () => {
    try {
      const now = Date.now();
      const cutoff = now - INACTIVITY_TIMEOUT_MS;

      // 1. Lay danh sach cac thiet bi dang "online" (status online trong additional_info)
      //    De tranh quet toan bo bang, chi kiem tra thiet bi ma he thong biet la dang hoat dong.
      const onlineDevices = await prisma.$queryRaw<{ id: string }[]>`
        SELECT id
        FROM devices
        WHERE (additional_info->>'status') = 'online'
      `;

      if (onlineDevices.length === 0) return;

      // 2. Lay lastActivityTime cua tat ca thiet bi do tu attribute_kv (SERVER_SCOPE)
      //    Tuong duong TB: doc "lastActivityTime" tu Server Attribute cua thiet bi
      const deviceIds = onlineDevices.map(d => d.id);
      const activityRows = await prisma.$queryRaw<{ entity_id: string; long_v: bigint | null }[]>`
        SELECT entity_id, long_v
        FROM attribute_kv
        WHERE entity_type = 'DEVICE'
          AND attribute_type = 'SERVER_SCOPE'
          AND attribute_key = 'lastActivityTime'
          AND entity_id = ANY(${deviceIds}::uuid[])
      `;

      // 3. Xay dung map: deviceId -> lastActivityTime
      const activityMap = new Map<string, number>();
      for (const row of activityRows) {
        if (row.long_v !== null) {
          activityMap.set(row.entity_id, Number(row.long_v));
        }
      }

      // 4. Quet qua tung thiet bi, kiem tra hasExpired()
      //    Ref: TransportActivityManager.hasExpired(): (now - timeout) > lastRecordedTime
      const expiredDeviceIds: string[] = [];
      for (const device of onlineDevices) {
        const lastActivity = activityMap.get(device.id);
        if (lastActivity === undefined || lastActivity < cutoff) {
          // Thiet bi khong co lastActivityTime hoac qua han -> coi la offline
          expiredDeviceIds.push(device.id);
        }
      }

      if (expiredDeviceIds.length === 0) return;

      console.log(`[InactivityWorker] Phat hien ${expiredDeviceIds.length} thiet bi da het hoat dong, chuyen sang offline...`);

      // 5. Cap nhat trang thai offline cho cac thiet bi het han
      for (const deviceId of expiredDeviceIds) {
        // Cap nhat attribute_kv: active = false
        await prisma.$executeRaw`
          INSERT INTO attribute_kv
            (entity_type, entity_id, attribute_type, attribute_key, bool_v, str_v, long_v, dbl_v, json_v, last_update_ts)
          VALUES
            ('DEVICE', ${deviceId}::uuid, 'SERVER_SCOPE', 'active', false, NULL, NULL, NULL, NULL, ${now})
          ON CONFLICT (entity_type, entity_id, attribute_type, attribute_key)
          DO UPDATE SET bool_v = false, last_update_ts = ${now};
        `;

        // Cap nhat backward-compatible: additional_info.status
        const oldDevice = await prisma.devices.findUnique({
          where: { id: deviceId }, select: { additional_info: true }
        });
        const oldInfo = (oldDevice?.additional_info as any) || {};
        await prisma.devices.update({
          where: { id: deviceId },
          data: { additional_info: { ...oldInfo, status: 'offline' } }
        });

        // Ban Live Event de UI cap nhat tuc thi
        publishLiveEvent('devices', 'updated', { id: deviceId, status: 'offline' });
        console.log(`[InactivityWorker] Thiet bi ${deviceId} -> offline (khong hoat dong qua ${INACTIVITY_TIMEOUT_MS / 1000}s)`);
      }

    } catch (err) {
      console.error('[InactivityWorker] Loi:', err);
    }
  }, INACTIVITY_CHECK_INTERVAL);
};
