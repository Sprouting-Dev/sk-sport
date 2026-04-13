'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  CaretLeftIcon,
  CaretRightIcon,
  FunnelSimpleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react'

export interface ProductItem {
  id: string
  slug: string
  title: string
  subtitle?: string | null
  category?: string | null
  description?: string | null
  imageUrl?: string
  /** Shown in list view; omit when not in CMS yet */
  price?: string | null
}

interface ProductClientProps {
  products: ProductItem[]
}

const ITEMS_PER_PAGE = 9

function categoryKeyToParam(key: string): string {
  if (key === 'OTHER') return 'other'
  return key.toLowerCase().replace(/\s+/g, '-')
}

function paramToCategoryKey(param: string | null): string {
  if (!param || param.trim() === '') return 'ALL'
  const p = param.trim().toLowerCase()
  if (p === 'other') return 'OTHER'
  return p.replace(/-/g, ' ').toUpperCase()
}

function resolveCategoryFilter(
  param: string | null,
  productList: ProductItem[],
): string {
  const key = paramToCategoryKey(param)
  if (key === 'ALL') return 'ALL'
  if (key === 'OTHER') {
    return productList.some((p) => !p.category?.trim()) ? 'OTHER' : 'ALL'
  }
  return productList.some((p) => (p.category?.toUpperCase() ?? '') === key)
    ? key
    : 'ALL'
}

type CategoryGroup = { key: string; label: string; items: ProductItem[] }

