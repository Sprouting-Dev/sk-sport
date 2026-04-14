import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Detail } from '@/components/common'
import { PortfolioHero } from '@/components/hero/portfolioHero'
import { CTAFooter } from '@/components/layout'
import { getPortfolioArticleBySlug, getPortfolioArticles } from '@/data/portfolio'
import type { GalleryMedia } from '@/payload-types'

function resolveMediaUrl(media: string | GalleryMedia | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.url ?? ''
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [article, allArticles] = await Promise.all([
    getPortfolioArticleBySlug(slug),
    getPortfolioArticles(),
  ])

  if (!article) {
    notFound()
  }

  const sectionImageUrl = resolveMediaUrl(article.sectionImage as string | GalleryMedia | null)

  const galleryUrls: string[] = (article.gallery ?? [])
    .map((item) => resolveMediaUrl(item as string | GalleryMedia | null))
    .filter((url) => url.length > 0)

  const publishedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const moreArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <main className="flex w-full flex-col items-center bg-header-bg">
      <PortfolioHero
        imageSrc={sectionImageUrl || undefined}
        category={article.tag ?? undefined}
        title={article.title}
        subtitle={article.subtitle ?? undefined}
        publishedDate={publishedDate}
      />

      <div className="container mx-auto px-6 py-10 md:py-16 flex flex-col gap-10">
        <Detail
          detailTitle=""
          sectionTitle={article.sectionTitle ?? undefined}
          detail={article.sectionDetail}
          images={sectionImageUrl ? [sectionImageUrl] : []}
          variant="row"
        />

        {galleryUrls.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-gradient">Gallery</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {galleryUrls.map((url, index) => (
                <div key={index} className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`${article.title} gallery ${index + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {moreArticles.length > 0 && (
        <section className="w-full bg-primary-content border-t border-base-300">
          <div className="container mx-auto px-6 py-10 md:py-16">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2>More Projects</h2>
              <Link
                href="/portfolio"
                className="body-sm text-primary underline-offset-2 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {moreArticles.map((item) => {
                const itemImage = resolveMediaUrl(item.sectionImage as string | GalleryMedia | null)
                return (
                  <Link
                    key={item.id}
                    href={`/portfolio/${item.slug ?? item.id}`}
                    className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-header-bg shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-base-200">
                      {itemImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={itemImage}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="body-sm text-subtle">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 px-4 py-3">
                      {item.tag && (
                        <span className="body-sm text-primary font-semibold uppercase tracking-widest">
                          {item.tag}
                        </span>
                      )}
                      <p className="body-sm text-base-content font-medium leading-snug line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CTAFooter />
    </main>
  )
}
