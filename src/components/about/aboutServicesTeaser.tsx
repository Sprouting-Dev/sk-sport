import Link from 'next/link'

interface AboutServicesTeaserProps {
  servicesSectionTitle?: string | null
  servicesSectionSubtitle?: string | null
  servicesCtaText?: string | null
}

export default function AboutServicesTeaser({
  servicesSectionTitle,
  servicesSectionSubtitle,
  servicesCtaText,
}: AboutServicesTeaserProps) {
  return (
    <section className="w-full bg-header-bg py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="rounded-box border border-base-300 bg-primary-content px-8 py-10 shadow-sm md:px-12 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col gap-4 md:col-span-2">
              {servicesSectionTitle && (
                <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-wide text-primary leading-tight">
                  {servicesSectionTitle}
                </h2>
              )}
              <div className="h-0.5 w-12 bg-gradient" />
              {servicesSectionSubtitle && (
                <p className="body-sm text-base-content leading-relaxed max-w-xl">
                  {servicesSectionSubtitle}
                </p>
              )}
            </div>

            {servicesCtaText && (
              <div className="flex items-center md:justify-end">
                <Link
                  href="/service"
                  className="btn btn-gradient-solid-border btn-sm-typo h-10 px-6 inline-flex items-center"
                >
                  <span className="text-primary">{servicesCtaText}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
