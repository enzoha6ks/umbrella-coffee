import path from 'node:path'
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

const DATABASE_URL = process.env.DATABASE_URL!
const DIRECT_URL = process.env.DIRECT_URL!

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: DIRECT_URL,
  },
  studio: {
    async adapter() {
      const { neonConfig, Pool } = await import('@neondatabase/serverless')
      const { PrismaNeon } = await import('@prisma/adapter-neon')
      const ws = await import('ws')
      neonConfig.webSocketConstructor = ws.default
      const pool = new Pool({ connectionString: DIRECT_URL })
      return new PrismaNeon(pool)
    },
  },
  migrate: {
    async adapter() {
      const { neonConfig, Pool } = await import('@neondatabase/serverless')
      const { PrismaNeon } = await import('@prisma/adapter-neon')
      const ws = await import('ws')
      neonConfig.webSocketConstructor = ws.default
      const pool = new Pool({ connectionString: DIRECT_URL })
      return new PrismaNeon(pool)
    },
  },
})