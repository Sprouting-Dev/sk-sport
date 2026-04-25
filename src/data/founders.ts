import { getPayload } from 'payload'
import config from '@payload-config'
import type { Founder } from '@/payload-types'

export const getVisibleFounders = async (): Promise<Founder[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'founders',
    where: {
      isVisible: { equals: true },
    },
    sort: 'sortOrder',
    depth: 1,
    limit: 0,
  })
  return result.docs
}

export const getFounderBySlug = async (slug: string): Promise<Founder | null> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'founders',
    where: {
      and: [{ slug: { equals: slug } }, { isVisible: { equals: true } }],
    },
    depth: 1,
    limit: 1,
  })
  return result.docs[0] ?? null
}
