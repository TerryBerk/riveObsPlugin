import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rive OBS Plugin',
  description: 'Interactive Rive animations for OBS Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isObsPage = pathname.includes('/obs')

  if (isObsPage) {
    return (
      <html lang="en">
        <body className={`${inter.className} transparent`}>
          {children}
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-900 text-white p-4">
            <h1 className="text-2xl font-bold">Rive OBS Plugin</h1>
          </header>
          <main className="flex-1 container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2024 Rive OBS Plugin. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
} 