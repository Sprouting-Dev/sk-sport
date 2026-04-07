import { getAboutGlobal } from '@/data/about'
import AboutHero from '@/components/about/aboutHero'
import AboutHistory from '@/components/about/aboutHistory'
import AboutMissionVision from '@/components/about/aboutMissionVision'
import AboutFounder from '@/components/about/aboutFounder'
import AboutFeaturedProjectsTeaser from '@/components/about/aboutFeaturedProjectsTeaser'
import AboutServicesTeaser from '@/components/about/aboutServicesTeaser'
import AboutProductsTeaser from '@/components/about/aboutProductsTeaser'

export default async function AboutPage() {
  const about = await getAboutGlobal()

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
      />
      <AboutServicesTeaser
        servicesSectionTitle={about.servicesSectionTitle}
        servicesSectionSubtitle={about.servicesSectionSubtitle}
        servicesCtaText={about.servicesCtaText}
      />
      <AboutProductsTeaser
        productsSectionTitle={about.productsSectionTitle}
        productsSectionSubtitle={about.productsSectionSubtitle}
        productsCtaText={about.productsCtaText}
      />
    </main>
  )
}
