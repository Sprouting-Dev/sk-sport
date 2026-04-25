import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getRecommendedProducts } from '@/data/product'
import type { Product, GalleryMedia } from '@/payload-types'
import AddToCartButton from '@/components/product/addToCartButton'
import { CTAFooter } from '@/components/layout'

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
  const recommended = await getRecommendedProducts(product.id, product.category, 3)
  const isQuote = (product.mode ?? 'quote') === 'quote'
  const isBuy = !isQuote
  const p = product.price
  const isPurchasable = isBuy && typeof p === 'number' && Number.isFinite(p) && p > 0
  const priceLabel = isPurchasable
    ? new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(p as number)
    : null
  const addToCartUnit: number | undefined = isPurchasable && typeof p === 'number' ? p : undefined

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-10 md:py-14">
        <div className="relative z-10 container mx-auto px-6">
          <Link
            href="/product"
            className="body-sm font-medium text-primary-content/90 underline-offset-4 hover:text-primary-content hover:underline"
          >
            ← All products
          </Link>
        </div>
      </section>

      <div className="flex w-full flex-col items-center bg-header-bg">
        <div className="container mx-auto px-6 py-10 md:py-14">
          <div className="rounded-box border border-base-300 bg-primary-content p-6 shadow-sm md:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="w-full shrink-0 lg:max-w-md lg:flex-1">
                <div className="aspect-product-card-main relative w-full overflow-hidden rounded-box border border-base-300 bg-base-200 shadow-md">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="h-full w-full scale-140 object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="body-sm text-subtle">No Image</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-4 lg:max-w-xl">
                {product.category && (
                  <span className="badge badge-outline w-fit border-primary text-primary body-sm uppercase tracking-widest">
                    {product.category}
                  </span>
                )}
                <h1 className="text-2xl text-primary md:text-3xl">{product.title}</h1>
                {product.subtitle && (
                  <p className="body-sm font-medium text-subtle">{product.subtitle}</p>
                )}
                <div className="h-0.5 w-12 bg-gradient" />
                {priceLabel && (
                  <p className="body-sm font-semibold text-base-content">{priceLabel}</p>
                )}
                {isBuy && !isPurchasable && (
                  <p className="body-sm text-subtle">
                    Price is currently unavailable. Please request a quote.
                  </p>
                )}
                {isPurchasable && addToCartUnit != null ? (
                  <AddToCartButton
                    mode="buy"
                    unitPrice={addToCartUnit}
                    currency="THB"
                    id={product.id}
                    slug={product.slug}
                    title={product.title}
                    subtitle={product.subtitle}
                    category={product.category}
                    image={imageUrl || undefined}
                  />
                ) : (
                  <Link
                    href="/contact"
                    className="btn btn-gradient-solid-border btn-lg btn-lg-typo inline-flex w-fit px-6 text-center"
                  >
                    <span className="text-primary">Request a Quote</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-base-200 pt-8 md:mt-10 md:pt-10">
              <h2 className="mb-4 text-xl font-semibold text-primary md:text-2xl">Details</h2>
              <p className="body-sm max-w-4xl leading-relaxed text-base-content">
                {product.description}
              </p>
            </div>
          </div>

          {recommended.length > 0 && (
            <section className="mt-12 md:mt-16">
              <h2 className="mb-4 text-xl font-semibold text-primary md:mb-5 md:text-2xl">
                You may also like
              </h2>
              <div className="grid grid-cols-3 gap-3 md:flex md:flex-wrap md:justify-start md:gap-6">
                {recommended.map((p) => {
                  const thumb = resolveImageUrl(p.image)
                  const href = `/product/${p.slug ?? p.id}`
                  return (
                    <Link
                      key={p.id}
                      href={href}
                      className="group flex w-full min-w-0 flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-sm transition-all duration-300 hover:-translate-y-1 sm:w-44 md:w-48"
                    >
                      <div className="aspect-product-card-main relative w-full overflow-hidden bg-base-200">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt={p.title}
                            className="h-full w-full scale-140 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center px-1">
                            <span className="text-xs text-subtle">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col px-3 py-3">
                        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-base-content group-hover:text-primary">
                          {p.title}
                        </h3>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      <CTAFooter variant="light" />
    </main>
  )
}
