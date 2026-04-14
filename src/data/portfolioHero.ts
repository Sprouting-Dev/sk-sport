import { getPayload } from 'payload'
import config from '@payload-config'
import type { PortfolioHero } from '@/payload-types'

export const getPortfolioHeroGlobal = async (): Promise<PortfolioHero> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'portfolio-hero',
    depth: 1,
  })
}
