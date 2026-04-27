'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function About() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).style.opacity = '1' }), { threshold: 0.1 })
    if (ref1.current) obs.observe(ref1.current)
    if (ref2.current) obs.observe(ref2.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="py-36 grid md:grid-cols-2 bg-[#111010]">
      <div ref={ref1} style={{opacity:0, transition:'opacity 1s ease'}} className="relative h-[600px] overflow-hidden">
        <div className="absolute top-12 left-16 w-[280px] h-[400px] z-20">
          <Image src="/images/outside.webp" alt="Cafe exterior" fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover brightness-[.8]"/>
        </div>
        <div className="absolute top-8 left-12 w-[280px] h-[400px] border border-[#C9A84C] z-10 pointer-events-none"/>
        <div className="absolute bottom-12 right-10 w-[180px] h-[260px] z-30 outline outline-4 outline-[#111010]">
          <Image src="/images/siting_area.webp" alt="Seating area" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover brightness-[.7]"/>
        </div>
      </div>
      <div ref={ref2} style={{opacity:0, transition:'opacity 1s ease 0.2s'}} className="flex flex-col justify-center px-14 py-14">
        <div className="flex items-center gap-4 mb-6"><div className="w-8 h-px bg-[#C9A84C]"/><span className="text-[#C9A84C] text-xs tracking-widest uppercase">Our Story</span></div>
        <h2 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,3vw,3.2rem)] font-normal text-[#F5E6C8] mb-7 leading-tight">More Than<br/>Just <em className="italic text-[#C9A84C]">Coffee</em></h2>
        <p className="text-sm leading-8 text-[#F5E6C8]/60 mb-12 font-light">Umbrella Coffee is a sanctuary for those who believe a great cup of coffee can transform your day. Nestled in the heart of Kuwait, we brew specialty coffee with care and precision.<br/><br/>From our signature lattes to seasonal drinks, every cup is a moment worth savoring.</p>
        <div className="flex gap-0 border-t border-[#C9A84C]/20">
          {[['100%','Specialty Beans'],['infinity','Good Vibes'],['#1','Top Rated']].map(([num,label],i) => (
            <div key={i} className={`flex-1 pt-7 ${i > 0 ? 'pl-8 border-l border-[#C9A84C]/20' : 'pr-8'}`}>
              <div style={{fontFamily:'Georgia,serif'}} className="text-4xl text-[#C9A84C] leading-none">{num === 'infinity' ? '∞' : num}</div>
              <div className="text-xs tracking-widest text-[#F5E6C8]/40 mt-2 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}