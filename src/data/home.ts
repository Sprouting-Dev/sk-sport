import { getPayload } from 'payload'
import config from '@payload-config'
import type { Home } from '@/payload-types'

export const getHomeGlobal = async (): Promise<Home> => {
  const payload = await getPayload({ config })
  const homeData = await payload.findGlobal({
    slug: 'home',
    depth: 1,
  })

  return homeData
}
