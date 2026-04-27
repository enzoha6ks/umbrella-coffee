import Navbar   from '@/components/Navbar'
import Hero     from '@/components/sections/Hero'
import About    from '@/components/sections/About'
import Menu     from '@/components/sections/Menu'
import Gallery  from '@/components/sections/Gallery'
import Location from '@/components/sections/Location'
import Footer   from '@/components/Footer'
import { prisma } from '@/lib/db'

type MenuItemRow = {
  id: string
  name: string
  description: string
  price: number
  category: string
  emoji: string | null
  image: string | null
}

export default async function Home() {
  const menuItems = await prisma.menuItem.findMany({
    where: { available: true },
    orderBy: { createdAt: 'asc' },
  })
  const clientMenuItems = menuItems.map((item: MenuItemRow) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    emoji: item.emoji,
    image: item.image ?? undefined,
  }))

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Menu initialItems={clientMenuItems} />
      <Gallery />
      <Location />
      <Footer />
    </main>
  )
}
