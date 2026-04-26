'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/cn'

export type RelatedArticleItem = {
  id: string | number
  title: string
  href: string
  image?: string
}

interface RelatedArticleProps {
  title?: string
  articles: RelatedArticleItem[]
  relatedHeadingFontSizePx?: number
  relatedItemTitleFontSizePx?: number
}

export const RelatedArticle = ({
  title = 'บทความที่เกี่ยวข้อง',
  articles,
  relatedHeadingFontSizePx,
  relatedItemTitleFontSizePx,
}: RelatedArticleProps) => {
  const t = useTranslations('Service')
  const router = useRouter()

  return (
    <div className="w-full">
      <p
        className={cn('mb-6', relatedHeadingFontSizePx == null && 'body-lg')}
        style={
          relatedHeadingFontSizePx != null
            ? { fontSize: `${relatedHeadingFontSizePx}px` }
            : undefined
        }
      >
        {title}
      </p>

      <div className="flex flex-col divide-y-2 divide-gray-200">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center gap-4 py-2 md:py-4 first:pt-0">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
              <Image
                src={article.image || '/checker.png'}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center items-start">
              <p
                className={cn(relatedItemTitleFontSizePx == null && 'body-sm')}
                style={
                  relatedItemTitleFontSizePx != null
                    ? { fontSize: `${relatedItemTitleFontSizePx}px` }
                    : undefined
                }
              >
                {article.title}
              </p>

              <Button
                variant="link"
                size="sm"
                onClick={() => router.push(article.href)}
                className="no-underline -ml-3"
              >
                {t(`ReadMore`)}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
