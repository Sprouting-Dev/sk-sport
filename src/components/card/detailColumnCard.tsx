'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

export interface DetailColumnCardProps {
  sectionTitle?: string
  description: string
  images?: string[]
  tags?: string[]
}

export const DetailColumnCard = ({
  sectionTitle,
  description,
  images = [],
  tags = [],
}: DetailColumnCardProps) => {
  const hasImages = images.length > 0

  return (
    <div className="flex w-full flex-col gap-4">
      {hasImages && (
        <div className="w-full">
          {images.length === 1 ? (
            <div className="relative aspect-video w-full">
              <Image
                src={images[0]}
                alt={sectionTitle || 'service image'}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ) : (
            // Multiple images: choose cols based on count, all in one row
            <div className={cn('grid gap-3', images.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
              {images.map((src, imgIdx) => (
                <div key={src} className="relative aspect-4/3">
                  <Image
                    src={src}
                    alt={`${sectionTitle || 'service'} ${imgIdx + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {sectionTitle && <h2>{sectionTitle}</h2>}
        <p className="body-sm">{description}</p>
        {tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="badge badge-outline border-primary text-primary body-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
