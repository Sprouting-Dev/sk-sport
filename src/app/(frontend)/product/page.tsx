import { Suspense } from 'react'
import Image from 'next/image'
import { getAllProducts } from '@/data/product'
import { getProductsHeroGlobal } from '@/data/productsHero'
import { ProductClient } from '@/components/product/productClient'
import type { GalleryMedia, HeroMedia, Product, ProductsHero } from '@/payload-types'

function resolveImageUrl(image: Product['image']): string {
  if (!image || typeof image === 'string') return ''
  return (image as GalleryMedia).url ?? ''
}

function resolveHeroMediaUrl(
  heroMedia: (string | HeroMedia)[] | null | undefined,
): string | undefined {
  if (!heroMedia?.length) return undefined
  const first = heroMedia[0]
  if (!first || typeof first === 'string') return undefined
  return (first as HeroMedia).url ?? undefined
}

const DEFAULT_EYEBROW = 'Equipment & Gear'

function productsHeroTitleClass(size: ProductsHero['titleSize']): string {
  switch (size) {
    case 'small':
      return 'text-2xl md:text-3xl text-primary-content font-heading font-medium leading-tight'
    case 'large':
      return 'text-3xl md:text-4xl text-primary-content font-heading font-medium leading-tight'
    case 'extraLarge':
      return 'text-4xl md:text-5xl text-primary-content font-heading font-medium leading-tight tracking-tight'
    default:
      return 'text-primary-content'
  }
}

function productsHeroBodyClass(size: ProductsHero['bodySize']): string {
  switch (size) {
    case 'small':
      return 'body-sm text-primary-content/80 mt-3 max-w-lg'
    case 'large':
      return 'body-md md:body-lg text-primary-content/80 mt-3 max-w-lg'
    default:
      return 'body-lg text-primary-content/80 mt-3 max-w-lg'
  }
}

export default async function ProductPage() {
  const [products, productsHero] = await Promise.all([getAllProducts(), getProductsHeroGlobal()])

  const heroTitle = productsHero.heroTitle ?? 'Our Products'
  const heroSubtitle =
    productsHero.heroSubtitle ??
    'Professional sports equipment and facility gear, specified and installed by our team for venues of every scale.'
  const heroImageUrl = resolveHeroMediaUrl(productsHero.heroMedia)
  const eyebrow =
    typeof productsHero.eyebrow === 'string' && productsHero.eyebrow.trim() !== ''
      ? productsHero.eyebrow.trim()
      : DEFAULT_EYEBROW
  const titleClass = productsHeroTitleClass(productsHero.titleSize)
  const subtitleClass = productsHeroBodyClass(productsHero.bodySize)

  const productItems = products.map((product) => ({
    id: product.id,
    slug: product.slug ?? product.id,
    title: product.title,
    subtitle: product.subtitle,
    category: product.category,
    description: product.description,
    imageUrl: resolveImageUrl(product.image),
    mode: (product.mode ?? 'quote') as 'quote' | 'buy',
    price: product.price ?? null,
  }))

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right relative overflow-hidden w-full py-16 md:py-24">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt={heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="relative z-10 container mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="body-sm text-secondary font-semibold uppercase tracking-widest mb-2">
              {eyebrow}
            </p>
            <h1 className={titleClass}>{heroTitle}</h1>
            <p className={subtitleClass}>{heroSubtitle}</p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProductClient products={productItems} />
      </Suspense>
    </main>
  )
}
