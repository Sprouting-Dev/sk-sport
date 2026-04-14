import { getPayload } from 'payload'
import config from '@payload-config'
import type { ContactHero } from '@/payload-types'

export const getContactHeroGlobal = async (): Promise<ContactHero> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'contact-hero',
    depth: 1,
  })
}
