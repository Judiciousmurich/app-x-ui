import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import { UserProvider } from '../context/UserContext'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foodies Kitchen - Fresh Meals Delivered',
  description: 'Kenya\'s premier meal subscription service with chef-curated dishes, premium ingredients, and flexible delivery options.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            <div className="min-h-screen bg-cream-50">
              {children}
            </div>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  )
}