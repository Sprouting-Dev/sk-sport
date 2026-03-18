'use client'

import React from 'react'
import { DetailRowCard } from '@/components/card/detailRowCard'
import { DetailColumnCard } from '@/components/card/detailColumnCard'

export interface ServiceDetailProps {
  serviceTitle: string
  sectionTitle?: string
  detail: string
  images?: string[]
  variant?: 'column' | 'row'
  tags?: string[]
  alignment?: 'left' | 'right'
}

export const ServiceDetail = ({
  serviceTitle,
  sectionTitle,
  detail,
  images = [],
  variant = 'column',
  tags = [],
  alignment = 'left',
}: ServiceDetailProps) => {
  return (
    <section className="w-full">
      {serviceTitle && <h2 className="mb-3 text-gradient">{serviceTitle}</h2>}

      {variant === 'row' ? (
        <DetailRowCard
          sectionTitle={sectionTitle}
          description={detail}
          images={images}
          alignment={alignment}
          tags={tags}
        />
      ) : (
        <DetailColumnCard
          sectionTitle={sectionTitle}
          description={detail}
          images={images}
          tags={tags}
        />
      )}
    </section>
  )
}
