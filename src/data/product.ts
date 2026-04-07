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
