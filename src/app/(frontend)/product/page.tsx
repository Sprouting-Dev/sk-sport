import { Suspense } from 'react'
import { getAllProducts } from '@/data/product'
import { ProductClient } from '@/components/product/productClient'
import type { GalleryMedia, Product } from '@/payload-types'

function resolveImageUrl(image: Product['image']): string {
  if (!image || typeof image === 'string') return ''
  return (image as GalleryMedia).url ?? ''
}

export default async function ProductPage() {
  const products = await getAllProducts()

  const productItems = products.map((product) => ({
    id: product.id,
    slug: product.slug ?? product.id,
    title: product.title,
    subtitle: product.subtitle,
    category: product.category,
    description: product.description,
    imageUrl: resolveImageUrl(product.image),
  }))

  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="body-sm text-secondary font-semibold uppercase tracking-widest mb-2">
              Equipment &amp; Gear
            </p>
            <h1 className="text-primary-content">Our Products</h1>
            <p className="body-lg text-primary-content/80 mt-3 max-w-lg">
              Professional sports equipment and facility gear, specified and installed by our team
              for venues of every scale.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProductClient products={productItems} />
      </Suspense>
    </main>
  )
}
