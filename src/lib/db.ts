import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Read at call time, not module load time
  const url = process.env.DATABASE_URL

  if (!url) {
    throw new Error(
      `DATABASE_URL is undefined. Available env keys: ${Object.keys(process.env).filter(k => k.includes('DATA') || k.includes('URL')).join(', ')}`
    )
  }

  const adapter = new PrismaNeon({ connectionString: url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
