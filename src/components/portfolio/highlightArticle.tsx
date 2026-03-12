'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { Badge } from '@/components/common'
import { useRouter } from 'next/navigation'
import { ArticleData } from '@/components/portfolio/cardArticle'
import { cn } from '@/utils/cn'

interface HighlightArticleProps {
  articles: ArticleData[]
}

export const HighlightArticle: React.FC<HighlightArticleProps> = ({ articles = [] }) => {
  const router = useRouter()

  const newestArticles = articles.filter((article) => article.newest === true)
  const [activeId, setActiveId] = useState<string | number | null>(
    newestArticles.length > 0 ? newestArticles[0].id : null
  )

  if (!newestArticles || newestArticles.length === 0) return null
  const currentArticle = newestArticles.find((article) => article.id === activeId) || newestArticles[0]

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <div
        onClick={() => router.push(`/portfolio/${currentArticle.id}`)}
        className={cn(
          'flex flex-col md:flex-row bg-primary-content rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-101 mb-4 md:mb-10',
        )}
      >
        <div className="relative w-full md:w-1/2 h-50 md:h-125">
          <div className="absolute top-3 left-3 md:px-3 md:py-1.5 z-10">
            <Badge />
          </div>

          {currentArticle.image ? (
            <Image
              src={currentArticle.image}
              alt={currentArticle.title}
              fill
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-base-300 text-base-content/40">
              <span className="body-md">No Image</span>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-12 flex flex-col justify-center">
          {currentArticle.category && (
            <div className="mb-4">
              <div className="inline-flex h-7 md:h-10 rounded-lg p-0.25 bg-gradient-to-r from-primary to-secondary">
                <span className="flex h-full w-full items-center justify-center bg-primary-content text-primary body-sm px-4 rounded-lg">
                  {currentArticle.category}
                </span>
              </div>
            </div>
          )}

          <h1 className=" text-base-content mb-3">{currentArticle.title}</h1>

          {currentArticle.subtitle && (
            <p className="body-md text-base-content/80 mb-2 md:mb-4">{currentArticle.subtitle}</p>
          )}

          <p className="body-sm text-base-content/70">{currentArticle.description}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 md:gap-2 mb-8 md:mb-10">
        {newestArticles.map((article) => (
          <Button
            key={article.id}
            shape="circle"
            variant="ghost"
            onClick={() => setActiveId(article.id)}
            aria-label={`Go to slide ${article.title}`}
            className={`transition-all duration-300 ${
              activeId === article.id
                ? 'w-4 h-2 md:w-6 md:h-3 bg-secondary'
                : 'w-2 h-2 md:w-3 md:h-3 bg-primary/50 hover:bg-primary/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
