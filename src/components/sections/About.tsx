'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="grid bg-[#111010] px-6 py-28 sm:px-10 md:px-14 lg:grid-cols-2 lg:py-36">
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="relative min-h-[520px] overflow-hidden lg:min-h-[640px]"
      >
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute left-0 top-12 z-20 h-[390px] w-[72%] max-w-[330px] overflow-hidden sm:left-8 sm:w-[330px] lg:left-2 xl:left-12"
        >
          <Image src="/images/outside.webp" alt="Cafe exterior" fill sizes="(max-width:768px) 72vw, 330px" className="object-cover brightness-[.82] transition-transform duration-700 hover:scale-110"/>
        </motion.div>
        <div className="absolute left-4 top-8 z-10 h-[390px] w-[72%] max-w-[330px] border border-[#C9A84C]/80 sm:left-12 sm:w-[330px] lg:left-6 xl:left-16"/>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="absolute bottom-16 right-0 z-30 h-[250px] w-[46%] max-w-[210px] overflow-hidden outline outline-4 outline-[#111010] sm:right-10 sm:w-[210px]"
        >
          <Image src="/images/siting_area.webp" alt="Seating area" fill sizes="210px" className="object-cover brightness-[.74] transition-transform duration-700 hover:scale-110"/>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ duration: 0.65, delay: 0.25, ease: 'easeOut' }}
          className="absolute bottom-2 left-12 z-30 h-[160px] w-[44%] max-w-[220px] overflow-hidden border border-[#C9A84C]/30 sm:left-24 sm:w-[220px]"
        >
          <Image src="/images/potes_outside.webp" alt="Outdoor coffee setting" fill sizes="220px" className="object-cover brightness-[.72] transition-transform duration-700 hover:scale-110"/>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
        className="flex flex-col justify-center py-12 lg:px-10 lg:py-14 xl:px-14"
      >
        <div className="mb-6 flex items-center gap-4"><div className="h-px w-8 bg-[#C9A84C]"/><span className="text-xs uppercase tracking-widest text-[#C9A84C]">Our Story</span></div>
        <h2 style={{fontFamily:'Georgia,serif'}} className="mb-7 text-[clamp(2.25rem,7vw,3.4rem)] font-normal leading-tight text-[#F5E6C8] lg:text-[clamp(2.5rem,3.5vw,3.4rem)]">More Than<br/>Just <em className="italic text-[#C9A84C]">Coffee</em></h2>
        <p className="mb-8 max-w-xl text-sm font-light leading-8 text-[#F5E6C8]/62">Umbrella Coffee is built around warm specialty drinks, relaxed seating, and small details that make a quick coffee feel like a proper pause. From signature lattes to desserts and cold drinks, every cup is crafted for comfort, flavor, and a little everyday luxury.</p>
        <a href="https://www.instagram.com/umbrella_cofee/" target="_blank" rel="noreferrer" className="mb-12 w-fit border-b border-[#C9A84C]/35 pb-1 text-xs uppercase tracking-widest text-[#C9A84C] no-underline transition-colors hover:text-[#F5E6C8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A84C]">Follow @umbrella_cofee</a>
        <div className="grid grid-cols-1 gap-px border border-[#C9A84C]/20 bg-[#C9A84C]/20 sm:grid-cols-3">
          {[['100%','Specialty Beans'],['Daily','Fresh Moments'],['Kuwait','Local Warmth']].map(([num,label],i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="bg-[#111010] p-6"
            >
              <div style={{fontFamily:'Georgia,serif'}} className="text-3xl leading-none text-[#C9A84C]">{num}</div>
              <div className="mt-3 text-xs uppercase tracking-widest text-[#F5E6C8]/42">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
