import type { PartnerMedia } from '@/payload-types'

interface AboutPartnersProps {
  partners?: (string | PartnerMedia)[] | null
}

function resolvePartnerLogo(partner: string | PartnerMedia): { url: string; name: string } | null {
  if (!partner || typeof partner === 'string') return null
  const p = partner as PartnerMedia
  const url = p.url ?? p.thumbnailURL ?? ''
  if (!url) return null
  return { url, name: p.name ?? 'Partner' }
}

export default function AboutPartners({ partners }: AboutPartnersProps) {
  const items =
    partners
      ?.map((p) => resolvePartnerLogo(p))
      .filter((x): x is { url: string; name: string } => Boolean(x)) ?? []

  if (items.length === 0) return null

  return (
    <section className="w-full bg-primary-content py-14 md:py-20">
      <div className="container mx-auto px-6">
        <h2 className="tracking-partners-title mb-8 text-center text-xs font-semibold uppercase text-base-content/60 md:mb-10 md:text-sm">
          Our Partners
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {items.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="aspect-ratio-3-2 flex items-center justify-center rounded-xl border border-base-300/50 bg-header-bg px-4 py-5 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.name}
                className="max-h-10 w-auto max-w-full object-contain md:max-h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
