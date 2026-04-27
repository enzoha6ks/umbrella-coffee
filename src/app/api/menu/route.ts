import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const items = await prisma.menuItem.findMany({
    where: {
      available: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.menuItem.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}