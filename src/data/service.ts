import { getPayload } from 'payload'
import config from '@payload-config'
import type { Service } from '@/payload-types'

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
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

export const getAllServices = async (): Promise<Service[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
    depth: 1,
  })

  return result.docs
}
