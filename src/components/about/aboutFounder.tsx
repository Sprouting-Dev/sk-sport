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
  founderSectionTitle,
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
    <section className="w-full bg-header-bg py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col gap-10">
        {founderSectionTitle && (
          <p className="body-sm text-primary font-semibold uppercase tracking-widest">
            {founderSectionTitle}
          </p>
        )}

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          <div className="shrink-0 w-full md:w-72">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-80 w-full rounded-box object-cover object-top shadow-md md:h-96"
              />
            ) : (
              <div className="h-80 w-full rounded-box border border-base-300 bg-base-200 flex items-center justify-center md:h-96">
                <span className="body-sm text-subtle">Founder Image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-1">
              {founderName && (
                <h2 className="text-2xl md:text-3xl font-heading font-medium text-primary leading-tight">
                  {founderName}
                </h2>
              )}
              {founderRole && <p className="body-sm text-subtle font-medium">{founderRole}</p>}
            </div>

            {founderDescription && (
              <p className="body-sm text-base-content leading-relaxed indent-4">
                {founderDescription}
              </p>
            )}

            {founderQuote && (
              <blockquote className="relative pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-full before:bg-gradient">
                <p className="body-sm text-subtle italic leading-relaxed">
                  &ldquo;{founderQuote}&rdquo;
                </p>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
