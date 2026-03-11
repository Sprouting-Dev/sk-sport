'use client'

import React from 'react'
import { HeroCarousel } from '@/components/carousel/HeroCarousel'
import { Button } from '@/components/button'
import type { Home } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { NavKey, NAV_PATHS } from '@/const/navigation'
import { useRouter } from 'next/navigation'

export type HeroVariant = 'default' | 'contact'

interface HeroProps {
  media?: Home['heroMedia']
  variant?: HeroVariant
  title?: string
  description?: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({ media, variant = 'default', title, description }) => {
  const t = useTranslations('Home')

  const router = useRouter()

  const carouselImages = React.useMemo(() => {
    if (media && media.length > 0) {
      return media
        .map((item) => {
          if (typeof item === 'string') return null
          return {
            src: item.url || '',
            alt: item.alt,
            id: item.id,
          }
        })
        .filter((item) => item && item.src) as { src: string; alt: string; id: string }[]
    }
    return []
  }, [media])

  const isContact = variant === 'contact'

  return (
    <section className="relative w-full hero-wrapper-height h-full max-h-308 overflow-hidden bg-hero text-primary-content">
      <HeroCarousel images={carouselImages} interval={5000} />

      <div 
        className={`relative z-10 flex w-full pointer-events-none bg-overlay-40 ${
          isContact 
            ? 'h-full flex-col items-center justify-center text-center px-4' 
            : 'md:h-full h-full md:w-full hero-content-max-w flex-col justify-center px-6 py-12 lg:px-24 lg:py-24 gap-9'
        }`}
      >
        {isContact ? (
          <div className="flex flex-col items-center gap-4 pointer-events-auto">
            {title && (
              <h1 className="h1 tracking-wider drop-shadow-md">
                {title}
              </h1>
            )}
            {description && (
              <div className="body-md md:body-lg max-w-2xl text-primary-content/90 drop-shadow-sm">
                {description}
              </div>
            )}
          </div>
        ) : (
          <>
        <div className="max-w-xl flex flex-col pointer-events-auto gap-6">
          <h1 className="h1 leading-[120%] tracking-wider md:leading-[100%] md:tracking-wider">
            <span className="block text-primary-content">{t('Hero.title_part1')}</span>
            <span className="hero-title-gradient">{t('Hero.title_part2')}</span>
            <span className="block text-primary-content">{t('Hero.title_part3')}</span>
          </h1>

          <p className="body-sm">{t('Hero.description')}</p>
        </div>
        <Button
          variant="gradient"
          onClick={() => router.push(NAV_PATHS[NavKey.CONTACT_US])}
          className="hero-btn-width text-primary-content cursor-pointer pointer-events-auto"
        >
          {t('Hero.contact_us')}
        </Button>
        </>
        )}
      </div>
    </section>
  )
}
