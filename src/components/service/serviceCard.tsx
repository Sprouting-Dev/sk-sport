'use client'

import React from 'react'

import { Button } from '@/components/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

export type ServiceCardProps = {
  title: string
  description: string
  image: string
  href?: string
  variant?: 'vertical' | 'horizontal'
  /** Optional (px; clamped at call site) — services listing only when passed. */
  titleFontSizePx?: number
  bodyFontSizePx?: number
}

export const ServiceCard = ({
  title,
  description,
  image,
  href = '#',
  variant = 'vertical',
  titleFontSizePx,
  bodyFontSizePx,
}: ServiceCardProps) => {
  const t = useTranslations('Service')
  const router = useRouter()
  const isHorizontal = variant === 'horizontal'

  return (
    <div
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 bg-primary-content',
        isHorizontal ? 'md:flex-row md:min-h-88 lg:min-h-100' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden shrink-0',
          isHorizontal ? 'h-48 w-full md:h-full md:w-2/5 lg:w-1/2' : 'h-48 md:h-56 lg:h-60 w-full',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col py-4 px-4 md:py-5 md:px-5 lg:py-6 lg:px-6',
          isHorizontal ? 'w-full md:w-3/5 lg:w-1/2' : 'w-full',
        )}
      >
        <h2
          className="mb-2 md:mb-3 font-semibold line-clamp-2"
          style={titleFontSizePx != null ? { fontSize: `${titleFontSizePx}px` } : undefined}
        >
          {title}
        </h2>
        <p
          className={cn(
            bodyFontSizePx == null && 'body-sm',
            'text-base-content/80 mb-4',
            isHorizontal
              ? 'line-clamp-2 md:line-clamp-4 lg:line-clamp-5'
              : 'line-clamp-2 md:line-clamp-3 lg:line-clamp-4',
          )}
          style={bodyFontSizePx != null ? { fontSize: `${bodyFontSizePx}px` } : undefined}
        >
          {description}
        </p>
        <div className="flex justify-end mt-auto pt-2">
          <Button variant="link" size="sm" onClick={() => router.push(href)}>
            {t('ReadMore')}
          </Button>
        </div>
      </div>
    </div>
  )
}
