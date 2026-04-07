import Link from 'next/link'

interface AboutProductsTeaserProps {
  productsSectionTitle?: string | null
  productsSectionSubtitle?: string | null
  productsCtaText?: string | null
}

export default function AboutProductsTeaser({
  productsSectionTitle,
  productsSectionSubtitle,
  productsCtaText,
}: AboutProductsTeaserProps) {
  return (
    <section className="section-bg-to-left w-full py-16 md:py-24">
      <div className="relative z-10 container mx-auto px-6">
        <div className="rounded-box border border-primary-content/10 bg-primary-content/5 px-8 py-10 backdrop-blur-sm md:px-12 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            <div className="flex flex-col gap-4 md:col-span-2">
              {productsSectionTitle && (
                <h2 className="text-2xl md:text-4xl font-heading font-medium tracking-wide text-primary-content leading-tight">
                  {productsSectionTitle}
                </h2>
              )}
              <div className="h-0.5 w-12 bg-gradient" />
              {productsSectionSubtitle && (
                <p className="body-sm text-primary-content/75 leading-relaxed max-w-xl">
                  {productsSectionSubtitle}
                </p>
              )}
            </div>

            {productsCtaText && (
              <div className="flex items-center md:justify-end">
                <Link
                  href="/product"
                  className="btn btn-gradient-solid-border btn-sm-typo h-10 px-6 inline-flex items-center"
                >
                  <span className="text-primary-content">{productsCtaText}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
