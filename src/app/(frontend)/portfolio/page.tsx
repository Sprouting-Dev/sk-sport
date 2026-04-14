import { PortfolioHero } from '@/components/hero/portfolioHero'
import { PortfolioClient } from '@/components/portfolio'
import { ArticleData } from '@/components/portfolio/cardArticle'
import { getPortfolioArticles } from '@/data/portfolio'
import { getPortfolioHeroGlobal } from '@/data/portfolioHero'
import type { PortfolioArticle, GalleryMedia, HeroMedia } from '@/payload-types'

function resolveImageUrl(sectionImage: PortfolioArticle['sectionImage']): string | undefined {
  if (!sectionImage || typeof sectionImage === 'string') return undefined
  return (sectionImage as GalleryMedia).url ?? undefined
}

function resolveHeroMediaUrl(
  heroMedia: (string | HeroMedia)[] | null | undefined,
): string | undefined {
  if (!heroMedia?.length) return undefined
  const first = heroMedia[0]
  if (!first || typeof first === 'string') return undefined
  return (first as HeroMedia).url ?? undefined
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
  const [articles, portfolioHero] = await Promise.all([
    getPortfolioArticles(),
    getPortfolioHeroGlobal(),
  ])
  const mappedArticles: ArticleData[] = articles.map(mapArticleToCardData)

  const heroTitle = portfolioHero.heroTitle ?? 'PORTFOLIO'
  const heroSubtitle =
    portfolioHero.heroSubtitle ??
    'Venues, facilities, and training projects delivered with precision and care.'
  const heroImageSrc = resolveHeroMediaUrl(portfolioHero.heroMedia) ?? '/services-hero.png'

  return (
    <main className="flex w-full flex-col">
      <PortfolioHero
        variant="listing"
        imageSrc={heroImageSrc}
        title={heroTitle}
        subtitle={heroSubtitle}
      />
      <PortfolioClient articles={mappedArticles} />
    </main>
  )
}
