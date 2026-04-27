import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type OrderItemInput = {
  name: string
  image: string
  category: string
  size: string
  sweet?: string
  price: number
}

type OrderInput = {
  paymentMethod: string
  items: OrderItemInput[]
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })

  return NextResponse.json(orders)
}

export async function POST(req: Request) {
  const body = await req.json() as OrderInput
  const items = body.items ?? []
  const total = items.reduce((sum, item) => sum + item.price, 0)

  const order = await prisma.order.create({
    data: {
      paymentMethod: body.paymentMethod,
      total,
      items: {
        create: items.map(item => ({
          name: item.name,
          image: item.image,
          category: item.category,
          size: item.size,
          sweet: item.sweet,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  })

  return NextResponse.json(order, { status: 201 })
}
