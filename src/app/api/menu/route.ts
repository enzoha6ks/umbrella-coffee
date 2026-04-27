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
  const item = await prisma.menuItem.create({
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image || null,
      emoji: body.emoji || null,
      available: body.available ?? true,
    },
  })
  return NextResponse.json(item, { status: 201 })
}
