import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '../lib/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Next.js Project',
  description: 'Created with Next.js, Redux, and Tailwind CSS'
}
export default function RootLayout({
  children, ...req
}: {
  children: React.ReactNode,
  req: any
}) {
  return (
    <html className='white' lang="en">
      <body className={inter.className}>
          <div>
          <ReduxProvider>{children}</ReduxProvider>
          </div>
      </body>
    </html>
  )
}