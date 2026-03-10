'use client'

import React, { useState } from 'react'
import { FilterTab, CardArticle } from '@/components/portfolio'
import { useRouter } from 'next/navigation'
import { ArticleData } from '@/components/portfolio/cardArticle'

export interface PortfolioClientProps {
  articles: ArticleData[]
}

export const PortfolioClient: React.FC<PortfolioClientProps> = ({ articles = [] }) => {
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')
  const router = useRouter()

  const filteredArticles = articles.filter((article) => {
    const matchCategory = activeTab === 'ALL' || article.categories === activeTab
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="w-full bg-header-bg">
      <div className="border-b border-base-content/20">
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

      <div className="p-6 md:p-8">
        <h2>OUR FACILITIES</h2>
        <div className="mt-6 md:mt-8 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredArticles.map((item) => (
            <CardArticle
              key={item.id}
              data={item}
              onClick={() => router.push(`/portfolio/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}