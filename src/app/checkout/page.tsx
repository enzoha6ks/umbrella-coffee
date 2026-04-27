'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type CartItem = { id: string; name: string; image: string; category: string; size: 'S' | 'M' | 'L'; sweet?: string; price: number }
type PaymentMethod = 'knet' | 'cash'
type CheckoutStep = 'review' | 'done'

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [payment, setPayment] = useState<PaymentMethod>('knet')
  const [step, setStep] = useState<CheckoutStep>('review')
  const [orderNumber, setOrderNumber] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem('umbrella-cart')
      if (stored) setItems(JSON.parse(stored) as CartItem[])
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items])

  const removeItem = (id: string) => {
    const nextItems = items.filter(item => item.id !== id)
    setItems(nextItems)
    window.localStorage.setItem('umbrella-cart', JSON.stringify(nextItems))
  }

  const clearCart = () => {
    setItems([])
    setStep('review')
    window.localStorage.removeItem('umbrella-cart')
  }

  const placeOrder = async () => {
    setSubmitting(true)
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentMethod: payment, items }),
    })
    const order = await res.json()
    setOrderNumber(order.orderNumber)
    setStep('done')
    setSubmitting(false)
    window.localStorage.removeItem('umbrella-cart')
  }

  return (
    <main className="min-h-screen bg-[#090909] px-6 py-10 text-[#F5E6C8] sm:px-10 md:px-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-10 flex flex-col justify-between gap-6 border-b border-[#C9A84C]/20 pb-8 sm:flex-row sm:items-end"
        >
          <div>
            <Link href="/#menu" className="mb-6 inline-block border-b border-[#C9A84C]/35 pb-1 text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-colors hover:text-[#F5E6C8]">Back to menu</Link>
            <h1 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2.5rem,8vw,4.5rem)] font-normal leading-none">Checkout</h1>
          </div>
          <div className="text-xs uppercase tracking-widest text-[#F5E6C8]/45">{items.length} items</div>
        </motion.div>

        {step === 'done' ? (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl border border-[#C9A84C]/20 bg-[#111010] p-8">
            <div className="mb-4 text-xs uppercase tracking-widest text-[#C9A84C]">Order received</div>
            <h2 style={{fontFamily:'Georgia,serif'}} className="mb-5 text-4xl font-normal text-[#F5E6C8]">Thank you</h2>
            <p className="mb-8 text-sm leading-8 text-[#F5E6C8]/60">
              Order #{orderNumber ?? 'new'} was sent to staff. Please pay with {payment === 'knet' ? 'KNET at the counter or table machine' : 'cash at the counter'}.
            </p>
            <Link href="/#menu" onClick={() => setItems([])} className="inline-block border border-[#C9A84C] px-8 py-4 text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-all hover:bg-[#C9A84C] hover:text-[#090909]">Order again</Link>
          </motion.div>
        ) : items.length === 0 ? (
          <div className="py-24">
            <p className="mb-8 max-w-md text-sm leading-8 text-[#F5E6C8]/60">Your cart is empty. Add a coffee, choose the cup, and pair it with something sweet.</p>
            <Link href="/#menu" className="inline-block border border-[#C9A84C] px-8 py-4 text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-all hover:bg-[#C9A84C] hover:text-[#090909]">Start order</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="grid gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                  className="grid gap-5 bg-[#111010] p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center"
                >
                  <div className="relative h-32 overflow-hidden bg-[#090909]">
                    <Image src={item.image} alt={item.name} fill sizes="120px" className="object-contain p-3"/>
                  </div>
                  <div>
                    <div style={{fontFamily:'Georgia,serif'}} className="mb-2 text-2xl text-[#F5E6C8]">{item.name}</div>
                    <div className="text-xs uppercase tracking-widest text-[#F5E6C8]/45">Size {item.size}{item.sweet ? ` + ${item.sweet}` : ''}</div>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <div style={{fontFamily:'Georgia,serif'}} className="italic text-[#C9A84C]">{item.price.toFixed(3)} KD</div>
                    <button onClick={() => removeItem(item.id)} className="cursor-pointer border-0 bg-transparent text-xs uppercase tracking-widest text-[#F5E6C8]/35 transition-colors hover:text-[#C9A84C]">Remove</button>
                  </div>
                </motion.div>
              ))}
            </div>

            <aside className="h-fit border border-[#C9A84C]/20 bg-[#111010] p-7">
              <div className="mb-7 border-b border-[#C9A84C]/20 pb-6">
                <div className="mb-5 text-xs uppercase tracking-widest text-[#C9A84C]">Payment method</div>
                <div className="grid gap-3">
                  {([
                    ['knet','KNET','Pay at counter or table with KNET/NFC machine'],
                    ['cash','Cash','Pay at pickup counter'],
                  ] as [PaymentMethod,string,string][]).map(([value, title, desc]) => (
                    <button
                      key={value}
                      onClick={() => setPayment(value)}
                      className={`cursor-pointer border p-4 text-left transition-all ${payment === value ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 bg-transparent hover:border-[#C9A84C]/60'}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm uppercase tracking-widest text-[#F5E6C8]">{title}</span>
                        <span className={`h-3 w-3 border ${payment === value ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#F5E6C8]/30'}`}/>
                      </div>
                      <div className="mt-2 text-xs text-[#F5E6C8]/45">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8 flex items-center justify-between border-b border-[#C9A84C]/20 pb-6">
                <span className="text-xs uppercase tracking-widest text-[#F5E6C8]/45">Total</span>
                <span style={{fontFamily:'Georgia,serif'}} className="text-3xl italic text-[#C9A84C]">{total.toFixed(3)} KD</span>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={placeOrder} disabled={submitting} className="mb-4 w-full cursor-pointer border border-[#C9A84C] bg-[#C9A84C] px-6 py-4 text-xs uppercase tracking-widest text-[#090909] transition-all hover:shadow-[0_0_28px_rgba(201,168,76,.22)] disabled:cursor-wait disabled:opacity-60">
                {submitting ? 'Sending to staff' : payment === 'knet' ? 'Send order - pay KNET at counter' : 'Send order - pay cash'}
              </motion.button>
              <button onClick={clearCart} className="w-full cursor-pointer border border-[#C9A84C]/20 bg-transparent px-6 py-4 text-xs uppercase tracking-widest text-[#F5E6C8]/45 transition-all hover:border-[#C9A84C] hover:text-[#C9A84C]">Clear cart</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
