'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

export interface ArticleItem {
  id: string | number
  image: string
  date: string
  title: string
  href: string
}

interface ArticleCardProps {
  items: ArticleItem[]
}

const CardItem = ({ image, date, title, href }: Omit<ArticleItem, 'id'>) => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-3 group h-full select-none w-full items-start text-left max-w-full">
      <button
        onClick={() => router.push(href)}
        className="btn btn-link btn-link-typo relative w-full md:h-80 h-48 overflow-hidden rounded-lg bg-base-300 p-0 border-0 focus:outline-none transition-transform active:scale-95 shrink-0"
        draggable={false}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </button>

      <div className="flex flex-col px-1 w-full">
        <span className="body-sm font-medium mb-1 text-left">{date}</span>
        <Link href={href} draggable={false} className="w-full  text-left">
          <h3 className="body-sm leading-snug group-hover:text-primary transition-colors break-words line-clamp-2">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  )
}

export const ArticleCard = ({ items }: ArticleCardProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScroll()
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)

      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [items])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === 'left' ? -280 : 280
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full group/slider">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-35 z-20 text-header-bg/60 transition-all hidden md:block"
        >
          <CaretLeft size={96} strokeWidth={1.5} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 no-scrollbar w-full"
      >
        {items.map((item) => (
          <div key={item.id} className="md:w-66.5 w-40 snap-start shrink-0">
            <CardItem {...item} />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-35 z-20 text-header-bg/60 transition-all hidden md:block"
        >
          <CaretRight size={96} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
