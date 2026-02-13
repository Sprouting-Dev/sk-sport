import React from 'react'
import type { Metadata } from 'next'
import { Navbar, Footer, CTAFooter } from '@/components/layout/'
import { ButtonLink } from '@/components/button'
import { rajdhani, notoSansThai, prompt } from '@/lib/fonts'
import '@/style/typography.css'
import './styles.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const locale = await getLocale()
  const messages = await getMessages()
  const isLocalEnv = process.env.NODE_ENV === 'development'

  return (
    <html lang={locale} data-theme="sksport">
      <body className={`${rajdhani.variable} ${notoSansThai.variable} ${prompt.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-20">{children}</main>
          <CTAFooter />
          <Footer />
          {isLocalEnv && (
            <ButtonLink
              href="/example"
              variant="primary"
              className="fixed right-4 bottom-4 z-50"
              shape="circle"
            >
              ex
            </ButtonLink>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
