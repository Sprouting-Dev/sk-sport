import { getHomeGlobal } from '@/data'
import { getPortfolioArticles } from '@/data/portfolio'
import { getServiceBySlug } from '@/data/service'
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
import type { GalleryMedia, Home, PartnerMedia, Service, ServiceMedia } from '@/payload-types'
import './styles.css'

function resolveMediaUrl(media: string | GalleryMedia | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.url ?? ''
}

const INTEGRATED_SPORTS_INSTALLATION_SLUG = 'integrated-sports-installation'
const EQUIPMENT_FOR_TOP_GYMNASTS_SLUG = 'equipment-for-top-gymnasts'
const SPORTS_VISION_TRAINING_SLUG = 'sports-vision-training'
const HEALTH_MANAGEMENT_SYSTEM_SLUG = 'health-management-system'
const UNITED_DISCOVERY_SLUG = 'united-discovery'

function resolveServiceHeroUrl(hero: Service['hero']): string {
  if (!hero || typeof hero === 'string') return ''
  return (hero as ServiceMedia).url ?? ''
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
  const [
    homeData,
    portfolioArticles,
    integratedSportsService,
    equipmentForTopGymnastsService,
    sportsVisionTrainingService,
    healthManagementSystemService,
    unitedDiscoveryService,
  ] = await Promise.all([
    getHomeGlobal(),
    getPortfolioArticles(),
    getServiceBySlug(INTEGRATED_SPORTS_INSTALLATION_SLUG),
    getServiceBySlug(EQUIPMENT_FOR_TOP_GYMNASTS_SLUG),
    getServiceBySlug(SPORTS_VISION_TRAINING_SLUG),
    getServiceBySlug(HEALTH_MANAGEMENT_SYSTEM_SLUG),
    getServiceBySlug(UNITED_DISCOVERY_SLUG),
  ])

  const partnerLogos = resolvePartnerLogos(homeData.partners)

  const integratedSportsInstallationTeaser = integratedSportsService
    ? {
        title: integratedSportsService.title,
        description: integratedSportsService.subtitle ?? '',
        image:
          resolveServiceHeroUrl(integratedSportsService.hero) ||
          '/Contact Section BG Desktop.png',
        href: `/service/${integratedSportsService.slug}`,
        imageAlt: integratedSportsService.title,
      }
    : null

  const equipmentForTopGymnastsTeaser = equipmentForTopGymnastsService
    ? {
        title: equipmentForTopGymnastsService.title,
        description: equipmentForTopGymnastsService.subtitle ?? '',
        image:
          resolveServiceHeroUrl(equipmentForTopGymnastsService.hero) ||
          '/Contact Section BG Desktop.png',
        href: `/service/${equipmentForTopGymnastsService.slug}`,
        imageAlt: equipmentForTopGymnastsService.title,
      }
    : null

  const sportsVisionTrainingTeaser = sportsVisionTrainingService
    ? {
        title: sportsVisionTrainingService.title,
        image:
          resolveServiceHeroUrl(sportsVisionTrainingService.hero) ||
          '/Contact Section BG Desktop.png',
        href: `/service/${sportsVisionTrainingService.slug}`,
        imageAlt: sportsVisionTrainingService.title,
      }
    : null

  const healthManagementSystemTeaser = healthManagementSystemService
    ? {
        title: healthManagementSystemService.title,
        image:
          resolveServiceHeroUrl(healthManagementSystemService.hero) ||
          '/Contact Section BG Desktop.png',
        href: `/service/${healthManagementSystemService.slug}`,
        imageAlt: healthManagementSystemService.title,
      }
    : null

  const unitedDiscoveryTeaser = unitedDiscoveryService
    ? {
        title: unitedDiscoveryService.title,
        image:
          resolveServiceHeroUrl(unitedDiscoveryService.hero) || '/Contact Section BG Desktop.png',
        href: `/service/${unitedDiscoveryService.slug}`,
        imageAlt: unitedDiscoveryService.title,
      }
    : null

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
      <Services
        integratedSportsInstallationTeaser={integratedSportsInstallationTeaser}
        equipmentForTopGymnastsTeaser={equipmentForTopGymnastsTeaser}
        sportsVisionTrainingTeaser={sportsVisionTrainingTeaser}
        healthManagementSystemTeaser={healthManagementSystemTeaser}
        unitedDiscoveryTeaser={unitedDiscoveryTeaser}
      />
      <OurProducts />
      <Accomplishment items={accomplishmentItems} />
      <CTAFooter />
      <AboutCompany />
      <ContactSection />
      <Gallery media={homeData.galleryMedia} />
    </div>
  )
}
