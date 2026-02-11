import React from 'react'
import { Navbar, Footer } from '@/components/layout/'
import { rajdhani, notoSansThai, prompt } from '@/lib/fonts'
import '@/style/typography.css'
import './styles.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} data-theme="sksport">
      <body className={`${rajdhani.variable} ${notoSansThai.variable} ${prompt.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
