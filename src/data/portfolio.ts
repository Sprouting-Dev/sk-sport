import { getPayload } from 'payload'
import config from '@payload-config'
import type { PortfolioArticle } from '@/payload-types'

/** Align route `[slug]` with Payload `slug` (trim + safe URI decode for encoded segments). */
function normalizePortfolioSlugParam(raw: string): string {
  if (typeof raw !== 'string') return ''
  const trimmed = raw.trim()
  if (!trimmed) return ''
  try {
    return decodeURIComponent(trimmed).trim()
  } catch {
    return trimmed
  }
}

export const getPortfolioArticles = async (): Promise<PortfolioArticle[]> => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'portfolio-articles',
    depth: 1,
    sort: '-createdAt',
  })

  return result.docs
}

export const getPortfolioArticleBySlug = async (slug: string): Promise<PortfolioArticle | null> => {
  const normalized = normalizePortfolioSlugParam(slug)
  if (!normalized) return null

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'portfolio-articles',
    where: {
      slug: {
        equals: normalized,
      },
    },
    depth: 1,
    limit: 1,
  })

  return result.docs[0] ?? null
}
