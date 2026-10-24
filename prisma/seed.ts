import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'; // Ensures .env is loaded

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Create the Super Admin User
  const adminEmail = 'admin@gouravfinance.com';
  // Using bcrypt to hash the password 'Admin@123'
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { 
      passwordHash // Updates the password if the user already exists
    },
    create: {
      email: adminEmail,
      passwordHash: passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✅ Created Admin User: ${admin.email}`);

  // 2. Seed the EMI Settings for Business Loan
  await prisma.emiSetting.upsert({
    where: { productType: 'business' },
    update: {},
    create: {
      productType: 'business',
      minAmount: 500000,
      maxAmount: 5000000,
      defaultAmount: 1500000,
      amountStep: 10000,
      minRate: 12,
      maxRate: 30,
      defaultRate: 21,
      rateStep: 0.25,
      minTenureMonths: 12,
      maxTenureMonths: 120,
      defaultTenureMonths: 84,
    },
  });

  // 3. Seed the EMI Settings for Housing Loan
  await prisma.emiSetting.upsert({
    where: { productType: 'housing' },
    update: {},
    create: {
      productType: 'housing',
      minAmount: 1000000,
      maxAmount: 10000000,
      defaultAmount: 3000000,
      amountStep: 10000,
      minRate: 8.5,
      maxRate: 15,
      defaultRate: 10,
      rateStep: 0.25,
      minTenureMonths: 60,
      maxTenureMonths: 240,
      defaultTenureMonths: 180,
    },
  });
  
  console.log(`✅ Seeded EMI settings for Business and Housing`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });