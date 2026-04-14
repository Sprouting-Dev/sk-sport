import { getPayload } from 'payload'
import config from '@payload-config'
import type { TermsOfService } from '@/payload-types'

export const getTermsOfServiceGlobal = async (): Promise<TermsOfService> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'terms-of-service',
    depth: 0,
  })
}
