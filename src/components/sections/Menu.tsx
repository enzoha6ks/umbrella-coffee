'use client'
import { useState } from 'react'

type Item = { id: string; name: string; description: string; price: number; category: string; emoji: string | null }

const FALLBACK: Item[] = [
  {id:'1',name:'Signature Latte',description:'Our house espresso with velvety steamed milk.',price:2.5,category:'coffee',emoji:null},
  {id:'2',name:'Cold Brew',description:'12-hour steeped dark roast, smooth and bold.',price:2.75,category:'coffee',emoji:null},
  {id:'3',name:'Caramel Macchiato',description:'Layers of vanilla, milk, espresso and caramel.',price:2.75,category:'coffee',emoji:null},
  {id:'4',name:'Americano',description:'Double espresso with hot water, pure and intense.',price:1.75,category:'coffee',emoji:null},
  {id:'5',name:'Flat White',description:'Micro-foam milk over a ristretto shot.',price:2.25,category:'coffee',emoji:null},
  {id:'6',name:'Matcha Latte',description:'Ceremonial matcha whisked with steamed oat milk.',price:2.5,category:'coffee',emoji:null},
  {id:'7',name:'Butter Cookie',description:'Melt-in-your-mouth butter cookie, baked fresh.',price:0.75,category:'desserts',emoji:null},
  {id:'8',name:'Cheesecake Slice',description:'Creamy New York-style cheesecake.',price:1.5,category:'desserts',emoji:null},
  {id:'9',name:'Dark Brownie',description:'Fudgy dark chocolate brownie.',price:1.0,category:'desserts',emoji:null},
  {id:'10',name:'Croissant',description:'Flaky, golden, buttery croissant.',price:1.25,category:'desserts',emoji:null},
  {id:'11',name:'Iced Latte',description:'Double espresso over ice with cold milk.',price:2.5,category:'cold',emoji:null},
  {id:'12',name:'Mango Smoothie',description:'Pure blended mango, tropical and sweet.',price:2.5,category:'cold',emoji:null},
  {id:'13',name:'Fresh Lemonade',description:'Squeezed lemon with mint and sea salt.',price:2.0,category:'cold',emoji:null},
  {id:'14',name:'Berry Blast',description:'Mixed berries blended with yogurt and honey.',price:2.5,category:'cold',emoji:null},
  {id:'15',name:'Vanilla Milkshake',description:'Creamy vanilla milkshake with whipped cream.',price:2.75,category:'cold',emoji:null},
  {id:'16',name:'Iced Matcha',description:'Matcha over ice with oat milk.',price:2.5,category:'cold',emoji:null},
]

export default function Menu({ initialItems }: { initialItems: Item[] }) {
  const items = initialItems.length > 0 ? initialItems : FALLBACK
  const [active, setActive] = useState('coffee')
  const filtered = items.filter(i => i.category === active)

  return (
    <section id="menu" className="py-36 px-14 bg-[#090909]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-5"><div className="w-8 h-px bg-[#C9A84C]"/><span className="text-[#C9A84C] text-xs tracking-widest uppercase">What We Offer</span></div>
          <h2 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,3vw,3.2rem)] font-normal text-[#F5E6C8]">Our <em className="italic text-[#C9A84C]">Menu</em></h2>
        </div>
        <div className="flex gap-0.5">
          {['coffee','desserts','cold'].map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-6 py-3 text-xs tracking-widest uppercase transition-all cursor-pointer ${active === cat ? 'bg-[#C9A84C] text-[#090909] border-transparent' : 'bg-transparent border border-[#C9A84C]/20 text-[#F5E6C8]/40 hover:border-[#C9A84C]/50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C9A84C]/20 border border-[#C9A84C]/20">
        {filtered.map((item, idx) => (
          <div key={item.id} className="bg-[#090909] p-10 group hover:bg-[#C9A84C]/05 transition-colors relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
            <div className="text-xs text-[#C9A84C]/30 tracking-widest mb-5">0{idx + 1}</div>
            <div style={{fontFamily:'Georgia,serif'}} className="text-xl text-[#F5E6C8] mb-2">{item.name}</div>
            <div className="text-xs text-[#F5E6C8]/45 leading-7 mb-7 font-light">{item.description}</div>
            <div style={{fontFamily:'Georgia,serif'}} className="italic text-[#C9A84C]">{item.price.toFixed(3)} KD</div>
          </div>
        ))}
      </div>
    </section>
  )
}