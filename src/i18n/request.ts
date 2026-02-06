import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, locales, type Locale } from './config'

const localeCookieName = 'NEXT_LOCALE'

const resolveLocale = (value?: string | null): Locale | null => {
  if (!value) {
    return null
  }

  const lower = value.toLowerCase()

  if (locales.includes(lower as Locale)) {
    return lower as Locale
  }

  const base = lower.split('-')[0]

  if (locales.includes(base as Locale)) {
    return base as Locale
  }

  return null
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const cookieLocale = resolveLocale(cookieStore.get(localeCookieName)?.value)
  const acceptLanguage = headerStore.get('accept-language') ?? ''
  const headerLocales = acceptLanguage
    .split(',')
    .map((entry: string) => resolveLocale(entry.split(';')[0]?.trim()))
    .filter(Boolean) as Locale[]
  const locale = cookieLocale ?? headerLocales[0] ?? defaultLocale

  const namespaces = ['Nav', 'Home'] as const
  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (namespace) => [
        namespace,
        (await import(`../messages/${locale}/${namespace}.json`)).default,
      ]),
    ),
  )

  return {
    locale,
    messages,
  }
})
