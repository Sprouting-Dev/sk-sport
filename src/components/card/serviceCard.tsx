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
    <div className="w-full aspect-square group relative flex flex-col justify-between overflow-hidden">
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
            <div className="space-y-2 max-w-md">
              <p className="font-heading font-semibold text-2xl md:text-3xl leading-tight text-primary-content text-shadow whitespace-pre-wrap">
                {title}
              </p>
              <p className="body-sm text-primary-content">{description}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink href={href} variant="gradient" size="md" className="text-primary-content">
                {buttonText}
              </ButtonLink>
            </div>
          </>
        )}
      </div>

      <div className="relative z-20 flex items-end justify-between gap-4 p-6">
        {!isTop && (
          <>
            <div className="space-y-2 max-w-md">
              <p className="font-heading font-semibold text-2xl md:text-3xl leading-tight text-primary-content text-shadow whitespace-pre-wrap">
                {title}
              </p>
              <p className="body-sm text-primary-content">{description}</p>
            </div>
            <div className="shrink-0">
              <ButtonLink href={href} variant="gradient" size="md" className="text-primary-content">
                {buttonText}
              </ButtonLink>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
