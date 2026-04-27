import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const stock = await prisma.stockItem.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  })

  return NextResponse.json(stock)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.stockItem.create({
    data: {
      name: body.name,
      category: body.category,
      quantity: Number(body.quantity),
      unit: body.unit,
      lowAt: Number(body.lowAt ?? 0),
    },
  })

  return NextResponse.json(item, { status: 201 })
}
