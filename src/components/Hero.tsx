'use client'

import React from 'react'
import { HeroCarousel } from './carousel/HeroCarousel'
import { Button } from './button'
import heroBg3 from '../assets/banner-test3.jpg'
import heroBg2 from '../assets/bannner-test2.jpg'
import heroBg1 from '../assets/d048eb9439e681c322341cf84065711c767aa9b7.png'

import { useTranslations } from 'next-intl'

export const Hero: React.FC = () => {
  const t = useTranslations('Home')
  const carouselImages = [heroBg3, heroBg2, heroBg1]

  return (
    <section className="relative md:h-screen w-full h-fit overflow-hidden bg-neutral-900 text-white">
      <HeroCarousel images={carouselImages} />

      <div className="relative z-10 flex md:h-screen h-fit md:w-full md:max-w-[468px] flex-col justify-center px-6 py-12 lg:px-24 lg:py-24 pointer-events-none bg-black/40 gap-9">
        <div className="max-w-xl flex flex-col pointer-events-auto gap-6">
          <h1 className="h1 leading-[120%] tracking-wider md:leading-[100%] md:tracking-wider">
            <span className="block text-white">{t('Hero.title_part1')}</span>
            <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t('Hero.title_part2')}
            </span>
            <span className="block text-white">{t('Hero.title_part3')}</span>
          </h1>

          <p className="body-sm">{t('Hero.description')}</p>
        </div>
        <Button className="w-[154px] md:w-[190px] text-white">{t('Hero.contact_us')}</Button>
      </div>
    </section>
  )
}
