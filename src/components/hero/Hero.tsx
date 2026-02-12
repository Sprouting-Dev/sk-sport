'use client'

import React from 'react'
import { HeroCarousel } from '@/components/carousel/HeroCarousel'
import { Button } from '@/components/button'
import heroBg3 from '@/assets/banner-test3.jpg'
import heroBg2 from '@/assets/bannner-test2.jpg'
import heroBg1 from '@/assets/d048eb9439e681c322341cf84065711c767aa9b7.png'

import { useTranslations } from 'next-intl'

export const Hero: React.FC = () => {
  const t = useTranslations('Home')
  const carouselImages = [heroBg3, heroBg2, heroBg1]

  return (
    <section className="relative w-full hero-wrapper-height h-full max-h-308 overflow-hidden bg-hero text-light">
      <HeroCarousel images={carouselImages} interval={5000} />

      <div className="relative z-10 flex md:h-full h-full md:w-full hero-content-max-w flex-col justify-center px-6 py-12 lg:px-24 lg:py-24 pointer-events-none bg-overlay-40 gap-9">
        <div className="max-w-xl flex flex-col pointer-events-auto gap-6">
          <h1 className="h1 leading-[120%] tracking-wider md:leading-[100%] md:tracking-wider">
            <span className="block text-light">{t('Hero.title_part1')}</span>
            <span className="hero-title-gradient">{t('Hero.title_part2')}</span>
            <span className="block text-light">{t('Hero.title_part3')}</span>
          </h1>

          <p className="body-sm">{t('Hero.description')}</p>
        </div>
        <Button className="hero-btn-width text-light">{t('Hero.contact_us')}</Button>
      </div>
    </section>
  )
}
