const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Checking device credentials...");
  const creds = await prisma.device_credentials.findMany();
  console.log(creds);

  console.log("\nChecking telemetry...");
  const telemetries = await prisma.telemetry_kv.findMany({
    orderBy: { ts: 'desc' },
    take: 5
  });
  console.log(telemetries);

  await prisma.$disconnect();
}
main();
