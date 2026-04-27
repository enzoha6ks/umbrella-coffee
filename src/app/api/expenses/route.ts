import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(expenses)
}

export async function POST(req: Request) {
  const body = await req.json()
  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      category: body.category,
      amount: Number(body.amount),
      note: body.note || null,
    },
  })

  return NextResponse.json(expense, { status: 201 })
}
