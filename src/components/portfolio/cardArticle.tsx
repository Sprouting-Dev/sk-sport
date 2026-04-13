'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

export interface ArticleData {
  id: number | string
  slug?: string
  category?: string
  title: string
  subtitle?: string
  description: string
  image?: string
  newest?: boolean
}

/** Detail route resolves by CMS `slug` only; returns null if missing or whitespace. */
export function portfolioDetailHref(slug?: string | null): string | null {
  const t = typeof slug === 'string' ? slug.trim() : ''
  return t !== '' ? `/portfolio/${t}` : null
}

export interface CardArticleProps {
  data: ArticleData
  onClick?: () => void
}

export const CardArticle: React.FC<CardArticleProps> = ({ data, onClick }) => {
  const { category, title, subtitle, image } = data

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex aspect-[4/5] w-full max-h-[22rem] overflow-hidden rounded-xl bg-base-300 sm:max-h-[24rem] md:aspect-[3/4] md:max-h-[26rem]',
        onClick
          ? 'cursor-pointer transition-transform duration-300 hover:-translate-y-0.5'
          : 'cursor-default',
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-base-300 text-base-content/40">
          <span className="text-sm">No Image</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-content/85 via-base-content/20 to-transparent" />

      <div className="relative z-10 mt-auto flex w-full flex-col gap-1 px-4 pb-4 pt-12 md:gap-1.5 md:px-5 md:pb-5 md:pt-16">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-info md:text-xs">
            {category}
          </span>
        )}

        <h3 className="line-clamp-2 text-base font-medium leading-snug text-primary-content md:text-lg">
          {title}
        </h3>

        {subtitle ? (
          <p className="line-clamp-2 text-xs leading-snug text-primary-content/75 md:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  )
}
