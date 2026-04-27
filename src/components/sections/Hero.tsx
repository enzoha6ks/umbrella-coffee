'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

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
      <div ref={cursorRef} className="fixed hidden md:block w-3 h-3 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"/>
      <div ref={ringRef} className="fixed hidden md:block w-10 h-10 border border-[#C9A84C] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50"/>
      <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[#090909] md:cursor-none lg:grid lg:grid-cols-2">
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-6 py-28 sm:px-10 md:px-14 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="mb-6 flex max-w-full items-center gap-3 sm:mb-8 sm:gap-4"
          >
            <div className="h-px w-7 flex-shrink-0 bg-[#C9A84C] sm:w-8"/>
            <span className="text-[0.65rem] uppercase tracking-[.28em] text-[#C9A84C] sm:text-xs sm:tracking-[.4em]">Specialty Coffee - Kuwait</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: 'easeOut' }}
            style={{fontFamily:'Georgia,serif'}}
            className="mb-4 text-[clamp(3.25rem,17vw,6rem)] font-normal leading-[.9] text-[#F5E6C8] sm:text-[clamp(4rem,10vw,6rem)] lg:text-[clamp(4rem,6vw,6rem)]"
          >
            The Art<br/>of <em className="italic text-[#C9A84C]">Fine</em><br/>Coffee
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: 'easeOut' }}
            style={{fontFamily:'Georgia,serif'}}
            className="mb-6 text-[clamp(1.2rem,6vw,1.8rem)] italic text-[#A67550] sm:mb-8 sm:text-[clamp(1.35rem,3vw,1.8rem)]"
          >
            Where luxury meets warmth
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: 'easeOut' }}
            className="mb-10 max-w-sm text-sm font-light leading-7 text-[#F5E6C8]/65 sm:mb-12 sm:leading-8"
          >
            A sanctuary of exceptional coffee, crafted with precision and passion in the heart of Kuwait City.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: 'easeOut' }}
            className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-6"
          >
            <motion.a whileTap={{ scale: 0.96 }} href="#menu" className="border border-[#C9A84C] px-8 py-4 text-center text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C9A84C] hover:text-[#090909] hover:shadow-[0_0_28px_rgba(201,168,76,.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] sm:px-10">Explore Menu</motion.a>
            <motion.a whileTap={{ x: 6 }} href="#gallery" className="self-start border-b border-[#C9A84C]/30 pb-0.5 text-xs uppercase tracking-widest text-[#F5E6C8]/55 no-underline transition-all duration-300 hover:text-[#C9A84C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C] sm:self-auto">View Gallery</motion.a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
          className="absolute inset-0 opacity-55 lg:relative lg:opacity-100"
        >
          <div className="absolute inset-0 z-10 pointer-events-none" style={{background:'linear-gradient(to bottom, rgba(9,9,9,.88) 0%, rgba(9,9,9,.12) 42%, rgba(9,9,9,.72) 100%), linear-gradient(to right, rgba(9,9,9,.86) 0%, rgba(9,9,9,.12) 38%, transparent 100%)'}}/>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
            <motion.div
              tabIndex={0}
              whileHover={{ scale: 1.025 }}
              whileFocus={{ scale: 1.025 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="hero-image-tile group relative row-span-2 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#C9A84C]"
            >
              <Image src="/images/libertion_tower.webp" alt="Kuwait skyline" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover brightness-[.6] transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 group-focus-visible:scale-110 group-focus-visible:brightness-90" loading="eager" priority/>
            </motion.div>
            <motion.div
              tabIndex={0}
              whileHover={{ scale: 1.035 }}
              whileFocus={{ scale: 1.035 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="hero-image-tile group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#C9A84C]"
            >
              <Image src="/images/inside_making.webp" alt="Coffee bar" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover brightness-[.6] transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 group-focus-visible:scale-110 group-focus-visible:brightness-90" loading="eager" priority/>
            </motion.div>
            <motion.div
              tabIndex={0}
              whileHover={{ scale: 1.035 }}
              whileFocus={{ scale: 1.035 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="hero-image-tile group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[#C9A84C]"
            >
              <Image src="/images/coffe.webp" alt="Latte art" fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover brightness-[.6] transition-all duration-700 group-hover:scale-110 group-hover:brightness-90 group-focus-visible:scale-110 group-focus-visible:brightness-90"/>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
