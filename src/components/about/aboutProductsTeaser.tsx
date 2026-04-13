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
    <section className="w-full bg-header-bg py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mx-auto flex flex-col items-center text-center">
          {productsSectionTitle ? (
            <h2 className="text-2xl font-semibold tracking-wide text-base-content md:text-3xl lg:text-4xl">
              {productsSectionTitle}
            </h2>
          ) : null}
          <div className="mx-auto mt-4 h-px w-12 bg-gradient md:mt-5" />
          {productsSectionSubtitle ? (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-base-content/70 md:mt-6 md:text-base">
              {productsSectionSubtitle}
            </p>
          ) : null}
          {productsCtaText ? (
            <div className="mt-10 flex w-full justify-center md:mt-12">
              <Link
                href="/product"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-9 py-3.5 text-sm font-semibold text-primary-content shadow-lg transition hover:opacity-95 md:px-10 md:py-4 md:text-base"
              >
                {productsCtaText}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
