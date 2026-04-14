import { getPayload } from 'payload'
import config from '@payload-config'
import type { AboutHero } from '@/payload-types'

export const getAboutHeroGlobal = async (): Promise<AboutHero> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'about-hero',
    depth: 1,
  })
}
