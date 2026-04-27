'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500 sm:px-10 md:px-14 ${scrolled ? 'py-4 bg-[#090909]/95 border-b border-[#C9A84C]/20 backdrop-blur-md' : 'py-7'}`}>
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E8C96A"/></linearGradient></defs>
            <path d="M20 6 C11 6 5 12.5 5 20 L35 20 C35 12.5 29 6 20 6Z" fill="url(#g1)"/>
            <line x1="20" y1="20" x2="20" y2="34" stroke="url(#g1)" strokeWidth="1.5"/>
            <path d="M13 34 Q20 30.5 27 34" stroke="url(#g1)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          <span style={{fontFamily:'Georgia,serif'}} className="text-[#F5E6C8] tracking-widest uppercase text-sm">Umbrella Coffee</span>
        </Link>
        <ul className="hidden md:flex gap-10 list-none">
          {['about','menu','gallery','location'].map(s => (
            <li key={s}>
              <a href={`#${s}`} className="text-[#C9A84C]/60 text-xs tracking-widest uppercase hover:text-[#C9A84C] transition-colors">{s}</a>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen(true)} className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1" aria-label="Open navigation">
          <motion.span whileTap={{ scaleX: 0.7 }} className="w-6 h-px bg-[#F5E6C8] block"/>
          <motion.span whileTap={{ scaleX: 0.9 }} className="w-6 h-px bg-[#F5E6C8] block"/>
          <motion.span whileTap={{ scaleX: 0.55 }} className="w-6 h-px bg-[#F5E6C8] block"/>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[600] bg-[#090909]/99"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              className="absolute bottom-0 right-0 top-0 flex w-[86%] max-w-sm flex-col justify-center gap-8 border-l border-[#C9A84C]/20 bg-[#111010] px-8"
            >
              <button onClick={() => setOpen(false)} className="absolute right-8 top-8 border-0 bg-transparent text-3xl text-[#C9A84C] cursor-pointer" aria-label="Close navigation">x</button>
              {['about','menu','gallery','location'].map((s, i) => (
                <motion.a
                  key={s}
                  href={`/#${s}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.07, ease: 'easeOut' }}
                  whileTap={{ x: 8, color: '#C9A84C' }}
                  style={{fontFamily:'Georgia,serif'}}
                  className="text-5xl text-[#F5E6C8] italic hover:text-[#C9A84C] transition-colors no-underline capitalize"
                >
                  {s}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
