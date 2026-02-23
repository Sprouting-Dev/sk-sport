'use client'

import { useParams } from 'next/navigation'
import { ServiceHero } from '@/components/hero/serviceHero'
import { CTAFooter } from '@/components/layout'
import { RelatedArticle, type RelatedArticleItem, MoreServices } from '@/components/service'

const HERO_IMAGES_DATA: Record<string, string> = {
  'united-discovery': '/United Discovery BG.png',
  'health-management-system': '/Health Management System BG.png',
  'equipment-for-top-gymnasts': '/Equipment for Top Gymnasts BG.png',
  'sports-vision-training': '/Sports Vision Training BG.png',
  'integrated-sports-installation': '/integrated-sports-installation.png',
}

const RELATED_ARTICLES_DATA: Record<string, RelatedArticleItem[]> = {
  'united-discovery': [
    { id: 1, title: 'How Study Tours Enhance Global Learning Experiences', href: '#', image: '' },
    { id: 2, title: 'Planning Educational Trips for Institutions and Organizations', href: '#', image: '' },
    { id: 3, title: 'Key Destinations for International Study Tours Worldwide', href: '#', image: '' },
    { id: 4, title: 'Why Government and Educational Institutions Trust Professional Study Tour Services', href: '#', image: '' },
  ],
  'health-management-system': [
    { id: 1, title: 'End-to-End Sports Equipment Installation for Professional Facilities', href: '#', image: '' },
    { id: 2, title: 'Key Considerations When Designing Indoor Sports Facilities', href: '#', image: '' },
    { id: 3, title: 'Outdoor Sports Installation: From Planning to Execution', href: '#', image: '' },
    { id: 4, title: 'Ensuring Safety and Performance in Sports Facility Installation', href: '#', image: '' },
  ],
  'equipment-for-top-gymnasts': [
    { id: 1, title: 'The Role of Health Management Systems in Modern Training Centers', href: '#', image: '' },
    { id: 2, title: 'Using Technology to Monitor Physical Performance and Health', href: '#', image: '' },
    { id: 3, title: 'Benefits of Data-Driven Health Assessment Systems', href: '#', image: '' },
    { id: 4, title: 'Health Management Solutions for Sports Centers and Institutions', href: '#', image: '' },
  ],
  'sports-vision-training': [
    { id: 1, title: 'Choosing the Right Equipment for Elite Gymnast Training', href: '#', image: '' },
    { id: 2, title: 'International Standards for Professional Gymnastics Equipment', href: '#', image: '' },
    { id: 3, title: 'How Quality Equipment Impacts Gymnast Performance and Safety', href: '#', image: '' },
    { id: 4, title: 'Designing Training Spaces for Competitive Gymnastics', href: '#', image: '' },
  ],
  'integrated-sports-installation': [
    { id: 1, title: 'What Is Sports Vision Training and Why It Matters', href: '#', image: '' },
    { id: 2, title: 'Improving Reaction Time Through Vision Training Systems', href: '#', image: '' },
    { id: 3, title: 'How Visual Coordination Enhances Athletic Performance', href: '#', image: '' },
    { id: 4, title: 'Vision Training Solutions for Professional Athletes', href: '#', image: '' },
  ]
}

function toTitle(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string | string[] }>()
  const slugValue = Array.isArray(slug) ? slug[0] : (slug ?? '')
  const titleLine1 = toTitle(slugValue)

  const currentHeroImage = HERO_IMAGES_DATA[slugValue] || '/integrated-sports-installation.png'
  const currentRelatedArticles = RELATED_ARTICLES_DATA[slugValue] || []

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc={currentHeroImage}
        titleLine1={titleLine1}
        showCta={false}
        contentPosition="bottom"
      />
      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="w-full py-6 md:py-8">
          
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-16">
            
            <div className="order-1 lg:order-1 lg:col-span-2">

            </div>

            <div className="order-4 mt-8 px-4 lg:order-2 lg:col-span-1 lg:mt-0">
              {currentRelatedArticles.length > 0 && (
                <RelatedArticle articles={currentRelatedArticles} />
              )}
            </div>
            
            <div className="order-2 pt-4 lg:order-3 col-span-3">
              <CTAFooter variant="light" />
            </div>

            <div className="order-3 w-full pt-4 pb-8 px-4 md:pb-16 lg:order-4 lg:col-span-3 lg:pt-8">
              <MoreServices />
            </div>

          </div>

        </div>
      </div>
    </main>
  )
}
