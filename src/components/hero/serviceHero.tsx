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
    <section className="relative h-150 w-full overflow-hidden bg-hero text-primary-content">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />

      <div className="bg-overlay-gradient absolute inset-0 z-10" />

      <div
        className={`relative z-20 flex h-full flex-col px-6 lg:px-24 ${
          contentPosition === 'bottom' ? 'justify-end pb-10' : 'justify-center'
        }`}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-heading font-medium leading-tight tracking-wider text-primary-content">
            <span className="block">{titleLine1}</span>
            {titleLine2 && <span className="block">{titleLine2}</span>}
          </h1>

          <div className="flex flex-col gap-6">
            {subtitle && (
              <p className="font-body text-base font-normal leading-snug tracking-wider text-primary-content">
                {subtitle}
              </p>
            )}

            {showCta && (
              <Button
                variant="gradient"
                size="md"
                className="hero-btn-width text-primary-content"
                onClick={() => router.push(ctaHref)}
              >
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
