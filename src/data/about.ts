import { getPayload } from 'payload'
import config from '@payload-config'
import type { About } from '@/payload-types'

export const getAboutGlobal = async (): Promise<About> => {
  const payload = await getPayload({ config })
  const aboutData = await payload.findGlobal({
    slug: 'about',
    depth: 1,
  })

  return aboutData
}
