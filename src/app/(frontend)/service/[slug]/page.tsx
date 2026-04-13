import { notFound } from 'next/navigation'
import { ServiceHero } from '@/components/hero/serviceHero'
import { CTAFooter } from '@/components/layout'
import {
  Detail,
  type DetailProps,
  RelatedArticle,
  type RelatedArticleItem,
} from '@/components/common'
import { MoreServices } from '@/components/service'
import { getServiceBySlug, getAllServices } from '@/data/service'
import { getPortfolioArticles } from '@/data/portfolio'
import type { Service, ServiceMedia, GalleryMedia } from '@/payload-types'

const INTEGRATED_SPORTS_INSTALLATION_SLUG = 'integrated-sports-installation'

/** Safety standards block on Integrated Sports Installation only */
function isIntegratedSafetyStandardsSection(slug: string, sectionTitle: string | undefined) {
  if (slug !== INTEGRATED_SPORTS_INSTALLATION_SLUG) return false
  const t = (sectionTitle ?? '').trim()
  return t.includes('ความปลอดภัย') || /\bsafety\b/i.test(t)
}

function mapSectionToDetailProps(
  section: NonNullable<Service['sections']>[number],
): DetailProps & { _id: string } {
  const resolveImageUrl = (media: string | ServiceMedia | null | undefined): string => {
    if (!media || typeof media === 'string') return ''
    return media.url ?? ''
  }

  if (section.variant === 'row') {
    return {
      _id: section.id ?? '',
      detailTitle: '',
      sectionTitle: section.sectionTitle ?? '',
      detail: section.description ?? '',
      variant: 'row',
      alignment: (section.alignment as 'left' | 'right') ?? 'left',
      images: [resolveImageUrl(section.image)],
      tags: [],
    }
  }

  return {
    _id: section.id ?? '',
    detailTitle: '',
    sectionTitle: section.sectionTitle ?? '',
    detail: section.description ?? '',
    variant: 'column',
    images: (section.images ?? []).map((item) => resolveImageUrl(item.image)),
    tags: [],
  }
}

function resolveGalleryUrl(media: string | GalleryMedia | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.url ?? ''
}

function mapServiceToMoreServicesItem(service: Service) {
  const hero = service.hero
  const imageUrl = hero && typeof hero !== 'string' ? (hero.url ?? '') : ''

  return {
    id: service.id,
    title: service.title,
    image: imageUrl,
    href: `/service/${service.slug}`,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [serviceData, allServices, recentPortfolioArticles] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
    getPortfolioArticles(),
  ])

  if (!serviceData) {
    notFound()
  }

  const heroImage =
    serviceData.hero && typeof serviceData.hero !== 'string' ? (serviceData.hero.url ?? '') : ''

  const serviceDetails = (serviceData.sections ?? []).map(mapSectionToDetailProps).map((item) =>
    isIntegratedSafetyStandardsSection(slug, item.sectionTitle)
      ? {
          ...item,
          variant: 'column' as const,
          images: (item.images ?? []).filter((url) => Boolean(url)),
          imagePresentation: 'certificate' as const,
        }
      : item,
  )

  const moreServices = allServices.map(mapServiceToMoreServicesItem)

  const relatedArticles: RelatedArticleItem[] = recentPortfolioArticles
    .slice(0, 4)
    .map((article) => ({
      id: article.id,
      title: article.title,
      href: article.slug ? `/portfolio/${article.slug}` : '/portfolio',
      image: resolveGalleryUrl(article.sectionImage as string | GalleryMedia | null),
    }))

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc={heroImage}
        titleLine1={serviceData.title}
        showCta={false}
        contentPosition="bottom"
      />
      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="w-full py-6 md:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3">
            <div className="order-1 lg:order-1 lg:col-span-2 px-4 flex flex-col gap-8">
              {serviceDetails.map((item, index) => (
                <Detail key={item._id || index} {...item} />
              ))}
            </div>

            <div className="order-4 mt-8 px-4 lg:order-2 lg:col-span-1 lg:mt-0">
              {relatedArticles.length > 0 && <RelatedArticle articles={relatedArticles} />}
            </div>

            <div className="order-2 pt-4 lg:order-3 col-span-3">
              <CTAFooter variant="light" />
            </div>

            <div className="order-3 w-full pt-4 pb-8 px-4 md:pb-16 lg:order-4 lg:col-span-3 lg:pt-8">
              <MoreServices services={moreServices} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
