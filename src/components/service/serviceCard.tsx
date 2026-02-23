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
        'group relative flex w-full overflow-hidden rounded-xl bg-primary-content shadow-lg transition-all duration-300',
        isHorizontal ? 'flex-col md:flex-row' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isHorizontal ? 'h-31 w-full md:h-auto md:w-1/2' : 'h-31 md:h-60 w-full',
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div
        className={cn(
          'flex flex-col py-2 md:py-4 px-4 md:px-6',
          isHorizontal ? 'md:min-h-75 w-full md:w-1/2' : 'w-full',
        )}
      >
        <h2 className="mb-1 md:mb-3">{title}</h2>
        <p className="body-sm">{description}</p>

        <div className="flex justify-end">
          <Button variant="link" size="sm" onClick={() => router.push(href)}>
            {t(`ReadMore`)}
          </Button>
        </div>
      </div>
    </div>
  )
}
