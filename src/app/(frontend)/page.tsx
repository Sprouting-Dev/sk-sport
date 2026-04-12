import { getHomeGlobal } from '@/data'
import { getPortfolioArticles } from '@/data/portfolio'
import {
  Accomplishment,
  AboutCompany,
  ContactSection,
  Gallery,
  OurProducts,
  PartnersSection,
  Services,
} from '@/components/home'
import { CTAFooter } from '@/components/layout'
import { Hero } from '@/components/hero/Hero'
import type { GalleryMedia, Home, PartnerMedia } from '@/payload-types'
import './styles.css'

function resolveMediaUrl(media: string | GalleryMedia | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.url ?? ''
}

function resolvePartnerLogos(
  partners: Home['partners'],
): { id: string; name: string; logoUrl: string }[] {
  if (!partners?.length) return []
  return partners
    .map((p) => {
      if (!p || typeof p === 'string') return null
      const doc = p as PartnerMedia
      const logoUrl = doc.url ?? ''
      if (!logoUrl) return null
      return { id: doc.id, name: doc.name, logoUrl }
    })
    .filter((item): item is { id: string; name: string; logoUrl: string } => item !== null)
}

export default async function HomePage() {
  const [homeData, portfolioArticles] = await Promise.all([getHomeGlobal(), getPortfolioArticles()])

  const partnerLogos = resolvePartnerLogos(homeData.partners)

  const accomplishmentItems = portfolioArticles.slice(0, 5).map((article) => ({
    id: article.id,
    image: resolveMediaUrl(article.sectionImage as string | GalleryMedia | null),
    date: new Date(article.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
    title: article.title,
    href: article.slug ? `/portfolio/${article.slug}` : '/portfolio',
  }))

  return (
    <div className="mx-auto flex min-h-[60vh] w-full flex-col items-center justify-center bg-header-bg">
      <Hero media={homeData.heroMedia} />
      <PartnersSection partners={partnerLogos} />
      <Services />
      <OurProducts />
      <Accomplishment items={accomplishmentItems} />
      <CTAFooter />
      <AboutCompany />
      <ContactSection />
      <Gallery media={homeData.galleryMedia} />
    </div>
  )
}
