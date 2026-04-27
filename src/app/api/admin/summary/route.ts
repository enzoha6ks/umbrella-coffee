import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const [orders, stock, expenses, menuItems] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
      take: 12,
    }),
    prisma.stockItem.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    }),
    prisma.expense.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12,
    }),
    prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const salesTotal = orders.reduce((sum: number, order: { total: number }) => sum + order.total, 0)
  const expensesTotal = expenses.reduce((sum: number, expense: { amount: number }) => sum + expense.amount, 0)
  const lowStock = stock.filter((item: { quantity: number; lowAt: number }) => item.quantity <= item.lowAt)

  return NextResponse.json({
    orders,
    stock,
    expenses,
    menuItems,
    lowStock,
    totals: {
      sales: salesTotal,
      expenses: expensesTotal,
      net: salesTotal - expensesTotal,
      orders: orders.length,
    },
  })
}
