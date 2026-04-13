import type { HeroMedia } from '@/payload-types'

interface AboutFounderProps {
  founderSectionTitle?: string | null
  founderImage?: (string | null) | HeroMedia
  founderName?: string | null
  founderRole?: string | null
  founderDescription?: string | null
  founderQuote?: string | null
}

function resolveImageUrl(founderImage: AboutFounderProps['founderImage']): string {
  if (!founderImage || typeof founderImage === 'string') return ''
  return (founderImage as HeroMedia).url ?? ''
}

export default function AboutFounder({
  founderImage,
  founderName,
  founderRole,
  founderDescription,
  founderQuote,
}: AboutFounderProps) {
  const imageUrl = resolveImageUrl(founderImage)
  const imageAlt =
    founderImage && typeof founderImage !== 'string'
      ? (founderImage as HeroMedia).alt
      : (founderName ?? '')

  return (
    <section className="w-full bg-header-bg py-12 md:py-14">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-base-300/45 bg-primary-content shadow-md">
          <div className="flex flex-col gap-7 p-6 md:flex-row md:items-stretch md:gap-10 md:p-8 lg:gap-12 lg:p-10">
            <div className="mx-auto w-full max-w-48 shrink-0 md:mx-0 md:w-52 md:max-w-none lg:w-56">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={imageAlt ?? ''}
                  className="aspect-ratio-3-4 w-full rounded-xl object-cover object-top shadow-sm"
                />
              ) : (
                <div className="aspect-ratio-3-4 flex w-full items-center justify-center rounded-xl border border-base-300 bg-base-200">
                  <span className="text-sm text-base-content/40">Founder Image</span>
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3.5 md:justify-center md:gap-4">
              <p className="text-founder-label tracking-founder-role text-center font-semibold uppercase text-primary md:text-left md:text-xs">
                FOUNDER & CEO
              </p>

              {founderName && (
                <h2 className="text-center text-2xl font-semibold leading-tight text-base-content md:text-left md:text-3xl">
                  {founderName}
                </h2>
              )}

              {founderRole && (
                <p className="text-center text-sm text-base-content/50 md:text-left md:text-base">
                  {founderRole}
                </p>
              )}

              {founderDescription && (
                <p className="text-center text-sm leading-relaxed text-base-content/72 md:text-left md:text-base md:leading-relaxed">
                  {founderDescription}
                </p>
              )}

              {founderQuote && (
                <blockquote className="mt-2 rounded-r-lg border-l-4 border-primary bg-base-200/35 py-4 pl-5 pr-4 md:mt-2.5 md:py-5 md:pl-6">
                  <p className="text-base font-medium italic leading-relaxed text-base-content md:text-lg">
                    &ldquo;{founderQuote}&rdquo;
                  </p>
                </blockquote>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
