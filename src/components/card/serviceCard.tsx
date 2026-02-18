'use client'

import React from 'react'
import Image from 'next/image'
import { ButtonLink } from '@/components/button'

export interface ServiceCardProps {
  title: string
  description: string
  image: string
  href: string
  buttonText: string
  imageAlt?: string
  alignButton?: 'top' | 'bottom'
}

export const ServiceCard = ({
  title,
  description,
  image,
  href,
  buttonText,
  imageAlt,
  alignButton = 'bottom',
}: ServiceCardProps) => {
  const isTop = alignButton === 'top'

  return (
    <div className="min-h-service-card xl:h-service-card-lg group relative flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="service-card-overlay absolute inset-0 z-10" />

      <div className="relative z-20 flex items-start justify-between gap-4 p-6">
        {isTop && (
          <>
            <div className="service-card-text">
              <h3 className="service-card-title">{title}</h3>
              <p className="service-card-desc">{description}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink href={href} variant="gradient" size="md" className="text-light">
                {buttonText}
              </ButtonLink>
            </div>
          </>
        )}
      </div>

      <div className="relative z-20 flex items-end justify-between gap-4 p-6">
        {!isTop && (
          <>
            <div className="service-card-text">
              <h3 className="service-card-title">{title}</h3>
              <p className="service-card-desc">{description}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink href={href} variant="gradient" size="md" className="text-light">
                {buttonText}
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
