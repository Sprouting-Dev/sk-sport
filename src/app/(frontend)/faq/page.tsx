import Link from 'next/link'
import { getFaqGlobal } from '@/data/faq'

const DEFAULT_HERO_TITLE = 'Frequently Asked Questions'
const DEFAULT_HERO_SUBTITLE =
  'Find answers to the most common questions about our products, services, and processes.'

export default async function FaqPage() {
  const faq = await getFaqGlobal()
  const heroTitle = faq.heroTitle?.trim() || DEFAULT_HERO_TITLE
  const heroSubtitle = faq.heroSubtitle?.trim() || DEFAULT_HERO_SUBTITLE
  const faqItems =
    faq.faqItems?.filter((item) => item.question?.trim() && item.answer?.trim()) ?? []

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-primary-content">{heroTitle}</h1>
          <p className="body-lg text-primary-content/80 mt-3 max-w-xl">{heroSubtitle}</p>
        </div>
      </section>

      <section className="w-full bg-header-bg">
        <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
          <div className="flex flex-col divide-y divide-base-300">
            {faqItems.map((item, index) => (
              <div key={item.id ?? index} className="py-6 first:pt-0 last:pb-0">
                <h3 className="mb-3 text-base-content">{item.question}</h3>
                <p className="body-md text-subtle leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-box border border-base-300 bg-primary-content px-6 py-6 shadow-sm text-center">
            <p className="body-md text-subtle mb-4">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact" className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8">
              <span className="text-primary">Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
