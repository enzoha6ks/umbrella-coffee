'use client'
import Image from 'next/image'

const IMGS = [
  {src:'/images/inside_making.webp',alt:'Bar interior'},
  {src:'/images/potes_outside.webp',alt:'Outside area'},
  {src:'/images/libertion_tower.webp',alt:'Kuwait skyline'},
  {src:'/images/coffe.webp',alt:'Latte art'},
  {src:'/images/outside.webp',alt:'Exterior'},
  {src:'/images/icecream.webp',alt:'Dessert'},
  {src:'/images/siting_area.webp',alt:'Seating area'},
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-[#111010]">
      <div className="text-center px-14 mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-px bg-[#C9A84C]"/>
          <span className="text-[#C9A84C] text-xs tracking-widest uppercase">Moments at Umbrella</span>
          <div className="w-8 h-px bg-[#C9A84C]"/>
        </div>
        <h2 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,3vw,3.2rem)] font-normal text-[#F5E6C8]">Our <em className="italic text-[#C9A84C]">Gallery</em></h2>
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none" style={{background:'linear-gradient(to right, #111010, transparent)'}}/>
        <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none" style={{background:'linear-gradient(to left, #111010, transparent)'}}/>
        <div className="flex gap-3 w-max" style={{animation:'scroll 28s linear infinite'}}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'running'}>
          {[...IMGS,...IMGS].map((img,i) => (
            <div key={i} className="relative w-[260px] h-[340px] flex-shrink-0 overflow-hidden group">
              <Image src={img.src} alt={img.alt} fill sizes="260px" className="object-cover brightness-[.65] group-hover:brightness-90 group-hover:scale-105 transition-all duration-500"/>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  )
}