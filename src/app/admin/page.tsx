'use client'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

type Tab = 'dashboard' | 'menu' | 'stock' | 'sales' | 'canceled' | 'expenses'
type OrderItem = { id: string; name: string; image: string; category: string; size: string; sweet: string | null; price: number; quantity: number }
type Order = { id: string; orderNumber: number; paymentMethod: string; status: string; total: number; createdAt: string; items: OrderItem[] }
type StockItem = { id: string; name: string; category: string; quantity: number; unit: string; lowAt: number }
type Expense = { id: string; title: string; category: string; amount: number; note: string | null; createdAt: string }
type MenuItem = { id: string; name: string; description: string; price: number; category: string; image: string | null; available: boolean }
type Summary = {
  orders: Order[]
  stock: StockItem[]
  expenses: Expense[]
  menuItems: MenuItem[]
  lowStock: StockItem[]
  totals: { sales: number; expenses: number; net: number; orders: number }
}

const EMPTY_SUMMARY: Summary = {
  orders: [],
  stock: [],
  expenses: [],
  menuItems: [],
  lowStock: [],
  totals: { sales: 0, expenses: 0, net: 0, orders: 0 },
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [summary, setSummary] = useState<Summary>(EMPTY_SUMMARY)
  const [allowed, setAllowed] = useState(false)

  const refresh = async () => {
    const res = await fetch('/api/admin/summary', { cache: 'no-store' })
    setSummary(await res.json() as Summary)
  }

  useEffect(() => {
    let interval: number | undefined
    const timer = window.setTimeout(() => {
      if (window.localStorage.getItem('umbrella-role') !== 'admin') {
        window.location.assign('/login')
        return
      }
      setAllowed(true)
      refresh()
      interval = window.setInterval(refresh, 15000)
    }, 0)
    return () => {
      window.clearTimeout(timer)
      if (interval) window.clearInterval(interval)
    }
  }, [])

  const maxChartValue = Math.max(summary.totals.sales, summary.totals.expenses, 1)

  const addStock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    await fetch('/api/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
    })
    form.reset()
    await refresh()
  }

  const addExpense = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
    })
    form.reset()
    await refresh()
  }

  const addMenuItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const imageFile = data.get('imageFile')
    let image = ''

    if (imageFile instanceof File && imageFile.size > 0) {
      const uploadData = new FormData()
      uploadData.append('file', imageFile)
      const uploadRes = await fetch('/api/uploads', {
        method: 'POST',
        body: uploadData,
      })
      const uploaded = await uploadRes.json() as { url: string }
      image = uploaded.url
    }

    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        description: data.get('description'),
        category: data.get('category'),
        price: data.get('price'),
        image,
      }),
    })
    form.reset()
    await refresh()
  }

  const recentProducts = useMemo(() => summary.orders.flatMap(order => order.items).slice(0, 8), [summary.orders])
  const activeOrders = summary.orders.filter(order => order.status !== 'canceled')
  const canceledOrders = summary.orders.filter(order => order.status === 'canceled')

  if (!allowed) return null

  return (
    <main className="min-h-screen bg-[#090909] text-[#F5E6C8]">
      <div className="grid min-h-screen lg:grid-cols-[236px_1fr]">
        <aside className="border-b border-[#C9A84C]/20 bg-[#111010] p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="mb-10">
            <div className="mb-3 h-px w-8 bg-[#C9A84C]"/>
            <div style={{fontFamily:'Georgia,serif'}} className="text-2xl text-[#F5E6C8]">Umbrella Staff</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#C9A84C]/70">Live cafe dashboard</div>
          </div>
          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {(['dashboard','menu','stock','sales','canceled','expenses'] as Tab[]).map(item => (
              <button key={item} onClick={() => setTab(item)} className={`cursor-pointer border px-4 py-4 text-left text-xs uppercase tracking-widest transition-all ${tab === item ? 'border-[#C9A84C] bg-[#C9A84C] text-[#090909]' : 'border-[#C9A84C]/20 bg-transparent text-[#F5E6C8]/45 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'}`}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <section className="p-5 sm:p-7 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#C9A84C]/20 pb-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 text-xs uppercase tracking-widest text-[#C9A84C]">Staff Portal</div>
              <h1 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,6vw,3.2rem)] font-normal capitalize leading-none">{tab}</h1>
            </div>
            <button onClick={refresh} className="w-fit border border-[#C9A84C]/30 px-5 py-3 text-xs uppercase tracking-widest text-[#C9A84C]">Refresh</button>
          </div>

          {tab === 'dashboard' && (
            <div className="grid gap-6">
              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-4">
                {[
                  ['Sales', summary.totals.sales.toFixed(3) + ' KD'],
                  ['Expenses', summary.totals.expenses.toFixed(3) + ' KD'],
                  ['Net', summary.totals.net.toFixed(3) + ' KD'],
                  ['Orders', String(summary.totals.orders)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#111010] p-5">
                    <div className="mb-3 text-[0.65rem] uppercase tracking-widest text-[#F5E6C8]/40">{label}</div>
                    <div style={{fontFamily:'Georgia,serif'}} className="text-2xl text-[#C9A84C] lg:text-3xl">{value}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div className="border border-[#C9A84C]/20 bg-[#111010] p-5">
                  <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">Sales vs Expenses</div>
                  {[
                    ['Sales', summary.totals.sales],
                    ['Expenses', summary.totals.expenses],
                  ].map(([label, value]) => (
                    <div key={label} className="mb-5">
                      <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-[#F5E6C8]/45"><span>{label}</span><span>{Number(value).toFixed(3)} KD</span></div>
                      <div className="h-3 bg-[#090909]"><div className="h-full bg-[#C9A84C]" style={{ width: `${(Number(value) / maxChartValue) * 100}%` }}/></div>
                    </div>
                  ))}
                </div>

                <div className="border border-[#C9A84C]/20 bg-[#111010] p-5">
                  <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">Low Stock</div>
                  <div className="grid gap-3">
                    {(summary.lowStock.length ? summary.lowStock : summary.stock.slice(0, 4)).map(item => (
                      <div key={item.id} className="flex items-center justify-between border border-[#C9A84C]/10 p-3">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs uppercase tracking-widest text-[#C9A84C]">{item.quantity} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SalesList orders={activeOrders.slice(0, 6)} title="Recent Sales"/>
              <ProductStrip items={recentProducts}/>
            </div>
          )}

          {tab === 'sales' && <SalesList orders={activeOrders} title="All Sales"/>}
          {tab === 'canceled' && <SalesList orders={canceledOrders} title="Canceled Orders"/>}

          {tab === 'menu' && (
            <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
              <MenuProductForm onSubmit={addMenuItem}/>
              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-2">
                {summary.menuItems.map(item => (
                  <div key={item.id} className="grid gap-4 bg-[#111010] p-5 sm:grid-cols-[96px_1fr]">
                    <div className="relative h-24 bg-[#090909]">
                      {item.image ? <Image src={item.image} alt={item.name} fill sizes="96px" className="object-contain p-3"/> : null}
                    </div>
                    <div>
                      <div className="mb-1 text-xs uppercase tracking-widest text-[#C9A84C]">{item.category}</div>
                      <div style={{fontFamily:'Georgia,serif'}} className="mb-2 text-2xl">{item.name}</div>
                      <div className="mb-3 text-xs leading-6 text-[#F5E6C8]/45">{item.description}</div>
                      <div className="text-[#C9A84C]">{item.price.toFixed(3)} KD</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'stock' && (
            <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
              <AdminForm title="Add Stock" onSubmit={addStock} fields={[
                ['name','Item name','Cups / Dairy / Beans'],
                ['category','Category','cups, dairy, beans'],
                ['quantity','Quantity','100'],
                ['unit','Unit','pcs, liter, kg'],
                ['lowAt','Low alert at','20'],
              ]}/>
              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-2">
                {summary.stock.map(item => (
                  <div key={item.id} className="bg-[#111010] p-5">
                    <div className="mb-2 text-xs uppercase tracking-widest text-[#C9A84C]">{item.category}</div>
                    <div style={{fontFamily:'Georgia,serif'}} className="mb-4 text-2xl">{item.name}</div>
                    <div className="text-sm text-[#F5E6C8]/55">{item.quantity} {item.unit} in stock</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-[#F5E6C8]/35">Low at {item.lowAt} {item.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'expenses' && (
            <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
              <AdminForm title="Add Expense" onSubmit={addExpense} fields={[
                ['title','Expense title','Milk delivery'],
                ['category','Category','supplies, rent, salaries'],
                ['amount','Amount KD','12.500'],
                ['note','Note','Optional'],
              ]}/>
              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20">
                {summary.expenses.map(expense => (
                  <div key={expense.id} className="grid gap-4 bg-[#111010] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <div style={{fontFamily:'Georgia,serif'}} className="mb-2 text-2xl">{expense.title}</div>
                      <div className="text-xs uppercase tracking-widest text-[#F5E6C8]/40">{expense.category} - {new Date(expense.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-[#C9A84C]">{expense.amount.toFixed(3)} KD</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function SalesList({ orders, title }: { orders: Order[]; title: string }) {
  return (
    <div className="border border-[#C9A84C]/20 bg-[#111010] p-5">
      <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">{title}</div>
      <div className="grid gap-px bg-[#C9A84C]/20">
        {orders.map(order => (
          <div key={order.id} className="grid gap-4 bg-[#111010] p-4 lg:grid-cols-[118px_1fr_auto] lg:items-center">
            <div className="text-xs uppercase tracking-widest text-[#F5E6C8]/45">#{order.orderNumber}<br/>{new Date(order.createdAt).toLocaleString()}</div>
            <div>
              <div className="mb-2 text-sm text-[#F5E6C8]">{order.items.map(item => item.name).join(', ')}</div>
              <div className="text-xs uppercase tracking-widest text-[#C9A84C]/70">{order.paymentMethod} - {order.status}</div>
            </div>
            <div style={{fontFamily:'Georgia,serif'}} className="text-xl italic text-[#C9A84C]">{order.total.toFixed(3)} KD</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductStrip({ items }: { items: OrderItem[] }) {
  if (!items.length) return null
  return (
    <div className="grid grid-cols-2 gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-4">
      {items.map(item => (
        <div key={item.id} className="bg-[#111010] p-4">
          <div className="relative mb-3 h-24 bg-[#090909]">
            <Image src={item.image} alt={item.name} fill sizes="160px" className="object-contain p-3"/>
          </div>
          <div className="text-xs text-[#F5E6C8]/65">{item.name}</div>
        </div>
      ))}
    </div>
  )
}

function MenuProductForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const [preview, setPreview] = useState('')

  return (
    <form onSubmit={onSubmit} className="h-fit border border-[#C9A84C]/20 bg-[#111010] p-5">
      <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">Add Product</div>
      <div className="grid gap-4">
        {[
          ['name','Product name','Spanish Latte'],
          ['description','Description','Sweet espresso with chilled milk'],
          ['category','Category','coffee, desserts, cold'],
          ['price','Price KD','2.500'],
        ].map(([name, label, placeholder]) => (
          <label key={name} className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">{label}</span>
            <input name={name} required placeholder={placeholder} className="h-12 w-full border border-[#C9A84C]/20 bg-[#090909] px-4 text-sm text-[#F5E6C8] outline-none placeholder:text-[#F5E6C8]/25 focus:border-[#C9A84C]"/>
          </label>
        ))}

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">Product image</span>
          <input
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={event => {
              const file = event.currentTarget.files?.[0]
              setPreview(file ? URL.createObjectURL(file) : '')
            }}
            className="block w-full cursor-pointer border border-[#C9A84C]/20 bg-[#090909] text-sm text-[#F5E6C8]/60 file:mr-4 file:cursor-pointer file:border-0 file:bg-[#C9A84C] file:px-4 file:py-3 file:text-xs file:uppercase file:tracking-widest file:text-[#090909]"
          />
        </label>

        {preview && (
          <div className="relative h-40 border border-[#C9A84C]/20 bg-[#090909]">
            <Image src={preview} alt="Product preview" fill sizes="320px" className="object-contain p-4"/>
          </div>
        )}

        <button className="mt-2 cursor-pointer border border-[#C9A84C] bg-[#C9A84C] px-6 py-4 text-xs uppercase tracking-widest text-[#090909]">Save Product</button>
      </div>
    </form>
  )
}

function AdminForm({ title, onSubmit, fields }: { title: string; onSubmit: (event: FormEvent<HTMLFormElement>) => void; fields: string[][] }) {
  return (
    <form onSubmit={onSubmit} className="h-fit border border-[#C9A84C]/20 bg-[#111010] p-5">
      <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">{title}</div>
      <div className="grid gap-4">
        {fields.map(([name, label, placeholder]) => (
          <label key={name} className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">{label}</span>
            <input name={name} required={name !== 'note'} placeholder={placeholder} className="h-12 w-full border border-[#C9A84C]/20 bg-[#090909] px-4 text-sm text-[#F5E6C8] outline-none placeholder:text-[#F5E6C8]/25 focus:border-[#C9A84C]"/>
          </label>
        ))}
        <button className="mt-2 cursor-pointer border border-[#C9A84C] bg-[#C9A84C] px-6 py-4 text-xs uppercase tracking-widest text-[#090909]">Save</button>
      </div>
    </form>
  )
}
