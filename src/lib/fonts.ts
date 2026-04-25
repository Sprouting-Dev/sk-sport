import { Prompt, Sarabun } from 'next/font/google'

/**
 * Single Sarabun instance (next/font): duplicate `Sarabun()` calls for the same family
 * can break font preloading / dev runtime. Map `--font-heading` and `--font-body` in CSS
 * to `var(--font-sarabun)`.
 */
export const sarabun = Sarabun({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
})

/** Brand gradient name spans (nav / footer company name) */
export const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['600'],
  variable: '--font-prompt',
  display: 'swap',
})
