export default function Footer() {
  return (
    <footer className="px-14 pt-20 pb-10 border-t border-[#C9A84C]/20 bg-[#090909] grid grid-cols-1 md:grid-cols-3 gap-16">
      <div>
        <span style={{fontFamily:'Georgia,serif'}} className="text-[#F5E6C8] tracking-widest uppercase text-sm block mb-4">Umbrella Coffee</span>
        <p className="text-sm text-[#F5E6C8]/40 leading-8 max-w-xs font-light">Luxury specialty coffee crafted with precision in the heart of Kuwait.</p>
      </div>
      <div>
        <h4 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-6">Navigate</h4>
        <ul className="flex flex-col gap-3 list-none">
          {[['#about','About Us'],['#menu','Our Menu'],['#gallery','Gallery'],['#location','Find Us']].map(([href,label]) => (
            <li key={href}><a href={href} className="text-sm text-[#F5E6C8]/40 hover:text-[#C9A84C] transition-colors font-light no-underline">{label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-6">Connect</h4>
        <p className="text-sm text-[#F5E6C8]/40 leading-8 font-light">
          Instagram<br/>
          <a href="https://www.instagram.com/umbrella_cofee/" target="_blank" className="text-[#C9A84C] no-underline">@umbrella_cofee</a><br/><br/>
          Kuwait City, Kuwait
        </p>
      </div>
      <div className="md:col-span-3 flex justify-between items-center pt-8 border-t border-[#C9A84C]/10">
        <span className="text-xs text-[#F5E6C8]/20 tracking-widest uppercase">2025 Umbrella Coffee</span>
        <span style={{fontFamily:'Georgia,serif'}} className="italic text-[#C9A84C] text-sm">Crafted with love in Kuwait</span>
      </div>
    </footer>
  )
}