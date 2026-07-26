const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://iot_user:iBT5nKTtzZAKVEm1ZsPnjSvC0Z0jZU33Msb1Daz0Rbdxgqmtmwn5zERTtYJdFXl5@localhost:5432/iot_db?schema=public&sslmode=disable' });
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting:', err);
  } else {
    console.log('Connected! Time:', res.rows[0].now);
  }
  pool.end();
});
