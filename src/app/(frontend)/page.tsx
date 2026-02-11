'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ButtonLink } from '@/components/button'
import { ArticleCard } from '@/components/card'
import { Hero } from '@/components/hero/Hero'
import ProductSection from '@/components/home/ProductSection'
import './styles.css'

const blogPosts = [
  { 
    id: 1, 
    image: '/Article1.png',
    date: 'July 2025', 
    title: 'Asia Games Opening Ceremony', 
    href: '#' 
  },
  { 
    id: 2, 
    image: '/Article2.png', 
    date: 'July 2025', 
    title: 'Title of the image.', 
    href: '#' 
  },
  { 
    id: 3, 
    image: '/Article3.png', 
    date: 'July 2025', 
    title: 'with Thai goverment', 
    href: '#' 
  },
  { 
    id: 4, 
    image: '/Article4.png', 
    date: 'July 2025', 
    title: 'Title of the image.', 
    href: '#' 
  },
  { 
    id: 5, 
    image: '/Article4.png', 
    date: 'July 2025', 
    title: 'Title of the image.', 
    href: '#' 
  },
]

export default function HomePage() {
  const router = useRouter()
  
  return ( 
    <div className="mx-auto flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <Hero />
      <ProductSection />
      <h1 className="h1">Welcome</h1>
      <p className="body-md text-base-content/80">View theme colors and typography examples.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/example" variant="primary">
          Open examples
        </ButtonLink>
      </div>
      <p className="body-md text-base-content/80">
        View theme colors and typography examples.
      </p>
      <Link className="btn btn-primary btn-lg-typo" href="/example">
        Open examples
      </Link>

      {/* Article Card */}
      <div className="container mx-auto px-4 md:pt-16 pt-8 md:pb-8">
        <div className="flex items-center justify-between">
          <div className="h2 text-primary">
            Our Company’s Accomplishments
          </div>
          <button 
            className="btn btn-gradient-solid-border btn-sm-typo text-primary md:w-[9.625rem] w-[5.625rem] md:h-12 h-7"
            onClick={() => router.push('')}
          >
            See All
          </button>
        </div>
      </div>
      <div className="w-full">
        <ArticleCard items={blogPosts} />
      </div>
      
    </div>
  )
}
