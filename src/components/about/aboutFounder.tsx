import Link from 'next/link'
import type { Founder, HeroMedia } from '@/payload-types'
import { resolveFounderAboutImage, resolveLegacyFounderImage } from './founderMedia'

interface AboutFounderProps {
  founderSectionTitle?: string | null
  /** When non-empty, renders founder cards from CMS (About global single-founder fields ignored). */
  cmsFounders?: Founder[] | null
  founderImage?: (string | null) | HeroMedia
  founderName?: string | null
  founderRole?: string | null
  founderDescription?: string | null
  founderQuote?: string | null
}

function FounderCardShell({
  imageUrl,
  imageAlt,
  label,
  name,
  role,
  bodyText,
  quote,
  readMoreHref,
}: {
  imageUrl: string
  imageAlt: string
  label: string
  name: string
  role?: string | null
  bodyText?: string | null
  quote?: string | null
  readMoreHref?: string
}) {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-base-300/40 bg-gradient-to-br from-primary/15 to-secondary/15 shadow-md">
      <div className="flex flex-col gap-7 p-6 md:flex-row md:items-stretch md:gap-10 md:p-8 lg:gap-12 lg:p-10">
        <div className="mx-auto w-full max-w-48 shrink-0 md:mx-0 md:w-52 md:max-w-none lg:w-56">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={imageAlt}
              className="aspect-ratio-3-4 w-full rounded-xl object-cover object-top shadow-sm"
            />
          ) : (
            <div className="aspect-ratio-3-4 flex w-full items-center justify-center rounded-xl border border-base-300/60 bg-base-200/80">
              <span className="text-sm text-base-content/40">Photo</span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3.5 md:justify-center md:gap-4">
          <p className="text-founder-label tracking-founder-role text-center font-semibold uppercase text-primary md:text-left md:text-xs">
            {label}
          </p>

          <h2 className="text-center text-2xl font-semibold leading-tight text-base-content md:text-left md:text-3xl">
            {name}
          </h2>

          {role && (
            <p className="text-center text-sm text-base-content/50 md:text-left md:text-base">
              {role}
            </p>
          )}

          {bodyText && (
            <p className="text-center text-sm leading-relaxed text-base-content/72 md:text-left md:text-base md:leading-relaxed">
              {bodyText}
            </p>
          )}

          {quote && (
            <blockquote className="mt-2 rounded-r-xl border-l-4 border-primary bg-base-200/30 py-4 pl-5 pr-4 md:mt-2.5 md:py-5 md:pl-6">
              <p className="text-base font-medium italic leading-relaxed text-base-content md:text-lg">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          )}

          {readMoreHref && (
            <div className="pt-1 md:pt-2">
              <Link
                href={readMoreHref}
                className="btn btn-gradient-solid-border btn-sm inline-flex w-full items-center justify-center sm:w-auto"
              >
                <span className="text-primary">Read more →</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AboutFounder({
  founderSectionTitle,
  cmsFounders,
  founderImage,
  founderName,
  founderRole,
  founderDescription,
  founderQuote,
}: AboutFounderProps) {
  const cms = cmsFounders?.filter((f) => f?.slug) ?? []
  if (cms.length > 0) {
    return (
      <section className="w-full bg-header-bg py-12 md:py-14">
        <div className="container mx-auto flex flex-col gap-8 px-6">
          {founderSectionTitle?.trim() && (
            <h2 className="text-center text-2xl font-semibold tracking-wide text-base-content md:text-3xl">
              {founderSectionTitle}
            </h2>
          )}
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 md:gap-8">
            {cms.map((f) => {
              const img = resolveFounderAboutImage(f.aboutImage)
              const imageUrl = img?.url ?? ''
              const imageAlt = img?.alt || f.name
              const label = (f.role?.trim() || 'Founder').toUpperCase()
              return (
                <FounderCardShell
                  key={f.id}
                  imageUrl={imageUrl}
                  imageAlt={imageAlt}
                  label={label}
                  name={f.name}
                  role={f.role}
                  bodyText={f.excerpt?.trim() || null}
                  quote={f.quote?.trim() || null}
                  readMoreHref={`/about/founders/${f.slug}`}
                />
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  const legacyImg = resolveLegacyFounderImage(founderImage)
  const imageUrl = legacyImg?.url ?? ''
  const imageAlt = legacyImg?.alt || founderName || ''
  const hasLegacy = !!(founderName?.trim() || imageUrl)

  if (!hasLegacy) {
    return null
  }

  return (
    <section className="w-full bg-header-bg py-12 md:py-14">
      <div className="container mx-auto flex flex-col gap-6 px-6">
        {founderSectionTitle?.trim() && (
          <h2 className="text-center text-2xl font-semibold tracking-wide text-base-content md:text-3xl">
            {founderSectionTitle}
          </h2>
        )}
        <FounderCardShell
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          label="FOUNDER & CEO"
          name={founderName || ''}
          role={founderRole}
          bodyText={founderDescription}
          quote={founderQuote}
        />
      </div>
    </section>
  )
}
