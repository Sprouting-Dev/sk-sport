'use client'

import React from 'react'
import Link from 'next/link'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export interface NavArticleItem {
  slug: string
  title: string
}

export interface PageNavigationProps {
  currentSlug: string
  allArticles: NavArticleItem[]
}

export const PageNavigation = ({ currentSlug, allArticles }: PageNavigationProps) => {
  if (!allArticles || allArticles.length <= 1) return null

  const currentIndex = allArticles.findIndex(article => article.slug === currentSlug)

  if (currentIndex === -1) return null

  const prevIndex = (currentIndex - 1 + allArticles.length) % allArticles.length
  const nextIndex = (currentIndex + 1) % allArticles.length

  const prevArticle = allArticles[prevIndex]
  const nextArticle = allArticles[nextIndex]

  return (
    <div className="w-full flex items-center justify-between border-y border-base-content/10 py-4 md:py-6">
      <div className="flex-1 flex justify-start">
        <Link 
          href={`/portfolio/${prevArticle.slug}`} 
          className="group flex items-center gap-1 md:gap-3 transition-all hover:-translate-x-1"
        >
          <CaretLeftIcon className="w-4 h-4 md:w-5 md:h-5 text-base-content group-hover:text-primary transition-colors" weight="bold" />
          <div className="flex flex-col items-start">
            <span className="text-xs font-body text-base-content/80 uppercase group-hover:text-primary transition-colors">
              Previous
            </span>
            <span className="body-sm text-base-content group-hover:text-primary transition-colors">
              บทความก่อนหน้า
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex justify-end">
        <Link 
          href={`/portfolio/${nextArticle.slug}`} 
          className="group flex items-center gap-1 md:gap-3 transition-all hover:translate-x-1 text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs font-body text-base-content/80 uppercase group-hover:text-primary transition-colors">
              Next
            </span>
            <span className="body-sm text-base-content group-hover:text-primary transition-colors">
              บทความถัดไป
            </span>
          </div>
          <CaretRightIcon className="w-4 h-4 md:w-5 md:h-5 text-base-content group-hover:text-primary transition-colors" weight="bold" />
        </Link>
      </div>
    </div>
  )
}