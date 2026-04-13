import { getAboutGlobal } from '@/data/about'
import { getHomeGlobal } from '@/data/home'
import { getPortfolioArticles } from '@/data/portfolio'
import { getAllServices } from '@/data/service'
import AboutHero from '@/components/about/aboutHero'
import AboutHistory from '@/components/about/aboutHistory'
import AboutMissionVision from '@/components/about/aboutMissionVision'
import AboutFounder from '@/components/about/aboutFounder'
import AboutFeaturedProjectsTeaser from '@/components/about/aboutFeaturedProjectsTeaser'
import AboutServicesTeaser from '@/components/about/aboutServicesTeaser'
import AboutProductsTeaser from '@/components/about/aboutProductsTeaser'
import AboutPartners from '@/components/about/aboutPartners'
import type { GalleryMedia, PortfolioArticle } from '@/payload-types'

function resolveSectionImageUrl(
  sectionImage: PortfolioArticle['sectionImage'],
): string | undefined {
  if (!sectionImage || typeof sectionImage === 'string') return undefined
  return (sectionImage as GalleryMedia).url ?? undefined
}

function excerptFromArticle(a: PortfolioArticle): string | null {
  const sub = a.subtitle?.trim()
  if (sub) return sub
  const raw = a.sectionDetail?.trim()
  if (!raw) return null
  const single = raw.replace(/\s+/g, ' ')
  if (single.length <= 160) return single
  return `${single.slice(0, 157).trimEnd()}…`
}

export default async function AboutPage() {
  const [about, home, portfolioArticles, allServices] = await Promise.all([
    getAboutGlobal(),
    getHomeGlobal(),
    getPortfolioArticles(),
    getAllServices(),
  ])

  const serviceSummaries = allServices.slice(0, 3).map((s) => ({
    title: s.title,
    description:
      s.subtitle?.trim() ||
      s.sections?.find((sec) => sec.description?.trim())?.description?.trim() ||
      '',
  }))

  const highlighted = portfolioArticles.filter((a) => a.highlight)
  const rest = portfolioArticles.filter((a) => !a.highlight)
  const featuredProjectCards = [...highlighted, ...rest].slice(0, 3).map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: excerptFromArticle(a),
    imageUrl: resolveSectionImageUrl(a.sectionImage),
  }))

  return (
    <main className="flex w-full flex-col items-center">
      <AboutHero heroTitle={about.heroTitle} heroSubtitle={about.heroSubtitle} />
      <AboutHistory
        historySectionTitle={about.historySectionTitle}
        companyName={about.companyName}
        historyDescription={about.historyDescription}
        historyHighlights={about.historyHighlights}
      />
      <AboutMissionVision
        missionTitle={about.missionTitle}
        missionDescription={about.missionDescription}
        visionTitle={about.visionTitle}
        visionDescription={about.visionDescription}
      />
      <AboutFounder
        founderSectionTitle={about.founderSectionTitle}
        founderImage={about.founderImage}
        founderName={about.founderName}
        founderRole={about.founderRole}
        founderDescription={about.founderDescription}
        founderQuote={about.founderQuote}
      />
      <AboutFeaturedProjectsTeaser
        featuredProjectsSectionTitle={about.featuredProjectsSectionTitle}
        featuredProjectsSectionSubtitle={about.featuredProjectsSectionSubtitle}
        featuredProjectsCtaText={about.featuredProjectsCtaText}
        projects={featuredProjectCards}
      />
      <AboutServicesTeaser
        servicesSectionTitle={about.servicesSectionTitle}
        servicesSectionSubtitle={about.servicesSectionSubtitle}
        servicesCtaText={about.servicesCtaText}
        serviceSummaries={serviceSummaries}
      />
      <AboutProductsTeaser
        productsSectionTitle={about.productsSectionTitle}
        productsSectionSubtitle={about.productsSectionSubtitle}
        productsCtaText={about.productsCtaText}
      />
      <AboutPartners partners={home.partners} />
    </main>
  )
}
