import { getPayload } from 'payload'
import config from '@payload-config'
import type { ServicesHero } from '@/payload-types'

export const getServicesHeroGlobal = async (): Promise<ServicesHero> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'services-hero',
    depth: 1,
  })
}
