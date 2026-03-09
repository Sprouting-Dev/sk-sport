'use client'

import React, { useState } from 'react'
import { FilterTab, CardArticle } from '@/components/portfolio'
import { useRouter } from 'next/navigation'

const Articles = [
  {
    id: 1,
    categories: 'FACILITY',
    title: 'Aquatic Center',
    subtitle: 'Olympic-Standard Pool',
    description:
      'Championship swimming and diving facilities meet international competition standards.',
    image: '/portfolio-article-1.jpg',
  },
  {
    id: 2,
    categories: 'TRAINING',
    title: 'Fitness Center',
    subtitle: 'Modern Gym Facilities',
    description:
      'A comprehensive fitness facility with the latest equipment and expert trainers.',
    image: '/portfolio-article-2.png',
  },
  {
    id: 3,
    categories: 'FACILITY',
    title: 'Multi-Sport Hall',
    subtitle: 'Versatile Indoor Space',
    description:
      'A flexible venue hosting volleyball, badminton, and other indoor sports.',
    image: '/portfolio-article-3.png',
  },
  {
    id: 4,
    categories: 'VENUE',
    title: 'Tennis Courts',
    subtitle: 'Professional Clay & Hard Courts',
    description:
      'Multiple professional-grade tennis courts with night lighting and spectator seating.',
    image: '/portfolio-article-1.jpg',
  },
  {
    id: 5,
    categories: 'TRAINING',
    title: 'Yoga Studio',
    subtitle: 'Mind & Body Wellness',
    description:
      'Peaceful studio space for yoga, pilates, and meditation classes.',
    image: '/portfolio-article-2.png',
  },
  {
    id: 6,
    categories: 'VENUE',
    title: 'Soccer Field',
    subtitle: 'FIFA Standard Pitch',
    description:
      'Full-size soccer field with premium turf and professional lighting system.',
    image: '/portfolio-article-3.png',
  },
  {
    id: 7,
    categories: 'FACILITY',
    title: 'Running Track',
    subtitle: '400m Olympic Track',
    description:
      'Professional 8-lane running track with rubberized surface for optimal performance.',
    image: '/portfolio-article-1.jpg',
  },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')

  const filteredArticles = Articles.filter((article) => {
    const matchCategory = activeTab === 'ALL' || article.categories === activeTab
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const router = useRouter()

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
          {filteredArticles.map((article) => (
            <CardArticle
              key={article.id}
              categories={article.categories}
              title={article.title}
              subtitle={article.subtitle}
              description={article.description}
              image={article.image}
              onClick={() => router.push(`/portfolio/${article.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
