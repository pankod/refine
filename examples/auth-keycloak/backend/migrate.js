const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query("CREATE TABLE IF NOT EXISTS attribute_kv (entity_type VARCHAR(32) DEFAULT 'DEVICE', entity_id UUID, attribute_type VARCHAR(255), attribute_key VARCHAR(255), bool_v BOOLEAN, str_v TEXT, long_v BIGINT, dbl_v DOUBLE PRECISION, json_v JSON, last_update_ts BIGINT, PRIMARY KEY (entity_type, entity_id, attribute_type, attribute_key));")
  .then(() => { console.log('Created'); process.exit(0); })
  .catch(e => { console.error(e); process.exit(1); });
