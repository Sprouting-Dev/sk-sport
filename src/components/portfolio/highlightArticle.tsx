'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { Badge, CategoryBadge } from '@/components/common'
import { useRouter } from 'next/navigation'
import { ArticleData, portfolioDetailHref } from '@/components/portfolio/cardArticle'
import { cn } from '@/utils/cn'

interface HighlightArticleProps {
  articles: ArticleData[]
}

export const HighlightArticle: React.FC<HighlightArticleProps> = ({ articles = [] }) => {
  const router = useRouter()

  const newestArticles = articles.filter((article) => article.newest === true)
  const [activeId, setActiveId] = useState<string | number | null>(
    newestArticles.length > 0 ? newestArticles[0].id : null,
  )

  if (!newestArticles || newestArticles.length === 0) return null
  const currentArticle =
    newestArticles.find((article) => article.id === activeId) || newestArticles[0]

  const detailHref = portfolioDetailHref(currentArticle.slug)

  const goToArticle = () => {
    if (!detailHref) return
    router.push(detailHref)
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <div
        onClick={goToArticle}
        role={detailHref ? 'link' : undefined}
        tabIndex={detailHref ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            goToArticle()
          }
        }}
        className={cn(
          'mb-5 flex flex-col overflow-hidden rounded-xl bg-primary-content shadow-md transition-shadow md:mb-8 md:flex-row md:items-stretch',
          detailHref ? 'cursor-pointer hover:shadow-lg' : 'cursor-default',
        )}
      >
        <div className="relative aspect-[16/10] w-full shrink-0 md:aspect-auto md:w-[48%] md:min-h-[17rem] lg:min-h-[19rem]">
          <div className="absolute left-3 top-3 z-10 md:left-4 md:top-4">
            <Badge />
          </div>

          {currentArticle.image ? (
            <Image
              src={currentArticle.image}
              alt={currentArticle.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-base-300 text-base-content/40">
              <span className="body-md">No Image</span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col justify-center gap-3 px-5 py-5 md:w-[52%] md:gap-4 md:px-8 md:py-8 lg:px-10 lg:py-10">
          {currentArticle.category && (
            <CategoryBadge text={currentArticle.category} className="w-fit shrink-0 self-start" />
          )}

          <h2 className="text-xl font-medium leading-snug text-base-content md:text-2xl lg:text-3xl">
            {currentArticle.title}
          </h2>

          {currentArticle.subtitle && (
            <p className="line-clamp-2 text-sm leading-relaxed text-base-content/75 md:text-base">
              {currentArticle.subtitle}
            </p>
          )}

          {currentArticle.description && (
            <p className="line-clamp-3 text-sm leading-relaxed text-base-content/65 md:line-clamp-4">
              {currentArticle.description}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-center gap-1.5 md:mb-10 md:gap-2">
        {newestArticles.map((article) => (
          <Button
            key={article.id}
            shape="circle"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              setActiveId(article.id)
            }}
            aria-label={`Go to slide ${article.title}`}
            className={cn(
              'transition-all duration-300',
              activeId === article.id
                ? 'h-2 w-4 bg-secondary md:h-3 md:w-6'
                : 'h-2 w-2 bg-primary/50 hover:bg-primary/70 md:h-3 md:w-3',
            )}
          />
        ))}
      </div>
    </div>
  )
}
