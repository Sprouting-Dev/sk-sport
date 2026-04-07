import Link from 'next/link'
import { getAllProducts } from '@/data/product'
import type { Product, GalleryMedia } from '@/payload-types'

function resolveImageUrl(image: Product['image']): string {
  if (!image || typeof image === 'string') return ''
  return (image as GalleryMedia).url ?? ''
}

export default async function ProductPage() {
  const products = await getAllProducts()

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-primary-content">Our Products</h1>
        </div>
      </section>

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto px-6 py-10 md:py-16">
          {products.length === 0 ? (
            <p className="body-sm text-subtle">No products available yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
              {products.map((product) => {
                const imageUrl = resolveImageUrl(product.image)
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group flex flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-base-200">
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="body-sm text-subtle">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 px-5 py-4">
                      {product.category && (
                        <span className="body-sm text-primary font-semibold uppercase tracking-widest">
                          {product.category}
                        </span>
                      )}
                      <h3 className="text-base-content leading-snug">{product.title}</h3>
                      {product.subtitle && (
                        <p className="body-sm text-subtle">{product.subtitle}</p>
                      )}
                      <p className="body-sm text-base-content line-clamp-3">{product.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
