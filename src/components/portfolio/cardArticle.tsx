'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

export interface ArticleData {
  id: number | string
  category?: string
  title: string
  subtitle?: string
  description: string
  image?: string
  newest?: boolean
}

export interface CardArticleProps {
  data: ArticleData
  onClick?: () => void
}

export const CardArticle: React.FC<CardArticleProps> = ({ data, onClick }) => {
  const { category, title, subtitle, description, image } = data

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex h-64 w-full overflow-hidden rounded-xl bg-base-300 transition-all duration-300 md:h-98',
        onClick && 'cursor-pointer hover:-translate-y-1',
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          className="inset-0 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-base-300 text-base-content/40">
          <span>No Image</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-base-content/90 via-base-content/50 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-4 md:px-6 pb-1">
        {category && (
          <span className="body-md uppercase tracking-wider text-info">{category}</span>
        )}

        <h3 className="mb-1 text-primary-content">{title}</h3>

        <p className="body-md mb-1 text-primary-content/80">{subtitle}</p>

        <p className="body-sm text-primary-content/70">{description}</p>
      </div>
    </div>
  )
}
