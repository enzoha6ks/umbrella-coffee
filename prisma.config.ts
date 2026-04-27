import path from 'node:path'
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

const DIRECT_URL = process.env.DIRECT_URL!

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: DIRECT_URL,
  },
})
