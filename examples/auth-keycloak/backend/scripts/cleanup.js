require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  const devices = await prisma.devices.findMany();
  const ids = devices.map(d => d.id);
  const deleted = await prisma.telemetry_kv.deleteMany({
    where: { entity_id: { notIn: ids } }
  });
  console.log('Deleted orphaned records:', deleted.count);
  await prisma.$disconnect();
}

run().catch(console.error);
