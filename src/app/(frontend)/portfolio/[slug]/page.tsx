import { notFound } from 'next/navigation'
import { Detail } from '@/components/common'
import { getPortfolioArticleBySlug } from '@/data/portfolio'
import type { PortfolioArticle, GalleryMedia } from '@/payload-types'

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
  const article = await getPortfolioArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const sectionImageUrl = resolveMediaUrl(article.sectionImage as string | GalleryMedia | null)

  const galleryUrls: string[] = (article.gallery ?? [])
    .map((item) => resolveMediaUrl(item as string | GalleryMedia | null))
    .filter((url) => url.length > 0)

  return (
    <main className="flex w-full flex-col items-center bg-header-bg">
      <section className="w-full bg-primary py-12 md:py-20">
        <div className="container mx-auto px-6 flex flex-col gap-3">
          {article.tag && (
            <span className="badge badge-outline border-primary-content text-primary-content body-sm uppercase tracking-widest">
              {article.tag}
            </span>
          )}
          <h1 className="text-primary-content">{article.title}</h1>
          {article.subtitle && (
            <p className="body-sm text-primary-content/80">{article.subtitle}</p>
          )}
        </div>
      </section>

      <div className="container mx-auto px-6 py-10 md:py-16 flex flex-col gap-10">
        <Detail
          detailTitle=""
          sectionTitle={article.sectionTitle ?? undefined}
          detail={article.sectionDetail}
          images={sectionImageUrl ? [sectionImageUrl] : []}
          variant="row"
          tags={article.tag ? [article.tag] : []}
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
    </main>
  )
}
