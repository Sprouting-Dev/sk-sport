import { Rajdhani, Noto_Sans_Thai, Prompt } from 'next/font/google'

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

export const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['600'],
  variable: '--font-prompt',
  display: 'swap',
})
