import Navbar   from '@/components/Navbar'
import Hero     from '@/components/sections/Hero'
import About    from '@/components/sections/About'
import Menu     from '@/components/sections/Menu'
import Gallery  from '@/components/sections/Gallery'
import Location from '@/components/sections/Location'
import Footer   from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Menu initialItems={[]} />
      <Gallery />
      <Location />
      <Footer />
    </main>
  )
}