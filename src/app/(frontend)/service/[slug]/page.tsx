'use client'

import { useParams } from 'next/navigation'
import { ServiceHero } from '@/components/hero/serviceHero'

function toTitle(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string | string[] }>()
  const slugValue = Array.isArray(slug) ? slug[0] : (slug ?? '')
  const titleLine1 = toTitle(slugValue)

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc="/integrated-sports-installation.png"
        titleLine1={titleLine1}
        showCta={false}
        contentPosition="bottom"
      />
    </main>
  )
}
