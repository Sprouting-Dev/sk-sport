import Image from 'next/image'
import Link from 'next/link'

function portfolioDetailHref(slug: string): string | null {
  const t = slug.trim()
  return t !== '' ? `/portfolio/${t}` : null
}

export interface AboutFeaturedProjectCard {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  imageUrl?: string
}

interface AboutFeaturedProjectsTeaserProps {
  featuredProjectsSectionTitle?: string | null
  featuredProjectsSectionSubtitle?: string | null
  featuredProjectsCtaText?: string | null
  projects?: AboutFeaturedProjectCard[]
}

export default function AboutFeaturedProjectsTeaser({
  featuredProjectsSectionSubtitle,
  featuredProjectsCtaText,
  projects = [],
}: AboutFeaturedProjectsTeaserProps) {
  const cards = projects.slice(0, 3)

  return (
    <section className="w-full bg-header-bg py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2 className="text-2xl font-semibold tracking-wide text-base-content md:text-3xl lg:text-4xl">
            Highlighted Projects
          </h2>
          {featuredProjectsSectionSubtitle ? (
            <p className="mt-4 text-sm leading-relaxed text-base-content/70 md:mt-5 md:text-base">
              {featuredProjectsSectionSubtitle}
            </p>
          ) : null}
        </div>

        {cards.length > 0 ? (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
            {cards.map((p) => {
              const href = portfolioDetailHref(p.slug)

              const imageBlock = (
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-base-200 md:aspect-[4/3]">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full min-h-[12rem] items-center justify-center text-sm text-base-content/35">
                      No image
                    </div>
                  )}
                </div>
              )

              const textBlock = (
                <div className="flex flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
                  {href ? (
                    <Link
                      href={href}
                      className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <h3 className="text-base font-medium leading-normal tracking-normal whitespace-normal break-words text-base-content md:text-lg">
                        {p.title}
                      </h3>
                    </Link>
                  ) : (
                    <h3 className="text-lg font-semibold leading-snug text-base-content md:text-xl">
                      {p.title}
                    </h3>
                  )}
                  {href ? (
                    <Link
                      href={href}
                      className="mt-5 inline-flex w-fit items-center text-sm font-semibold text-primary underline-offset-4 transition hover:underline md:mt-6"
                    >
                      View Project <span aria-hidden> →</span>
                    </Link>
                  ) : null}
                </div>
              )

              return (
                <article
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-base-300/45 bg-primary-content shadow-lg transition-shadow hover:shadow-xl"
                >
                  {href ? (
                    <Link
                      href={href}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {imageBlock}
                    </Link>
                  ) : (
                    imageBlock
                  )}
                  {textBlock}
                </article>
              )
            })}
          </div>
        ) : null}

        {featuredProjectsCtaText ? (
          <div className="mt-12 flex justify-center md:mt-16">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-9 py-3.5 text-sm font-semibold text-primary-content shadow-lg transition hover:opacity-95 md:px-10 md:py-4 md:text-base"
            >
              {featuredProjectsCtaText}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
