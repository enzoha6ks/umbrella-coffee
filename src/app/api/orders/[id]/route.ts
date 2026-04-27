import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const ALLOWED_STATUSES = new Set(['new', 'preparing', 'done', 'canceled'])

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await req.json() as { status?: string }
  const status = body.status ?? ''

  if (!ALLOWED_STATUSES.has(status)) {
    return NextResponse.json({ error: 'Invalid order status' }, { status: 400 })
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true },
  })

  return NextResponse.json(order)
}
