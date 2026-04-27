'use client'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Tab = 'orders' | 'stock'
type OrderItem = { id: string; name: string; image: string; category: string; size: string; sweet: string | null; price: number }
type Order = { id: string; orderNumber: number; paymentMethod: string; status: string; total: number; createdAt: string; items: OrderItem[] }
type StockItem = { id: string; name: string; category: string; quantity: number; unit: string; lowAt: number }

export default function StaffPage() {
  const [tab, setTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [stock, setStock] = useState<StockItem[]>([])
  const [selected, setSelected] = useState<Order | null>(null)
  const [allowed, setAllowed] = useState(false)
  const [incoming, setIncoming] = useState<Order | null>(null)
  const lastTopOrderRef = useRef<string | null>(null)

  const refreshOrders = useCallback(async () => {
    const res = await fetch('/api/orders', { cache: 'no-store' })
    const nextOrders = await res.json() as Order[]
    const active = nextOrders.filter(order => order.status !== 'canceled' && order.status !== 'done')
    const top = active[0]

    if (lastTopOrderRef.current && top && top.id !== lastTopOrderRef.current && top.status === 'new') {
      setIncoming(top)
    }

    if (top) lastTopOrderRef.current = top.id
    setOrders(active)
    setSelected(current => current ? active.find(order => order.id === current.id) ?? null : current)
  }, [])

  const refreshStock = useCallback(async () => {
    const res = await fetch('/api/stock', { cache: 'no-store' })
    setStock(await res.json() as StockItem[])
  }, [])

  useEffect(() => {
    let interval: number | undefined
    const timer = window.setTimeout(() => {
      const role = window.localStorage.getItem('umbrella-role')
      if (role !== 'staff' && role !== 'admin') {
        window.location.assign('/login')
        return
      }
      setAllowed(true)
      refreshOrders()
      refreshStock()
      interval = window.setInterval(refreshOrders, 8000)
    }, 0)
    return () => {
      window.clearTimeout(timer)
      if (interval) window.clearInterval(interval)
    }
  }, [refreshOrders, refreshStock])

  const setStatus = async (order: Order, status: string) => {
    const res = await fetch(`/api/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const updated = await res.json() as Order
    setSelected(status === 'done' || status === 'canceled' ? null : updated)
    await refreshOrders()
  }

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
    await refreshStock()
  }

  if (!allowed) return null

  return (
    <main className="min-h-screen bg-[#090909] text-[#F5E6C8]">
      {incoming && (
        <div className="fixed left-4 right-4 top-4 z-[900] border border-[#C9A84C] bg-[#C9A84C] p-4 text-[#090909] shadow-[0_18px_42px_rgba(0,0,0,.42)] sm:left-auto sm:w-[360px]">
          <div className="mb-1 text-xs uppercase tracking-widest">Incoming order</div>
          <div style={{fontFamily:'Georgia,serif'}} className="text-2xl">Order #{incoming.orderNumber}</div>
          <button onClick={() => { setSelected(incoming); setIncoming(null); setTab('orders') }} className="mt-4 border border-[#090909]/30 px-4 py-2 text-xs uppercase tracking-widest">Open order</button>
        </div>
      )}

      <div className="grid min-h-screen lg:grid-cols-[220px_1fr]">
        <aside className="border-b border-[#C9A84C]/20 bg-[#111010] p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <div className="mb-3 h-px w-8 bg-[#C9A84C]"/>
            <div style={{fontFamily:'Georgia,serif'}} className="text-2xl">Staff</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[#C9A84C]/70">Orders and stock</div>
          </div>
          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {(['orders','stock'] as Tab[]).map(item => (
              <button key={item} onClick={() => setTab(item)} className={`border px-4 py-4 text-left text-xs uppercase tracking-widest ${tab === item ? 'border-[#C9A84C] bg-[#C9A84C] text-[#090909]' : 'border-[#C9A84C]/20 text-[#F5E6C8]/45'}`}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <section className="p-5 sm:p-7 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#C9A84C]/20 pb-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 text-xs uppercase tracking-widest text-[#C9A84C]">Cafe Floor</div>
              <h1 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,6vw,3.2rem)] font-normal capitalize leading-none">{tab}</h1>
            </div>
            <button onClick={tab === 'orders' ? refreshOrders : refreshStock} className="w-fit border border-[#C9A84C]/30 px-5 py-3 text-xs uppercase tracking-widest text-[#C9A84C]">Refresh</button>
          </div>

          {tab === 'orders' && (
            <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20">
                {orders.map(order => (
                  <button key={order.id} onClick={() => setSelected(order)} className="grid cursor-pointer gap-4 bg-[#111010] p-5 text-left sm:grid-cols-[120px_1fr_auto] sm:items-center">
                    <div className="text-xs uppercase tracking-widest text-[#F5E6C8]/45">#{order.orderNumber}<br/>{new Date(order.createdAt).toLocaleTimeString()}</div>
                    <div>
                      <div className="mb-2 text-sm text-[#F5E6C8]">{order.items.map(item => item.name).join(', ')}</div>
                      <div className="text-xs uppercase tracking-widest text-[#C9A84C]">{order.paymentMethod} - {order.status}</div>
                    </div>
                    <div className="text-[#C9A84C]">{order.total.toFixed(3)} KD</div>
                  </button>
                ))}
              </div>

              <aside className="h-fit border border-[#C9A84C]/20 bg-[#111010] p-5">
                {selected ? (
                  <>
                    <div className="mb-5 text-xs uppercase tracking-widest text-[#C9A84C]">Order #{selected.orderNumber}</div>
                    <div className="mb-6 grid gap-3">
                      {selected.items.map(item => (
                        <div key={item.id} className="grid grid-cols-[70px_1fr] gap-3 border border-[#C9A84C]/10 p-3">
                          <div className="relative h-16 bg-[#090909]"><Image src={item.image} alt={item.name} fill sizes="70px" className="object-contain p-2"/></div>
                          <div>
                            <div className="text-sm">{item.name}</div>
                            <div className="mt-1 text-xs uppercase tracking-widest text-[#F5E6C8]/40">Size {item.size}{item.sweet ? ` + ${item.sweet}` : ''}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-2">
                      <button onClick={() => setStatus(selected, 'preparing')} className="border border-[#C9A84C] bg-[#C9A84C] px-5 py-3 text-xs uppercase tracking-widest text-[#090909]">Preparing</button>
                      <button onClick={() => setStatus(selected, 'done')} className="border border-[#C9A84C]/30 px-5 py-3 text-xs uppercase tracking-widest text-[#C9A84C]">Done</button>
                      <button onClick={() => setStatus(selected, 'canceled')} className="border border-[#7f3b33] px-5 py-3 text-xs uppercase tracking-widest text-[#d98f83]">Cancel order</button>
                    </div>
                  </>
                ) : (
                  <div className="text-sm leading-8 text-[#F5E6C8]/55">Open an order to prepare, complete, or cancel it.</div>
                )}
              </aside>
            </div>
          )}

          {tab === 'stock' && (
            <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
              <form onSubmit={addStock} className="h-fit border border-[#C9A84C]/20 bg-[#111010] p-5">
                <div className="mb-6 text-xs uppercase tracking-widest text-[#C9A84C]">Add Stock</div>
                <div className="grid gap-4">
                  {[
                    ['name','Item name','Cups / Dairy / Beans'],
                    ['category','Category','cups, dairy, beans'],
                    ['quantity','Quantity','100'],
                    ['unit','Unit','pcs, liter, kg'],
                    ['lowAt','Low alert at','20'],
                  ].map(([name, label, placeholder]) => (
                    <label key={name} className="block">
                      <span className="mb-2 block text-xs uppercase tracking-widest text-[#F5E6C8]/40">{label}</span>
                      <input name={name} required placeholder={placeholder} className="h-12 w-full border border-[#C9A84C]/20 bg-[#090909] px-4 text-sm text-[#F5E6C8] outline-none placeholder:text-[#F5E6C8]/25 focus:border-[#C9A84C]"/>
                    </label>
                  ))}
                  <button className="mt-2 cursor-pointer border border-[#C9A84C] bg-[#C9A84C] px-6 py-4 text-xs uppercase tracking-widest text-[#090909]">Save stock</button>
                </div>
              </form>

              <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-2">
                {stock.map(item => (
                  <div key={item.id} className="bg-[#111010] p-5">
                    <div className="mb-2 text-xs uppercase tracking-widest text-[#C9A84C]">{item.category}</div>
                    <div style={{fontFamily:'Georgia,serif'}} className="mb-4 text-2xl">{item.name}</div>
                    <div className="text-sm text-[#F5E6C8]/55">{item.quantity} {item.unit}</div>
                    <div className="mt-2 text-xs uppercase tracking-widest text-[#F5E6C8]/35">Low at {item.lowAt} {item.unit}</div>
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
