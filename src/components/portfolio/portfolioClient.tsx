'use client'

import React, { useState, useEffect } from 'react'
import { FilterTab, CardArticle, HighlightArticle, PaginationButton } from '@/components/portfolio'
import { useRouter } from 'next/navigation'
import { ArticleData, portfolioDetailHref } from '@/components/portfolio/cardArticle'

export interface PortfolioClientProps {
  articles: ArticleData[]
  highlightsTitleFontSizePx: number
  sectionTitleFontSizePx: number
  cardTitleFontSizePx: number
}

const ITEMS_PER_PAGE = 9

/** Aligns Payload `tag` (free text) with filter tab labels: trim, uppercase, common plural aliases. */
function canonicalPortfolioTag(value: string | undefined): string {
  const normalized = (value ?? '').trim().toUpperCase().replace(/\s+/g, ' ')
  if (normalized === 'FACILITIES') return 'FACILITY'
  if (normalized === 'VENUES') return 'VENUE'
  if (normalized === 'TRAININGS') return 'TRAINING'
  return normalized
}

export const PortfolioClient: React.FC<PortfolioClientProps> = ({
  articles = [],
  highlightsTitleFontSizePx,
  sectionTitleFontSizePx,
  cardTitleFontSizePx,
}) => {
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, search, articles])

  const filteredArticles = articles.filter((article) => {
    const matchCategory =
      activeTab === 'ALL' ||
      canonicalPortfolioTag(article.category) === canonicalPortfolioTag(activeTab)
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <div className="w-full bg-header-bg">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2 md:px-6 md:pt-10 md:pb-4">
        <h1
          className="tracking-portfolio-highlights mb-5 font-semibold uppercase text-base-content/80 md:mb-8"
          style={{ fontSize: `${highlightsTitleFontSizePx}px` }}
        >
          HIGHLIGHTS
        </h1>
        <HighlightArticle articles={articles} />
      </div>

      <div className="border-b border-base-content/15 bg-primary-content">
        <div className="mx-auto max-w-7xl">
          <FilterTab
            desktopCategories={['ALL', 'VENUE', 'FACILITY', 'TRAINING']}
            mobileCategories={['ALL', 'ARTICLES', 'GALLERY']}
            activeCategory={activeTab}
            onCategoryChange={setActiveTab}
            searchQuery={search}
            onSearchChange={setSearch}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 bg-primary-content">
        <h2
          className="tracking-portfolio-facilities font-semibold uppercase text-base-content/75"
          style={{ fontSize: `${sectionTitleFontSizePx}px` }}
        >
          OUR FACILITIES
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:grid-cols-3 md:gap-6">
          {paginatedArticles.map((item) => {
            const href = portfolioDetailHref(item.slug)
            return (
              <CardArticle
                key={item.id}
                data={item}
                onClick={href ? () => router.push(href) : undefined}
                titleFontSizePx={cardTitleFontSizePx}
              />
            )
          })}
        </div>

        <div className="mt-10 md:mt-14">
          <PaginationButton
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
