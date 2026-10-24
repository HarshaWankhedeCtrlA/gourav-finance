import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create the adapter using your DATABASE_URL from the .env file
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma