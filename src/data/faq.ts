import { getPayload } from 'payload'
import config from '@payload-config'
import type { Faq } from '@/payload-types'

export const getFaqGlobal = async (): Promise<Faq> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'faq',
    depth: 0,
  })
}
