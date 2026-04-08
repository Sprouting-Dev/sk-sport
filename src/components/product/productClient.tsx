'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { FilterTab } from '@/components/portfolio'

export interface ProductItem {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  category?: string | null
  description?: string | null
  imageUrl?: string
}

interface ProductClientProps {
  products: ProductItem[]
}

const ITEMS_PER_PAGE = 9

export function ProductClient({ products = [] }: ProductClientProps) {
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, search])

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category?.toUpperCase()).filter(Boolean)),
    ) as string[]
    return ['ALL', ...unique]
  }, [products])

  const filtered = products.filter((product) => {
    const matchCategory =
      activeTab === 'ALL' || (product.category?.toUpperCase() ?? '') === activeTab
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="w-full bg-header-bg">
      <div className="border-b border-base-content/20 bg-primary-content">
        <FilterTab
          desktopCategories={categories}
          mobileCategories={categories.slice(0, 4)}
          activeCategory={activeTab}
          onCategoryChange={(cat) => {
            setActiveTab(cat)
            setCurrentPage(1)
          }}
          searchQuery={search}
          onSearchChange={(q) => {
            setSearch(q)
            setCurrentPage(1)
          }}
          placeholder="Search products..."
        />
      </div>

      <div className="bg-primary-content px-6 pb-12 md:px-8 md:pb-16">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="body-sm text-subtle">No products match your search.</p>
            <button
              type="button"
              onClick={() => {
                setActiveTab('ALL')
                setSearch('')
              }}
              className="body-sm text-primary underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 pt-6 md:pt-8">
              {paginated.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-sm transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-52 w-full overflow-hidden bg-base-200">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="body-sm text-subtle">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 px-5 py-4">
                    {product.category && (
                      <span className="body-sm text-primary font-semibold uppercase tracking-widest">
                        {product.category}
                      </span>
                    )}
                    <h3 className="text-base-content leading-snug">{product.title}</h3>
                    {product.subtitle && <p className="body-sm text-subtle">{product.subtitle}</p>}
                    {product.description && (
                      <p className="body-sm text-base-content line-clamp-3">
                        {product.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 md:pt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-box border body-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'border-primary bg-gradient-to-r from-primary to-secondary text-primary-content'
                        : 'border-base-300 bg-primary-content text-base-content hover:border-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
