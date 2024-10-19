import './globals.css'
import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { ReduxProvider } from '../lib/redux/provider'

// Actions
import { getCookie, setCookie } from './actions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Next.js Project',
  description: 'Created with Next.js, Redux, and Tailwind CSS'
}
export default async function RootLayout({
  children, ...req
}: Readonly<{
  children: React.ReactNode,
}>) {
  const theme = await getCookie('theme');
  console.log(theme);

  return (
    <html className={theme?.value ? theme.value : "white"} lang="en">
      <body className={inter.className}>
        <div>
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  )
}