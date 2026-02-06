import React from 'react'
import { rajdhani, notoSansThai } from '@/lib/fonts'
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
        <main>{children}</main>
      </body>
    </html>
  )
}
