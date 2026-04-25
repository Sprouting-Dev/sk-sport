import { getAboutGlobal } from '@/data/about'
import { getAboutHeroGlobal } from '@/data/aboutHero'
import { getVisibleFounders } from '@/data/founders'
import AboutHero from '@/components/about/aboutHero'
import AboutHistory from '@/components/about/aboutHistory'
import AboutMissionVision from '@/components/about/aboutMissionVision'
import AboutFounder from '@/components/about/aboutFounder'
import type { HeroMedia } from '@/payload-types'

function resolveHeroMediaUrl(
  heroMedia: (string | HeroMedia)[] | null | undefined,
): string | undefined {
  if (!heroMedia?.length) return undefined
  const first = heroMedia[0]
  if (!first || typeof first === 'string') return undefined
  return (first as HeroMedia).url ?? undefined
}

export default async function AboutPage() {
  const [about, aboutHero, cmsFounders] = await Promise.all([
    getAboutGlobal(),
    getAboutHeroGlobal(),
    getVisibleFounders(),
  ])

  const heroImageSrc = resolveHeroMediaUrl(aboutHero.heroMedia)

  return (
    <main className="flex w-full flex-col items-center">
      <AboutHero
        heroTitle={aboutHero.heroTitle ?? about.heroTitle}
        heroSubtitle={aboutHero.heroSubtitle ?? about.heroSubtitle}
        heroImageSrc={heroImageSrc}
      />
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
        cmsFounders={cmsFounders}
        founderImage={about.founderImage}
        founderName={about.founderName}
        founderRole={about.founderRole}
        founderDescription={about.founderDescription}
        founderQuote={about.founderQuote}
      />
    </main>
  )
}
