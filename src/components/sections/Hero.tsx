'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current) { cursorRef.current.style.left = mx + 'px'; cursorRef.current.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', move)
    let raf: number
    const loop = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="fixed w-3 h-3 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"/>
      <div ref={ringRef} className="fixed w-10 h-10 border border-[#C9A84C] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50"/>
      <section id="hero" className="min-h-screen grid md:grid-cols-2 relative overflow-hidden bg-[#090909]">
        <div className="flex flex-col justify-center px-14 pt-32 pb-20 z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#C9A84C]"/>
            <span className="text-[#C9A84C] text-xs tracking-[.4em] uppercase">Specialty Coffee - Kuwait</span>
          </div>
          <h1 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(3rem,5vw,6rem)] font-normal leading-[.95] text-[#F5E6C8] mb-4">
            The Art<br/>of <em className="italic text-[#C9A84C]">Fine</em><br/>Coffee
          </h1>
          <p style={{fontFamily:'Georgia,serif'}} className="italic text-[clamp(1.2rem,2vw,1.8rem)] text-[#A67550] mb-8">Where luxury meets warmth</p>
          <p className="text-sm leading-8 text-[#F5E6C8]/60 max-w-sm mb-12 font-light">A sanctuary of exceptional coffee, crafted with precision and passion in the heart of Kuwait City.</p>
          <div className="flex gap-6 items-center">
            <a href="#menu" className="border border-[#C9A84C] text-[#C9A84C] px-10 py-4 text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#090909] transition-all no-underline">Explore Menu</a>
            <a href="#gallery" className="text-xs tracking-widest uppercase text-[#F5E6C8]/40 hover:text-[#C9A84C] transition-colors border-b border-[#C9A84C]/30 pb-0.5 no-underline">View Gallery</a>
          </div>
        </div>
        <div className="relative hidden md:block">
          <div className="absolute inset-0 z-10 pointer-events-none" style={{background:'linear-gradient(to right, #090909 0%, transparent 35%), linear-gradient(to top, #090909 0%, transparent 30%)'}}/>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
            <div className="relative row-span-2"><Image src="/images/libertion_tower.webp" alt="Kuwait skyline" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover brightness-[.6]" loading="eager" priority/></div>
            <div className="relative"><Image src="/images/inside_making.webp" alt="Coffee bar" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover brightness-[.6]" loading="eager" priority/></div>
            <div className="relative"><Image src="/images/coffe.webp" alt="Latte art" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover brightness-[.6]"/></div>
          </div>
        </div>
      </section>
    </>
  )
}