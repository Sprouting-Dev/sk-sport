'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, ListIcon, SquaresFourIcon } from '@phosphor-icons/react'

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
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    setCurrentPage(1)
    setMobileExpanded(false)
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
      {/* Control bar */}
      <div className="border-b border-base-content/20 bg-primary-content px-6 py-4 md:px-8">
        {/* Main row: left cluster + right cluster */}
        <div className="flex items-center gap-3">
          {/* Left cluster: search + filter tabs */}
          <div className="flex flex-1 items-center gap-3 min-w-0">
            {/* Search */}
            <div className="relative w-full max-w-xs shrink-0">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50"
                weight="bold"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search products..."
                className="body-sm w-full border border-base-content/30 bg-primary-content h-10 pl-9 pr-3 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Category filter tabs — desktop only */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveTab(cat)
                    setCurrentPage(1)
                  }}
                  className={`body-sm h-10 px-4 whitespace-nowrap border transition-colors ${
                    activeTab === cat
                      ? 'border-primary bg-linear-to-r from-primary to-secondary text-primary-content'
                      : 'border-base-content/30 bg-primary-content text-base-content/50 hover:border-primary hover:text-base-content'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right cluster: view-mode toggle — desktop only */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                viewMode === 'list'
                  ? 'border-primary text-primary'
                  : 'border-base-content/30 text-base-content/50 hover:border-primary hover:text-base-content'
              }`}
              aria-label="List view"
            >
              <ListIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                viewMode === 'grid'
                  ? 'border-primary text-primary'
                  : 'border-base-content/30 text-base-content/50 hover:border-primary hover:text-base-content'
              }`}
              aria-label="Grid view"
            >
              <SquaresFourIcon size={18} />
            </button>
          </div>
        </div>

        {/* Category filter tabs — mobile only */}
        <div className="flex md:hidden items-center gap-1 mt-3 overflow-x-auto no-scrollbar">
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveTab(cat)
                setCurrentPage(1)
              }}
              className={`body-sm h-8 px-3 whitespace-nowrap border transition-colors ${
                activeTab === cat
                  ? 'border-primary bg-linear-to-r from-primary to-secondary text-primary-content'
                  : 'border-base-content/30 bg-primary-content text-base-content/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8 pt-6 md:pt-8">
              {paginated.map((product, index) => (
                <div
                  key={product.id}
                  className={index >= 3 && !mobileExpanded ? 'hidden md:block' : ''}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-36 w-full overflow-hidden bg-base-200">
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
                      {product.subtitle && (
                        <p className="body-sm text-subtle">{product.subtitle}</p>
                      )}
                      {product.description && (
                        <p className="body-sm text-base-content line-clamp-3">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {!mobileExpanded && paginated.length > 3 && (
              <div className="flex justify-center pt-6 md:hidden">
                <button
                  type="button"
                  onClick={() => setMobileExpanded(true)}
                  className="btn-gradient-solid-border body-sm font-semibold px-8 h-10 text-primary"
                >
                  More
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8 md:pt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-box border body-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'border-primary bg-linear-to-r from-primary to-secondary text-primary-content'
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
