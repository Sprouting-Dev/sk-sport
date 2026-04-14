import { getPayload } from 'payload'
import config from '@payload-config'
import type { PrivacyPolicy } from '@/payload-types'

export const getPrivacyPolicyGlobal = async (): Promise<PrivacyPolicy> => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'privacy-policy',
    depth: 0,
  })
}
