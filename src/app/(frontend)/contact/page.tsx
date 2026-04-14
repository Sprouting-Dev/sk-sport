import { Hero } from '@/components/hero/Hero'
import { ContactForm } from '@/components/contact'
import { getContactHeroGlobal } from '@/data/contactHero'
import type { Home } from '@/payload-types'

const FALLBACK_MEDIA = [
  { id: '1', url: '/Contact Section BG Desktop.png', alt: 'Contact Background' },
] as unknown as Home['heroMedia']

export default async function Contact() {
  const contactHero = await getContactHeroGlobal()

  const heroMedia = contactHero.heroMedia?.length ? contactHero.heroMedia : FALLBACK_MEDIA
  const heroTitle = contactHero.heroTitle ?? 'Contact us'
  const heroDescription = contactHero.heroSubtitle ?? (
    <>
      Your Partner for World-Class Sports Facility Development.
      <br />
      We&apos;re here to help with equipment, installation, and facility planning.
    </>
  )

  return (
    <div className="w-full bg-header-bg">
      <Hero variant="contact" media={heroMedia} title={heroTitle} description={heroDescription} />
      <div className="relative z-20">
        <ContactForm />
      </div>
    </div>
  )
}
