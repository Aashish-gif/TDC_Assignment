import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import LoaderOverlay from '@/components/LoaderOverlay'
import SplashLoader from '@/components/SplashLoader'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({ variable: '--font-playfair', weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Date Crew Matchmaker',
  description: 'The Date Crew - Matchmaking Dashboard',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`} style={{ backgroundColor: '#FDF8F4' }}>
      <body className="font-sans antialiased bg-[#FDF8F4]">
        <SplashLoader />
        <LoaderOverlay />
        {children}
      </body>
    </html>
  )
}
