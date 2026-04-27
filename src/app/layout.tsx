import type { Metadata } from 'next'
import { Playfair_Display, Jost } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Umbrella Coffee – Kuwait',
  description: 'Specialty coffee crafted with love in the heart of Kuwait City.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
      <body className="bg-[#090909] text-[#F5E6C8] font-jost overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}