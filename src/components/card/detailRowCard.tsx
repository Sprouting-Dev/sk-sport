'use client'

import React from 'react'
import Image from 'next/image'

export interface DetailRowCardProps {
  sectionTitle?: string
  description: string
  images?: string[]
  alignment?: 'left' | 'right'
  tags?: string[]
}

export const DetailRowCard = ({
  sectionTitle,
  description,
  images = [],
  alignment = 'left',
  tags = [],
}: DetailRowCardProps) => {
  const hasImages = images.length > 0
  const isImageLeft = alignment === 'left'

  const textBlock = (
    <div className="flex flex-1 flex-col gap-3">
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
  )

  const imageBlock = hasImages ? (
    <div className="w-full flex-1">
      {images.length === 1 ? (
        <div className="relative aspect-4/3 w-full">
          <Image
            src={images[0]}
            alt={sectionTitle || 'service image'}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
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
  ) : null

  return (
    <div className="flex w-full flex-col gap-5 md:flex-row md:items-start md:gap-8">
      {isImageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  )
}
