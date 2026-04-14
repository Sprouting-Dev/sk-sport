'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/button'
import { NavKey, NAV_PATHS } from '@/const/navigation'
import { useRouter } from 'next/navigation'

export interface ServiceHeroProps {
  titleLine1: string
  titleLine2?: string
  subtitle?: React.ReactNode
  imageSrc: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  showCta?: boolean
  contentPosition?: 'center' | 'bottom'
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  titleLine1,
  titleLine2,
  subtitle,
  imageSrc,
  imageAlt = 'Hero background',
  ctaLabel = 'Contact Us',
  ctaHref = NAV_PATHS[NavKey.CONTACT_US],
  showCta = true,
  contentPosition = 'center',
}) => {
  const router = useRouter()

  return (
    <section className="relative flex w-full py-16 md:py-40 overflow-hidden bg-hero text-primary-content">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />

      <div className="absolute inset-0 z-10 md:bg-transparent bg-overlay-gradient hero-mobile-overlay" />

      <div
        className={`relative z-20 flex flex-1 flex-col w-full px-4 md:px-6 lg:px-24 ${
          contentPosition === 'bottom'
            ? 'justify-end pb-12 md:pb-16'
            : 'justify-center py-6 md:py-0'
        }`}
      >
        <div className="flex flex-col gap-3 md:gap-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium leading-tight md:leading-tight tracking-wider text-primary-content">
            <span className="block">{titleLine1}</span>
            {titleLine2 && <span className="block">{titleLine2}</span>}
          </h1>

          <div className="flex flex-col gap-4 md:gap-6">
            {subtitle && (
              <p className="font-body text-sm md:text-base font-normal leading-snug tracking-wider text-primary-content/90 max-w-[95%] md:max-w-xl">
                {subtitle}
              </p>
            )}

            {showCta && (
              <div className="mt-2 md:mt-0 hidden md:block">
                <Button
                  variant="gradient"
                  size="md"
                  className="hero-btn-width text-primary-content"
                  onClick={() => router.push(ctaHref)}
                >
                  {ctaLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
