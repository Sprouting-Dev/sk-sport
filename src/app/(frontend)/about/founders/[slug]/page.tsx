import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFounderBySlug } from '@/data/founders'
import { FounderDetailImages } from '@/components/about/founderDetailImages'
import { resolveFounderDetailImages } from '@/components/about/founderMedia'

type PageProps = { params: Promise<{ slug: string }> }

export default async function FounderDetailPage({ params }: PageProps) {
  const { slug } = await params
  const founder = await getFounderBySlug(decodeURIComponent(slug))
  if (!founder) {
    notFound()
  }

  const images = resolveFounderDetailImages(founder)
  const label = (founder.role?.trim() || 'Founder').toUpperCase()

  return (
    <main className="flex w-full flex-col items-center bg-header-bg">
      <div className="container mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <Link
          href="/about"
          className="mb-8 inline-block text-sm font-medium text-primary hover:underline"
        >
          ← Back to About
        </Link>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="w-full min-w-0 max-w-full lg:max-w-md lg:shrink-0 xl:max-w-lg">
            <FounderDetailImages images={images} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-founder-label tracking-founder-role font-semibold uppercase text-primary">
              {label}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-base-content md:text-4xl">
              {founder.name}
            </h1>
            {founder.role && (
              <p className="mt-2 text-base text-base-content/60 md:text-lg">{founder.role}</p>
            )}

            {founder.description?.trim() && (
              <p className="body-md mt-6 whitespace-pre-line leading-relaxed text-base-content/85">
                {founder.description}
              </p>
            )}

            {founder.quote?.trim() && (
              <blockquote className="mt-8 rounded-r-xl border-l-4 border-primary bg-base-200/30 py-5 pl-6 pr-4">
                <p className="text-lg font-medium italic leading-relaxed text-base-content md:text-xl">
                  &ldquo;{founder.quote.trim()}&rdquo;
                </p>
              </blockquote>
            )}

            <div className="mt-10">
              <Link href="/contact" className="btn btn-gradient-solid-border btn-md">
                <span className="text-primary">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
