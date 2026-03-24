import { notFound } from 'next/navigation'
import { PortfolioHero } from '@/components/hero/portfolioHero'
import { HighlightSection } from '@/components/portfolio'

export default async function PortfolioDetailPage({ params,}: { params: Promise<{ slug: string }>}) {
  const { slug } = await params
  let portfolioData = null

  try {
    const res = await fetch(`https://api.example.com/${slug}`)

    if (res.ok) {
      portfolioData = await res.json()
    }
  } catch (error) {
    console.error(`Error fetching portfolio details for slug: ${slug}`, error)
  }

  if (!portfolioData) {
    notFound()
  }

  return (
    <main className="flex w-full flex-col items-center">
      <PortfolioHero
        imageSrc={portfolioData.imageSrc || '/checker.png'}
        category={portfolioData.category}
        title={portfolioData.title}
        subtitle={portfolioData.subtitle}
        publishedDate={portfolioData.publishedDate}
      />

      <div className="flex w-full flex-col items-center justify-center bg-primary-content">
        <div className="w-full py-6 md:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:col-span-2 px-10 flex flex-col gap-8">
              {portfolioData.highlightText && (
                <HighlightSection text={portfolioData.highlightText} />
              )}
            </div>

            <div className="order-4 mt-8 px-4 lg:order-2 lg:col-span-1 lg:mt-0"></div>

            <div className="order-2 pt-4 lg:order-3 col-span-3"></div>

            <div className="order-3 w-full pt-4 pb-8 px-4 md:pb-16 lg:order-4 lg:col-span-3 lg:pt-8"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
