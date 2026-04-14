import { getPayload } from 'payload'
import config from '@payload-config'
import type { ProductsHero } from '@/payload-types'

export const getProductsHeroGlobal = async (): Promise<ProductsHero> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'products-hero',
    depth: 1,
  })
}
