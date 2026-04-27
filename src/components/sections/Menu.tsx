'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

type Item = { id: string; name: string; description: string; price: number; category: string; emoji: string | null; image?: string }
type Size = 'S' | 'M' | 'L'
type CartItem = { id: string; name: string; image: string; category: string; size: Size; sweet?: string; price: number }

const COFFEE_IMAGES = [
  '/images/Coffes/GLASS-0.png',
  '/images/Coffes/GLASS-1.png',
  '/images/Coffes/GLASS-2.png',
  '/images/Coffes/GLASS-3.png',
  '/images/Coffes/GLASS-4.png',
  '/images/Coffes/GLASS-5.png',
  '/images/Coffes/GLASS-6.png',
  '/images/Coffes/GLASS-7.png',
  '/images/Coffes/GLASS-8.png',
]

const SWEET_IMAGES = [
  '/images/sweets/TREAT_0.png',
  '/images/sweets/TREAT_1.png',
  '/images/sweets/TREAT_2.png',
  '/images/sweets/TREAT_3.png',
  '/images/sweets/TREAT_4.png',
  '/images/sweets/TREAT_5.png',
  '/images/sweets/TREAT_6.png',
]

const SWEET_ADDONS = [
  { name: 'Butter Cookie', image: SWEET_IMAGES[0], price: 0.75 },
  { name: 'Cheesecake Bite', image: SWEET_IMAGES[1], price: 1.5 },
  { name: 'Dark Brownie', image: SWEET_IMAGES[2], price: 1.0 },
]

const SIZE_PRICES: Record<Size, number> = { S: 0, M: 0.25, L: 0.5 }
const SIZE_SCALE: Record<Size, number> = { S: 0.78, M: 0.96, L: 1.14 }

const FALLBACK: Item[] = [
  {id:'1',name:'Signature Latte',description:'Our house espresso with velvety steamed milk.',price:2.5,category:'coffee',emoji:null,image:COFFEE_IMAGES[0]},
  {id:'2',name:'Cold Brew',description:'12-hour steeped dark roast, smooth and bold.',price:2.75,category:'coffee',emoji:null,image:COFFEE_IMAGES[1]},
  {id:'3',name:'Caramel Macchiato',description:'Layers of vanilla, milk, espresso and caramel.',price:2.75,category:'coffee',emoji:null,image:COFFEE_IMAGES[2]},
  {id:'4',name:'Americano',description:'Double espresso with hot water, pure and intense.',price:1.75,category:'coffee',emoji:null,image:COFFEE_IMAGES[3]},
  {id:'5',name:'Flat White',description:'Micro-foam milk over a ristretto shot.',price:2.25,category:'coffee',emoji:null,image:COFFEE_IMAGES[4]},
  {id:'6',name:'Matcha Latte',description:'Ceremonial matcha whisked with steamed oat milk.',price:2.5,category:'coffee',emoji:null,image:COFFEE_IMAGES[5]},
  {id:'7',name:'Butter Cookie',description:'Melt-in-your-mouth butter cookie, baked fresh.',price:0.75,category:'desserts',emoji:null,image:SWEET_IMAGES[0]},
  {id:'8',name:'Cheesecake Slice',description:'Creamy New York-style cheesecake.',price:1.5,category:'desserts',emoji:null,image:SWEET_IMAGES[1]},
  {id:'9',name:'Dark Brownie',description:'Fudgy dark chocolate brownie.',price:1.0,category:'desserts',emoji:null,image:SWEET_IMAGES[2]},
  {id:'10',name:'Croissant',description:'Flaky, golden, buttery croissant.',price:1.25,category:'desserts',emoji:null,image:SWEET_IMAGES[3]},
  {id:'11',name:'Iced Latte',description:'Double espresso over ice with cold milk.',price:2.5,category:'cold',emoji:null,image:COFFEE_IMAGES[6]},
  {id:'12',name:'Mango Smoothie',description:'Pure blended mango, tropical and sweet.',price:2.5,category:'cold',emoji:null,image:COFFEE_IMAGES[7]},
  {id:'13',name:'Fresh Lemonade',description:'Squeezed lemon with mint and sea salt.',price:2.0,category:'cold',emoji:null,image:COFFEE_IMAGES[8]},
  {id:'14',name:'Berry Blast',description:'Mixed berries blended with yogurt and honey.',price:2.5,category:'cold',emoji:null,image:COFFEE_IMAGES[6]},
  {id:'15',name:'Vanilla Milkshake',description:'Creamy vanilla milkshake with whipped cream.',price:2.75,category:'cold',emoji:null,image:COFFEE_IMAGES[7]},
  {id:'16',name:'Iced Matcha',description:'Matcha over ice with oat milk.',price:2.5,category:'cold',emoji:null,image:COFFEE_IMAGES[8]},
]

