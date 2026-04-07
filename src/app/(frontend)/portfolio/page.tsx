import { PortfolioClient } from '@/components/portfolio'
import { ArticleData } from '@/components/portfolio/cardArticle'
import { getPortfolioArticles } from '@/data/portfolio'
import type { PortfolioArticle, GalleryMedia } from '@/payload-types'

function resolveImageUrl(sectionImage: PortfolioArticle['sectionImage']): string | undefined {
  if (!sectionImage || typeof sectionImage === 'string') return undefined
  return (sectionImage as GalleryMedia).url ?? undefined
}

function mapArticleToCardData(article: PortfolioArticle): ArticleData {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle ?? undefined,
    description: article.sectionDetail,
    category: article.tag ?? undefined,
    image: resolveImageUrl(article.sectionImage),
    newest: article.highlight ?? undefined,
  }
}

export default async function Portfolio() {
  const articles = await getPortfolioArticles()
  const mappedArticles: ArticleData[] = articles.map(mapArticleToCardData)

  return (
    <main>
      <PortfolioClient articles={mappedArticles} />
    </main>
  )
}
