import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/data/product'
import type { Product, GalleryMedia } from '@/payload-types'

function resolveImageUrl(image: Product['image']): string {
  if (!image || typeof image === 'string') return ''
  return (image as GalleryMedia).url ?? ''
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const imageUrl = resolveImageUrl(product.image)

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6 flex flex-col gap-3">
          {product.category && (
            <span className="badge badge-outline border-primary-content text-primary-content body-sm uppercase tracking-widest">
              {product.category}
            </span>
          )}
          <h1 className="text-primary-content">{product.title}</h1>
          {product.subtitle && (
            <p className="body-sm text-primary-content/80">{product.subtitle}</p>
          )}
        </div>
      </section>

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto px-6 py-10 md:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
            <div className="shrink-0 w-full md:w-96">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-72 w-full rounded-box object-cover shadow-md md:h-96"
                />
              ) : (
                <div className="h-72 w-full rounded-box border border-base-300 bg-base-200 flex items-center justify-center md:h-96">
                  <span className="body-sm text-subtle">No Image</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-primary">{product.title}</h2>
              {product.subtitle && (
                <p className="body-sm text-subtle font-medium">{product.subtitle}</p>
              )}
              <div className="h-0.5 w-12 bg-gradient" />
              <p className="body-sm text-base-content leading-relaxed">{product.description}</p>
              {product.category && (
                <div className="pt-2">
                  <span className="badge badge-outline border-primary text-primary body-sm">
                    {product.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
