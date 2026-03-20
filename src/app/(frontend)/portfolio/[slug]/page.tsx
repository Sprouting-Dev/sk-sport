import { notFound } from 'next/navigation'
import { PortfolioHero } from '@/components/hero/portfolioHero'

export default async function PortfolioDetailPage({  params,}: {  params: Promise<{ slug: string }>}) {
  const { slug } = await params

  const mockData = {
    imageSrc: '',
    category: 'VENUE',
    title: 'มาดามปุ๊ก นำสปอร์ตโค้ชช่วยดันฟุตซอลหญิงทีมชาติไทยหวังติด 1 ใน 5 ของโลก',
    subtitle: 'SK Sport Trading สนับสนุนทีมชาติฟุตซอลหญิง',
    publishedDate: 'February 3, 2026',
  }

  return (
    <main className="flex w-full flex-col items-center">
      <PortfolioHero
        imageSrc={mockData.imageSrc || '/checker.png'}
        category={mockData.category}
        title={mockData.title}
        subtitle={mockData.subtitle}
        publishedDate={mockData.publishedDate}
      />

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="w-full py-6 md:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:col-span-2 px-4 flex flex-col gap-8"></div>

            <div className="order-4 mt-8 px-4 lg:order-2 lg:col-span-1 lg:mt-0"></div>

            <div className="order-2 pt-4 lg:order-3 col-span-3"></div>

            <div className="order-3 w-full pt-4 pb-8 px-4 md:pb-16 lg:order-4 lg:col-span-3 lg:pt-8"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
