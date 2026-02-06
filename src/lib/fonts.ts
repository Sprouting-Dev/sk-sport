import { Rajdhani, Noto_Sans_Thai } from 'next/font/google'

export const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-heading',
  display: 'swap',
})

export const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
