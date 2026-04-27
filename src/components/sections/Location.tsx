export default function Location() {
  return (
    <section id="location" className="py-36 px-14 bg-[#111010] grid md:grid-cols-2 gap-24 items-center">
      <div>
        <div className="flex items-center gap-4 mb-6"><div className="w-8 h-px bg-[#C9A84C]"/><span className="text-[#C9A84C] text-xs tracking-widest uppercase">Find Us</span></div>
        <h2 style={{fontFamily:'Georgia,serif'}} className="text-[clamp(2rem,3vw,3.2rem)] font-normal text-[#F5E6C8] mb-12">Visit <em className="italic text-[#C9A84C]">Us</em></h2>
        {[
          {icon:'📍',label:'Location',value:'Kuwait City, Kuwait\nNear Liberation Tower'},
          {icon:'🕐',label:'Hours',value:'Sat-Thu: 8:00 AM - 11:00 PM\nFriday: 2:00 PM - 11:00 PM'},
          {icon:'📸',label:'Instagram',value:'@umbrella_cofee',href:'https://www.instagram.com/umbrella_cofee/'},
        ].map((d,i) => (
          <div key={i} className="flex gap-6 mb-10 pb-10 border-b border-[#C9A84C]/20">
            <div className="w-11 h-11 border border-[#C9A84C]/20 flex items-center justify-center text-lg flex-shrink-0 bg-[#C9A84C]/08">{d.icon}</div>
            <div>
              <div className="text-xs tracking-widest uppercase text-[#C9A84C] mb-2">{d.label}</div>
              {d.href
                ? <a href={d.href} target="_blank" className="text-sm text-[#C9A84C] no-underline">{d.value}</a>
                : <div className="text-sm text-[#F5E6C8] font-light leading-7 whitespace-pre-line">{d.value}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="relative border border-[#C9A84C]/20 h-96 flex flex-col items-center justify-center gap-5 text-center px-12 bg-[#C9A84C]/05">
        <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"/>
        <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"/>
        <div className="text-5xl">🗺️</div>
        <h3 style={{fontFamily:'Georgia,serif'}} className="text-2xl text-[#F5E6C8] font-normal">Come Find Us</h3>
        <p className="text-sm text-[#F5E6C8]/50 leading-7 font-light">Right in the heart of Kuwait City, with rooftop views of the beautiful skyline.</p>
        <a href="https://maps.google.com/?q=umbrella+coffee+kuwait" target="_blank"
          className="border border-[#C9A84C] text-[#C9A84C] px-10 py-4 text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#090909] transition-all no-underline mt-2">
          Open in Maps
        </a>
      </div>
    </section>
  )
}