'use client'

import React from 'react'
import Image from 'next/image'
import { CategoryBadge } from '@/components/common'

export interface PortfolioHeroProps {
  imageSrc?: string
  category?: string
  title: string
  subtitle?: string
  publishedDate?: string
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({
  imageSrc,
  category,
  title,
  subtitle,
  publishedDate,
}) => {
  return (
    <div className="relative flex w-full h-100 md:h-150 flex-col justify-end overflow-hidden">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-card-left" />

      <div className="relative z-10 w-full px-4 md:px-8 pb-4 md:pb-6 flex flex-col items-start"> 
        {category && (
          <CategoryBadge text={category} className="mb-2 md:mb-6" />
        )}

        <h1 className="text-primary-content mb-2 md:mb-4 max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="body-lg text-primary-content/90 mb-2 md:mb-4">
            {subtitle}
          </p>
        )}

        {publishedDate && (
          <p className="body-sm text-primary-content/70">
            Published: {publishedDate}
          </p>
        )}
      </div>
    </div>
  )
}