function CategoryCarouselRow({
  title,
  products,
  onSeeAll,
}: {
  title: string
  products: ProductItem[]
  onSeeAll?: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [arrows, setArrows] = useState({ left: false, right: false })

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const isLg =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches
    const epsilon = 2
    const { scrollLeft, scrollWidth, clientWidth } = el
    const needsScroll = scrollWidth > clientWidth + epsilon
    const atStart = scrollLeft <= epsilon
    const atEnd = scrollLeft + clientWidth >= scrollWidth - epsilon
    const allowArrows = !isLg || products.length > 4
    setArrows({
      left: allowArrows && needsScroll && !atStart,
      right: allowArrows && needsScroll && !atEnd,
    })
  }, [products.length])

  const productIds = products.map((p) => p.id).join(',')

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(() => updateArrows())
    ro.observe(el)
    el.addEventListener('scroll', updateArrows, { passive: true })
    updateArrows()
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', updateArrows)
    }
  }, [updateArrows, productIds])

  const scrollPage = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-base font-bold uppercase tracking-widest bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent md:text-lg">
          {title}
        </h2>
        {onSeeAll ? (
          <button
            type="button"
            onClick={onSeeAll}
            className="body-sm shrink-0 font-semibold text-primary underline underline-offset-2 hover:opacity-80"
          >
            See All
          </button>
        ) : null}
      </div>
      <div className="relative">
        {arrows.left ? (
          <button
            type="button"
            aria-label="Scroll products left"
            onClick={() => scrollPage(-1)}
            className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-base-200 bg-white text-neutral-900 shadow-md md:h-10 md:w-10 md:-translate-x-1"
          >
            <CaretLeftIcon className="h-5 w-5" weight="bold" />
          </button>
        ) : null}
        {arrows.right ? (
          <button
            type="button"
            aria-label="Scroll products right"
            onClick={() => scrollPage(1)}
            className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-base-200 bg-white text-neutral-900 shadow-md md:h-10 md:w-10 md:translate-x-1"
          >
            <CaretRightIcon className="h-5 w-5" weight="bold" />
          </button>
        ) : null}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-1 no-scrollbar"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-8px)] shrink-0 lg:w-[calc(25%-12px)]"
            >
              <Link
                href={`/product/${product.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full scale-125 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="body-sm text-subtle">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex min-h-0 min-w-0 w-full flex-col px-4 py-3 md:px-5 md:py-4">
                  <h3 className="line-clamp-2 w-full min-w-0 text-sm leading-snug text-base-content lg:text-base">
                    {product.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductClient({ products = [] }: ProductClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [search, setSearch] = useState('')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const filterWrapRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categoryFilter = useMemo(
    () => resolveCategoryFilter(categoryParam, products),
    [categoryParam, products],
  )

  useEffect(() => {
    if (!categoryParam) return
    if (resolveCategoryFilter(categoryParam, products) === 'ALL') {
      router.replace('/product')
    }
  }, [categoryParam, products, router])

  useEffect(() => {
    setCurrentPage(1)
    setMobileExpanded(false)
  }, [search, categoryFilter])

  useEffect(() => {
    if (!filterMenuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (filterWrapRef.current && !filterWrapRef.current.contains(e.target as Node)) {
        setFilterMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [filterMenuOpen])

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category?.toUpperCase()).filter(Boolean)),
    ) as string[]
    return unique.sort()
  }, [products])

  const filtered = products.filter((product) => {
    const matchCategory =
      categoryFilter === 'ALL' || (product.category?.toUpperCase() ?? '') === categoryFilter
    const matchSearch = product.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const groupedByCategory = useMemo((): CategoryGroup[] => {
    const map = new Map<string, ProductItem[]>()
    for (const p of filtered) {
      const key = p.category?.toUpperCase() || 'OTHER'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    const keys = [...map.keys()].sort((a, b) => {
      if (a === 'OTHER') return 1
      if (b === 'OTHER') return -1
      return a.localeCompare(b)
    })
    return keys.map((key) => {
      const items = map.get(key)!
      const label =
        key === 'OTHER' ? 'Other' : (items[0]?.category ?? key)
      return { key, label, items }
    })
  }, [filtered])

  const listDisplay = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    let idx = 0
    const result: { key: string; label: string; items: ProductItem[] }[] = []
    for (const group of groupedByCategory) {
      const groupStart = idx
      const overlapStart = Math.max(start, groupStart)
      const overlapEnd = Math.min(end, groupStart + group.items.length)
      if (overlapStart < overlapEnd) {
        const localStart = overlapStart - groupStart
        const localEnd = overlapEnd - groupStart
        result.push({
          key: group.key,
          label: group.label,
          items: group.items.slice(localStart, localEnd),
        })
      }
      idx += group.items.length
      if (idx >= end) break
    }
    return result
  }, [groupedByCategory, currentPage])

  const listPageRowCount = useMemo(
    () => listDisplay.reduce((n, g) => n + g.items.length, 0),
    [listDisplay],
  )

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <div className="w-full bg-header-bg">
      {/* Control bar */}
      <div className="bg-primary-content px-6 py-6 md:px-8 md:py-8">
        <div className="flex w-full items-center justify-between gap-2 md:gap-4">
          {/* Search field */}
          <div ref={filterWrapRef} className="relative flex min-w-0 flex-1 items-center">
            <div className="flex h-15 w-full max-w-3xl items-center gap-3 rounded-full bg-linear-to-r from-sky-100/95 via-pink-50/90 to-pink-100/95 px-4 shadow-sm ring-1 ring-base-content/10">
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search products..."
                className="body-sm min-w-0 flex-1 border-0 bg-transparent py-2 pl-3 text-left text-base-content outline-none placeholder:text-base-content/40 focus:ring-0"
              />
              <div className="flex shrink-0 items-center gap-2.5">
                <MagnifyingGlassIcon
                  className="h-5 w-5 shrink-0 text-base-content/45"
                  weight="bold"
                  aria-hidden
                />
                <span
                  className="h-5 w-px shrink-0 bg-base-content/25"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setFilterMenuOpen((open) => !open)}
                  aria-expanded={filterMenuOpen}
                  aria-haspopup="listbox"
                  aria-label="Filter by category"
                  className="flex shrink-0 cursor-pointer rounded-full text-base-content/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <FunnelSimpleIcon className="h-5 w-5" weight="bold" aria-hidden />
                </button>
              </div>
            </div>
            {filterMenuOpen && (
              <div
                role="listbox"
                aria-label="Categories"
                className="absolute left-0 top-full z-20 mt-1 min-w-[11rem] rounded-box border border-base-300 bg-primary-content py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="option"
                  aria-selected={categoryFilter === 'ALL'}
                  onClick={() => {
                    router.push('/product')
                    setFilterMenuOpen(false)
                  }}
                  className={`body-sm flex w-full px-3 py-2 text-left hover:bg-base-200 ${
                    categoryFilter === 'ALL' ? 'font-semibold text-primary' : 'text-base-content'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="option"
                    aria-selected={categoryFilter === cat}
                    onClick={() => {
                      router.push(
                        `/product?category=${encodeURIComponent(categoryKeyToParam(cat))}`,
                      )
                      setFilterMenuOpen(false)
                    }}
                    className={`body-sm flex w-full px-3 py-2 text-left uppercase hover:bg-base-200 ${
                      categoryFilter === cat ? 'font-semibold text-primary' : 'text-base-content'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right cluster: view-mode toggle */}
          <div className="ml-1 flex shrink-0 items-center justify-end gap-1 md:ml-2">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center transition-colors md:h-10 md:w-10 ${
                viewMode === 'list' ? 'text-pink-500' : 'text-black'
              }`}
              aria-label="List view"
            >
              <ListIcon size={30} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center transition-colors md:h-10 md:w-10 ${
                viewMode === 'grid' ? 'text-pink-500' : 'text-black'
              }`}
              aria-label="Grid view"
            >
              <SquaresFourIcon size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-primary-content px-6 pb-12 md:px-8 md:pb-16">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="body-sm text-subtle">No products match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                router.push('/product')
              }}
              className="body-sm text-primary underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="flex flex-col gap-10 pt-6 md:gap-12 md:pt-8">
                {categoryFilter === 'ALL'
                  ? groupedByCategory.map((group) => (
                      <CategoryCarouselRow
                        key={group.key}
                        title={group.label}
                        products={group.items}
                        onSeeAll={
                          group.key !== 'OTHER'
                            ? () => {
                                router.push(
                                  `/product?category=${encodeURIComponent(categoryKeyToParam(group.key))}`,
                                )
                              }
                            : undefined
                        }
                      />
                    ))
                  : (
                      <CategoryCarouselRow
                        key={categoryFilter}
                        title={filtered[0]?.category ?? categoryFilter}
                        products={filtered}
                      />
                    )}
              </div>
            ) : (
              <div className="flex flex-col pt-6 md:pt-8">
                {listDisplay.map((group, gIdx) => {
                  const rowBase = listDisplay
                    .slice(0, gIdx)
                    .reduce((s, g) => s + g.items.length, 0)
                  return (
                    <Fragment key={group.key}>
                      <h2
                        className={`inline-block max-w-full text-base font-bold uppercase tracking-widest bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent md:text-lg ${
                          gIdx > 0 ? 'mt-8 md:mt-10' : ''
                        }`}
                      >
                        {group.label}
                      </h2>
                      <div className="mt-2 flex flex-col gap-2 md:gap-3">
                        {group.items.map((product, i) => {
                          const rowOnPage = rowBase + i
                          return (
                            <div
                              key={product.id}
                              className={
                                rowOnPage >= 3 && !mobileExpanded ? 'hidden md:block' : ''
                              }
                            >
                              <Link
                                href={`/product/${product.slug}`}
                                className="group flex items-center gap-4 rounded-box border border-base-300 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md md:gap-5 md:px-5 md:py-5"
                              >
                                <div className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded bg-base-200 md:w-20">
                                  {product.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={product.imageUrl}
                                      alt={product.title}
                                      className="h-full w-full scale-125 object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                      <span className="body-sm text-subtle">—</span>
                                    </div>
                                  )}
                                </div>
                                <h3 className="min-w-0 flex-1 text-base-content leading-snug group-hover:text-primary">
                                  {product.title}
                                </h3>
                                <span className="body-sm shrink-0 font-semibold tabular-nums text-base-content">
                                  {product.price != null && product.price !== ''
                                    ? product.price
                                    : '—'}
                                </span>
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                    </Fragment>
                  )
                })}
              </div>
            )}

            {viewMode === 'list' && !mobileExpanded && listPageRowCount > 3 && (
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

            {viewMode === 'list' && totalPages > 1 && (
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
