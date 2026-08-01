-- Chay trong maintenance window sau khi da backup va dung telemetry workers.
-- Script doi telemetry_kv thanh bang partition theo thang, giu lai bang cu
-- telemetry_kv_unpartitioned_backup de rollback thu cong neu can.
BEGIN;
SET LOCAL TIME ZONE 'UTC';

LOCK TABLE telemetry_kv IN ACCESS EXCLUSIVE MODE;
ALTER TABLE telemetry_kv RENAME TO telemetry_kv_unpartitioned_backup;

CREATE TABLE telemetry_kv (
  ts timestamptz NOT NULL,
  entity_id uuid NOT NULL,
  entity_type varchar(32) NOT NULL DEFAULT 'DEVICE',
  key varchar(255) NOT NULL,
  bool_v boolean,
  str_v text,
  long_v bigint,
  dbl_v double precision,
  json_v jsonb,
  PRIMARY KEY (ts, entity_id, key)
) PARTITION BY RANGE (ts);

-- Tao partition cho toan bo du lieu lich su va them hai thang du phong.
DO $$
DECLARE
  month_cursor date;
  last_month date;
BEGIN
  SELECT date_trunc('month', COALESCE(min(ts), now()))::date,
         (date_trunc('month', COALESCE(max(ts), now())) + interval '2 months')::date
    INTO month_cursor, last_month
  FROM telemetry_kv_unpartitioned_backup;
  WHILE month_cursor <= last_month LOOP
    EXECUTE format(
      'CREATE TABLE telemetry_kv_%s PARTITION OF telemetry_kv FOR VALUES FROM (%L) TO (%L)',
      to_char(month_cursor, 'YYYY_MM'),
      month_cursor::timestamptz,
      (month_cursor + interval '1 month')::timestamptz
    );
    month_cursor := (month_cursor + interval '1 month')::date;
  END LOOP;
END $$;

-- Default partition bao dam ingestion khong loi neu partition manager chua
-- tao kip partition thang tiep theo.
CREATE TABLE telemetry_kv_default PARTITION OF telemetry_kv DEFAULT;
CREATE INDEX telemetry_kv_entity_key_ts_idx ON telemetry_kv (entity_id, key, ts DESC);

INSERT INTO telemetry_kv
  (ts, entity_id, entity_type, key, bool_v, str_v, long_v, dbl_v, json_v)
SELECT ts, entity_id, entity_type, key, bool_v, str_v, long_v, dbl_v, json_v
FROM telemetry_kv_unpartitioned_backup;

-- Worker ung dung can quyen tao partition thang tiep theo. Chi chuyen owner
-- cho cay telemetry moi; bang backup van thuoc postgres de tranh xoa nham.
ALTER TABLE telemetry_kv OWNER TO iot_user;
DO $$
DECLARE
  partition_table regclass;
BEGIN
  FOR partition_table IN
    SELECT inhrelid::regclass
    FROM pg_inherits
    WHERE inhparent = 'telemetry_kv'::regclass
  LOOP
    EXECUTE format('ALTER TABLE %s OWNER TO iot_user', partition_table);
  END LOOP;
END $$;
GRANT ALL PRIVILEGES ON TABLE telemetry_kv TO iot_user;

COMMIT;

-- Sau khi kiem tra row count, API va backup thanh cong, DBA moi duoc phep xoa:
-- DROP TABLE telemetry_kv_unpartitioned_backup;
