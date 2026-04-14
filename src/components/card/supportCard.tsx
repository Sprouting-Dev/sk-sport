import React from 'react'
import Image from 'next/image'
import { ButtonLink } from '@/components/button'

export interface SupportCardProps {
  title: string
  image: string
  icon: React.ReactNode
  href: string
  imageAlt?: string
}

export const SupportCard = ({ title, image, icon, href, imageAlt }: SupportCardProps) => {
  return (
    <div className="bg-primary-content group relative flex w-full min-h-159 max-h-197 md:min-h-56 md:max-h-none md:h-56 flex-col justify-end overflow-hidden rounded-lg p-6">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 z-10 support-card-overlay" />
      <div className="relative z-20 flex flex-row items-end justify-between gap-4 md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="shrink-0 text-primary-content">{icon}</div>
          <h3 className="min-w-0 text-primary-content text-shadow-card">{title}</h3>
        </div>
        <div className="shrink-0">
          <ButtonLink href={href} variant="gradient" size="md" className="text-primary-content">
            Learn more
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
