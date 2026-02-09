import React from 'react'
import { rajdhani, notoSansThai } from '@/lib/fonts'
import { Navbar } from '@/components/layout/'
import '@/style/typography.css'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" data-theme="sksport">
      <body className={`${rajdhani.variable} ${notoSansThai.variable}`}>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
