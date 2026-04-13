import { getPayload } from 'payload'
import config from '@payload-config'
import type { Product } from '@/payload-types'

export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    sort: '-createdAt',
  })

  return result.docs
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  return result.docs[0] ?? null
}

const normCategory = (c: string | null | undefined) => (c ?? '').trim().toLowerCase()

/** Same-category first, then others; excludes current product id. */
export const getRecommendedProducts = async (
  excludeId: string,
  category: string | null | undefined,
  limit = 3,
): Promise<Product[]> => {
  const all = await getAllProducts()
  const others = all.filter((p) => p.id !== excludeId)
  const cat = normCategory(category)
  const same = cat ? others.filter((p) => normCategory(p.category) === cat) : []
  const rest = others.filter((p) => !same.includes(p))
  return [...same, ...rest].slice(0, limit)
}
