'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArticleCard, type ArticleItem } from '@/components/card'

interface AccomplishmentProps {
  items: ArticleItem[]
}

export const Accomplishment = ({ items }: AccomplishmentProps) => {
  const router = useRouter()

  return (
    <div className="w-full overflow-hidden">
      <div className="mx-auto md:px-10 px-6 md:pt-16 pt-8 md:pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-primary">Our Company’s Accomplishments</h2>
          <button
            className="btn btn-gradient-solid-border btn-sm-typo text-primary md:w-38.5 w-22.5 md:h-12 h-7"
            onClick={() => router.push('')}
          >
            See All
          </button>
        </div>
      </div>
      <div className="w-full md:px-6 px-4">
        <ArticleCard items={items} />
      </div>
    </div>
  )
}
