import { getPayload } from 'payload'
import config from '@payload-config'
import type { Product } from '@/payload-types'

/** Returns full product docs including `mode` and `price` (depth 1 for `image`). */
export const getAllProducts = async (): Promise<Product[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    sort: '-createdAt',
    limit: 0,
  })

  return result.docs
}

/** Resolves by slug with `mode`, `price`, and populated `image`. */
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
