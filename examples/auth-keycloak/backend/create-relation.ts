import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/iot_db' });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS relation (
        from_id UUID NOT NULL,
        from_type VARCHAR(32) NOT NULL,
        to_id UUID NOT NULL,
        to_type VARCHAR(32) NOT NULL,
        relation_type_group VARCHAR(32) DEFAULT 'COMMON' NOT NULL,
        relation_type VARCHAR(32) NOT NULL,
        additional_info JSONB,
        PRIMARY KEY (from_id, from_type, relation_type_group, relation_type, to_id, to_type)
      );
    `);
    console.log('Created relation table successfully.');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
