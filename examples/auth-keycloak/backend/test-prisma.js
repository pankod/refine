const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: 'postgresql://iot_user:iBT5nKTtzZAKVEm1ZsPnjSvC0Z0jZU33Msb1Daz0Rbdxgqmtmwn5zERTtYJdFXl5@localhost:5432/iot_db?schema=public&sslmode=disable' });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const d = await prisma.dashboards.findMany();
    console.log("Success! Data:", d);
  } catch (e) {
    console.error("Prisma error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
