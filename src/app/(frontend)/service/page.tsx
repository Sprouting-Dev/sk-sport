import { getTranslations } from 'next-intl/server'
import { ServiceHero } from '@/components/hero/serviceHero'
import { ServiceCard } from '@/components/service/'
import { getAllServices } from '@/data/service'
import { getServicesHeroGlobal } from '@/data/servicesHero'
import type { Service, ServiceMedia, HeroMedia } from '@/payload-types'

function resolveHeroImageUrl(hero: Service['hero']): string {
  if (!hero || typeof hero === 'string') return ''
  return (hero as ServiceMedia).url ?? ''
}

function resolveHeroMediaUrl(
  heroMedia: (string | HeroMedia)[] | null | undefined,
): string | undefined {
  if (!heroMedia?.length) return undefined
  const first = heroMedia[0]
  if (!first || typeof first === 'string') return undefined
  return (first as HeroMedia).url ?? undefined
}

export default async function ServicePage() {
  const [t, services, servicesHero] = await Promise.all([
    getTranslations('Service.Hero'),
    getAllServices(),
    getServicesHeroGlobal(),
  ])

  const heroImageSrc = resolveHeroMediaUrl(servicesHero.heroMedia) ?? '/services-hero.png'
  const heroTitleLine1 = servicesHero.heroTitle ?? t('titleLine1')
  const heroSubtitle = servicesHero.heroSubtitle ?? (
    <>
      {t('subtitle_line1')}
      <br />
      {t('subtitle_line2')}
    </>
  )

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc={heroImageSrc}
        titleLine1={heroTitleLine1}
        titleLine2={t('titleLine2')}
        subtitle={heroSubtitle}
        ctaLabel={t('cta')}
      />

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 items-stretch">
            {services.map((service, index) => {
              const variant = index === 0 ? 'horizontal' : 'vertical'
              return (
                <div
                  key={service.id}
                  className={
                    variant === 'horizontal' ? 'md:col-span-2 h-full' : 'col-span-1 h-full'
                  }
                >
                  <ServiceCard
                    title={service.title}
                    description={service.subtitle ?? ''}
                    image={resolveHeroImageUrl(service.hero) || '/Contact Section BG Desktop.png'}
                    href={`/service/${service.slug}`}
                    variant={variant}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
