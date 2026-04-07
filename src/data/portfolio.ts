import { getPayload } from 'payload'
import config from '@payload-config'
import type { PortfolioArticle } from '@/payload-types'

export const getPortfolioArticles = async (): Promise<PortfolioArticle[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'portfolio-articles',
    depth: 1,
    sort: '-createdAt',
  })

  return result.docs
}

export const getPortfolioArticleBySlug = async (
  slug: string,
): Promise<PortfolioArticle | null> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'portfolio-articles',
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