function imageFor(item: Item, index: number) {
  if (item.image) return item.image
  if (item.category === 'desserts') return SWEET_IMAGES[index % SWEET_IMAGES.length]
  return COFFEE_IMAGES[index % COFFEE_IMAGES.length]
}

export default function Menu({ initialItems }: { initialItems: Item[] }) {
  const items = initialItems.length > 0 ? initialItems : FALLBACK
  const [active, setActive] = useState('coffee')
  const [selected, setSelected] = useState<Item | null>(null)
  const [selectedImage, setSelectedImage] = useState(COFFEE_IMAGES[0])
  const [size, setSize] = useState<Size>('M')
  const [step, setStep] = useState<'size' | 'sweet'>('size')
  const [cartCount, setCartCount] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [cartPulse, setCartPulse] = useState(false)
  const filtered = items.filter(i => i.category === active)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem('umbrella-cart')
      if (stored) setCartCount((JSON.parse(stored) as CartItem[]).length)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 640px)')
    const updateDesktop = () => setIsDesktop(media.matches)
    const timer = window.setTimeout(updateDesktop, 0)
    media.addEventListener('change', updateDesktop)
    return () => {
      window.clearTimeout(timer)
      media.removeEventListener('change', updateDesktop)
    }
  }, [])

  const openOrder = (item: Item, index: number) => {
    setSelected(item)
    setSelectedImage(imageFor(item, index))
    setSize('M')
    setStep(item.category === 'desserts' ? 'sweet' : 'size')
  }

  const chooseSize = (nextSize: Size) => {
    setSize(nextSize)
    window.setTimeout(() => setStep('sweet'), 420)
  }

  const addToCart = (sweet?: typeof SWEET_ADDONS[number]) => {
    if (!selected) return
    const stored = window.localStorage.getItem('umbrella-cart')
    const cart = stored ? JSON.parse(stored) as CartItem[] : []
    let cartId = `${selected.id}-${cart.length + 1}`
    while (cart.some(item => item.id === cartId)) cartId = `${cartId}-next`
    const cartItem: CartItem = {
      id: cartId,
      name: selected.name,
      image: selectedImage,
      category: selected.category,
      size,
      sweet: sweet?.name,
      price: selected.price + SIZE_PRICES[size] + (sweet?.price ?? 0),
    }
    const nextCart = [...cart, cartItem]
    window.localStorage.setItem('umbrella-cart', JSON.stringify(nextCart))
    setCartCount(nextCart.length)
    setCartPulse(true)
    setSelected(null)
    window.setTimeout(() => setCartPulse(false), 1800)
  }

  return (
    <section id="menu" className="bg-[#090909] px-6 py-28 sm:px-10 md:px-14 lg:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end"
      >
        <div>
          <div className="mb-5 flex items-center gap-4"><div className="h-px w-8 bg-[#C9A84C]"/><span className="text-xs uppercase tracking-widest text-[#C9A84C]">What We Offer</span></div>
          <h2 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2.25rem,7vw,3.2rem)] font-normal text-[#F5E6C8]">Our <em className="italic text-[#C9A84C]">Menu</em></h2>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-auto md:items-end">
          <Link href="/checkout" className="w-fit border-b border-[#C9A84C]/40 pb-1 text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-colors hover:text-[#F5E6C8]">
            Cart ({cartCount}) Checkout
          </Link>
          <div className="flex w-full gap-0.5 overflow-x-auto md:w-auto">
            {['coffee','desserts','cold'].map(cat => (
              <button key={cat} onClick={() => { setActive(cat); setSelected(null) }}
                className={`min-w-28 cursor-pointer px-6 py-3 text-xs uppercase tracking-widest transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] ${active === cat ? 'border border-[#C9A84C] bg-[#C9A84C] text-[#090909]' : 'border border-[#C9A84C]/20 bg-transparent text-[#F5E6C8]/40 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        layout
        className="grid grid-cols-1 gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 md:grid-cols-2 xl:grid-cols-3"
      >
        {filtered.map((item, idx) => {
          const image = imageFor(item, idx)
          const isInlineSelected = !isDesktop && selected?.id === item.id
          return (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
              className="group relative overflow-hidden bg-[#090909]"
            >
              <button onClick={() => openOrder(item, idx)} className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left">
                <div className="relative h-44 overflow-hidden">
                  <motion.div
                    layoutId={isDesktop ? `menu-image-${item.id}` : undefined}
                    animate={{ x: isInlineSelected ? 44 : 0, scale: isInlineSelected && item.category !== 'desserts' ? SIZE_SCALE[size] : 1 }}
                    transition={{ type: 'spring', stiffness: 130, damping: 18 }}
                    className="absolute inset-0"
                  >
                    <Image src={image} alt={item.name} fill sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw" className={`transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 ${isInlineSelected ? 'object-contain p-4 brightness-90' : 'object-cover brightness-[.62]'}`}/>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/20 to-transparent"/>
                  <div className="absolute left-6 top-5 text-xs tracking-widest text-[#C9A84C]/80">0{idx + 1}</div>
                </div>
                <div className="relative p-7 sm:p-8">
                  <div className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent transition-transform duration-500 group-hover:scale-x-100"/>
                  <div style={{fontFamily:'Georgia,serif'}} className="mb-2 text-xl text-[#F5E6C8] transition-colors group-hover:text-[#C9A84C]">{item.name}</div>
                  <div className="mb-7 min-h-14 text-xs font-light leading-7 text-[#F5E6C8]/45">{item.description}</div>
                  <div className="flex items-center justify-between gap-4">
                    <div style={{fontFamily:'Georgia,serif'}} className="italic text-[#C9A84C]">{item.price.toFixed(3)} KD</div>
                    <span className="text-xs uppercase tracking-widest text-[#F5E6C8]/45 transition-colors group-hover:text-[#C9A84C]">Order</span>
                  </div>
                </div>
              </button>
              <AnimatePresence>
                {isInlineSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden border-t border-[#C9A84C]/20"
                  >
                    <div className="p-6 pt-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="text-xs uppercase tracking-widest text-[#C9A84C]">{item.category === 'desserts' ? 'Choose a sweet' : 'Choose your cup'}</div>
                        <button onClick={() => setSelected(null)} className="border-0 bg-transparent text-xs uppercase tracking-widest text-[#F5E6C8]/35">Close</button>
                      </div>

                      {item.category !== 'desserts' && (
                        <div className="mb-6 grid grid-cols-3 gap-2">
                          {(['S','M','L'] as Size[]).map(option => (
                            <button key={option} onClick={() => chooseSize(option)} className={`h-12 cursor-pointer border text-sm uppercase tracking-widest transition-all active:scale-95 ${size === option ? 'border-[#C9A84C] bg-[#C9A84C] text-[#090909]' : 'border-[#C9A84C]/20 bg-transparent text-[#F5E6C8]/50'}`}>
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      <AnimatePresence mode="wait">
                        {step === 'sweet' && (
                          <motion.div
                            initial={{ opacity: 0, x: 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -28 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          >
                            <div className="mb-3 text-xs uppercase tracking-widest text-[#C9A84C]">Add something sweet?</div>
                            <div className="mb-4 grid grid-cols-3 gap-2">
                              {SWEET_ADDONS.map(sweet => (
                                <button key={sweet.name} onClick={() => addToCart(sweet)} className="border border-[#C9A84C]/20 bg-[#111010] p-2 text-left active:scale-95">
                                  <div className="relative mb-2 h-16">
                                    <Image src={sweet.image} alt={sweet.name} fill sizes="90px" className="object-contain"/>
                                  </div>
                                  <div className="text-[0.6rem] leading-4 text-[#F5E6C8]/70">{sweet.name}</div>
                                </button>
                              ))}
                            </div>
                            <button onClick={() => addToCart()} className="w-full border border-[#C9A84C]/20 bg-transparent px-6 py-4 text-xs uppercase tracking-widest text-[#F5E6C8]/50 active:scale-[.98]">
                              No thanks
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </motion.div>

      <AnimatePresence>
        {selected && isDesktop && (
          <motion.div className="fixed inset-0 z-[700] bg-[#090909]/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close order" onClick={() => setSelected(null)} className="absolute inset-0 h-full w-full cursor-default border-0 bg-transparent"/>
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 110, damping: 22 }}
              className="absolute bottom-0 right-0 top-auto max-h-[92svh] w-full overflow-y-auto bg-[#111010] p-6 shadow-[-30px_0_80px_rgba(0,0,0,.45)] sm:top-0 sm:max-h-none sm:w-[430px] sm:p-8"
            >
              <button onClick={() => setSelected(null)} className="mb-6 border-0 bg-transparent text-xs uppercase tracking-widest text-[#F5E6C8]/45 transition-colors hover:text-[#C9A84C]">Close</button>
              <div className="relative mb-8 h-72 overflow-hidden border border-[#C9A84C]/20 bg-[#090909]">
                <motion.div
                  layoutId={`menu-image-${selected.id}`}
                  animate={{ x: step === 'sweet' ? -34 : 0, scale: selected.category === 'desserts' ? 1 : SIZE_SCALE[size] }}
                  transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  className="absolute inset-8"
                >
                  <Image src={selectedImage} alt={selected.name} fill sizes="360px" className="object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,.45)]"/>
                </motion.div>
              </div>
              <div className="mb-6">
                <div className="mb-2 text-xs uppercase tracking-widest text-[#C9A84C]">{selected.category === 'desserts' ? 'Sweet Order' : 'Choose Your Cup'}</div>
                <h3 style={{fontFamily:'Georgia,serif'}} className="text-3xl font-normal text-[#F5E6C8]">{selected.name}</h3>
              </div>

              {selected.category !== 'desserts' && (
                <div className="mb-8 grid grid-cols-3 gap-2">
                  {(['S','M','L'] as Size[]).map(option => (
                    <button key={option} onClick={() => chooseSize(option)} className={`h-14 cursor-pointer border text-sm uppercase tracking-widest transition-all ${size === option ? 'border-[#C9A84C] bg-[#C9A84C] text-[#090909]' : 'border-[#C9A84C]/20 bg-transparent text-[#F5E6C8]/50 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'}`}>
                      {option}
                    </button>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 'sweet' && (
                  <motion.div initial={{ opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -34 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                    <div className="mb-4 text-xs uppercase tracking-widest text-[#C9A84C]">Add something sweet?</div>
                    <div className="mb-5 grid grid-cols-3 gap-2">
                      {SWEET_ADDONS.map(sweet => (
                        <button key={sweet.name} onClick={() => addToCart(sweet)} className="group cursor-pointer border border-[#C9A84C]/20 bg-[#090909] p-2 text-left transition-all hover:border-[#C9A84C]/70">
                          <div className="relative mb-3 h-20 overflow-hidden">
                            <Image src={sweet.image} alt={sweet.name} fill sizes="120px" className="object-contain transition-transform duration-500 group-hover:scale-110"/>
                          </div>
                          <div className="text-[0.65rem] leading-4 text-[#F5E6C8]/70">{sweet.name}</div>
                          <div className="mt-1 text-[0.65rem] text-[#C9A84C]">{sweet.price.toFixed(3)} KD</div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => addToCart()} className="w-full cursor-pointer border border-[#C9A84C]/20 bg-transparent px-6 py-4 text-xs uppercase tracking-widest text-[#F5E6C8]/50 transition-all hover:border-[#C9A84C] hover:text-[#C9A84C]">
                      No thanks
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: cartPulse ? 1.06 : 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="fixed bottom-5 right-5 z-[650] sm:bottom-8 sm:right-8"
          >
            <Link href="/checkout" className="flex items-center gap-3 border border-[#C9A84C]/70 bg-[#C9A84C] px-5 py-4 text-xs uppercase tracking-widest text-[#090909] no-underline shadow-[0_18px_42px_rgba(0,0,0,.38)] transition-transform active:scale-95">
              <span className="grid h-6 w-6 place-items-center border border-[#090909]/30 text-[0.65rem]">{cartCount}</span>
              Cart
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
