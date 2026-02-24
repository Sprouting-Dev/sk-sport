'use client'

import React from 'react'
import Image from 'next/image'
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
}

export const ServiceCard = ({
  title,
  description,
  image,
  href = '#',
  variant = 'vertical',
}: ServiceCardProps) => {
  const t = useTranslations('Service')
  const router = useRouter()
  const isHorizontal = variant === 'horizontal'

  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300',
        isHorizontal ? 'flex-col md:flex-row bg-primary-content' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isHorizontal ? 'h-31 w-full md:h-auto md:w-1/2' : 'h-52 md:h-60 w-full',
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {!isHorizontal && (
          <>
            <div className="absolute inset-0 bg-gradient-card-left md:hidden" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:hidden">
              <div className="flex items-end justify-between gap-3">
                <div className="flex-1">
                  <p className="font-heading font-semibold text-xl leading-tight text-primary-content mb-1">
                    {title}
                  </p>
                  <p className="body-sm text-primary-content/90">{description}</p>
                </div>
                <div className="shrink-0">
                  <Button variant="gradient" size="sm" onClick={() => router.push(href)}>
                    {t('ReadMore')}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col py-2 md:py-4 px-4 md:px-6 bg-primary-content',
          isHorizontal ? 'md:min-h-75 w-full md:w-1/2' : 'hidden md:flex w-full',
        )}
      >
        <h2 className="mb-1 md:mb-3">{title}</h2>
        <p className="body-sm">{description}</p>
        <div className="flex justify-end">
          <Button variant="link" size="sm" onClick={() => router.push(href)}>
            {t('ReadMore')}
          </Button>
        </div>
      </div>
    </div>
  )
}
