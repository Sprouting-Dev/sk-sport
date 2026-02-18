import React from 'react'
import Image from 'next/image'

export interface SupportCardProps {
  title: string
  image: string
  icon: React.ReactNode
  imageAlt?: string
}

export const SupportCard = ({ title, image, icon, imageAlt }: SupportCardProps) => {
  return (
    <div className="bg-light group relative flex w-full h-28 md:h-full md:aspect-square flex-col justify-end overflow-hidden rounded-lg p-3 md:p-9">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 z-10 support-card-overlay" />
      <div className="relative z-20 flex items-center gap-4">
        <div className="text-primary-content">{icon}</div>
        <h3 className="text-primary-content text-shadow-card">{title}</h3>
      </div>
    </div>
  )
}
