import { notFound } from 'next/navigation'
import { ServiceHero } from '@/components/hero/serviceHero'
import { CTAFooter } from '@/components/layout'
import {
  RelatedArticle,
  type RelatedArticleItem,
  MoreServices,
  ServiceDetail,
  type ServiceDetailProps,
} from '@/components/service'
import { getServiceBySlug, getAllServices } from '@/data/service'
import type { Service, ServiceMedia } from '@/payload-types'

// ---------------------------------------------------------------------------
// Helper: map Payload `Service` → props ที่ component ต้องการ
// ---------------------------------------------------------------------------

function mapSectionToServiceDetailProps(
  section: NonNullable<Service['sections']>[number],
): ServiceDetailProps & { _id: string } {
  const resolveImageUrl = (media: string | ServiceMedia | null | undefined): string => {
    if (!media || typeof media === 'string') return ''
    return media.url ?? ''
  }

  if (section.variant === 'row') {
    return {
      _id: section.id ?? '',
      serviceTitle: '',
      sectionTitle: section.sectionTitle ?? '',
      detail: section.description ?? '',
      variant: 'row',
      alignment: (section.alignment as 'left' | 'right') ?? 'left',
      images: [resolveImageUrl(section.image)],
      tags: [],
    }
  }

  // variant === 'column' (default)
  return {
    _id: section.id ?? '',
    serviceTitle: '',
    sectionTitle: section.sectionTitle ?? '',
    detail: section.description ?? '',
    variant: 'column',
    images: (section.images ?? []).map((item) => resolveImageUrl(item.image)),
    tags: [],
  }
}

function mapServiceToMoreServicesItem(service: Service) {
  const hero = service.hero
  const imageUrl = hero && typeof hero !== 'string' ? (hero.url ?? '') : ''

  return {
    id: service.id,
    title: service.title,
    image: imageUrl,
    href: `/service/${service.slug}`,
  }
}

// ---------------------------------------------------------------------------
// Mock data — Related Articles (ยังไม่มี collection จริงใน Payload)
// ---------------------------------------------------------------------------

const RELATED_ARTICLES_DATA: Record<string, RelatedArticleItem[]> = {
  'united-discovery': [
    { id: 1, title: 'How Study Tours Enhance Global Learning Experiences', href: '#', image: '' },
    {
      id: 2,
      title: 'Planning Educational Trips for Institutions and Organizations',
      href: '#',
      image: '',
    },
    {
      id: 3,
      title: 'Key Destinations for International Study Tours Worldwide',
      href: '#',
      image: '',
    },
    {
      id: 4,
      title: 'Why Government and Educational Institutions Trust Professional Study Tour Services',
      href: '#',
      image: '',
    },
  ],
  'health-management-system': [
    {
      id: 1,
      title: 'End-to-End Sports Equipment Installation for Professional Facilities',
      href: '#',
      image: '',
    },
    {
      id: 2,
      title: 'Key Considerations When Designing Indoor Sports Facilities',
      href: '#',
      image: '',
    },
    {
      id: 3,
      title: 'Outdoor Sports Installation: From Planning to Execution',
      href: '#',
      image: '',
    },
    {
      id: 4,
      title: 'Ensuring Safety and Performance in Sports Facility Installation',
      href: '#',
      image: '',
    },
  ],
  'equipment-for-top-gymnasts': [
    {
      id: 1,
      title: 'The Role of Health Management Systems in Modern Training Centers',
      href: '#',
      image: '',
    },
    {
      id: 2,
      title: 'Using Technology to Monitor Physical Performance and Health',
      href: '#',
      image: '',
    },
    { id: 3, title: 'Benefits of Data-Driven Health Assessment Systems', href: '#', image: '' },
    {
      id: 4,
      title: 'Health Management Solutions for Sports Centers and Institutions',
      href: '#',
      image: '',
    },
  ],
  'sports-vision-training': [
    {
      id: 1,
      title: 'Choosing the Right Equipment for Elite Gymnast Training',
      href: '#',
      image: '',
    },
    {
      id: 2,
      title: 'International Standards for Professional Gymnastics Equipment',
      href: '#',
      image: '',
    },
    {
      id: 3,
      title: 'How Quality Equipment Impacts Gymnast Performance and Safety',
      href: '#',
      image: '',
    },
    { id: 4, title: 'Designing Training Spaces for Competitive Gymnastics', href: '#', image: '' },
  ],
  'integrated-sports-installation': [
    { id: 1, title: 'What Is Sports Vision Training and Why It Matters', href: '#', image: '' },
    {
      id: 2,
      title: 'Improving Reaction Time Through Vision Training Systems',
      href: '#',
      image: '',
    },
    { id: 3, title: 'How Visual Coordination Enhances Athletic Performance', href: '#', image: '' },
    { id: 4, title: 'Vision Training Solutions for Professional Athletes', href: '#', image: '' },
  ],
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [serviceData, allServices] = await Promise.all([getServiceBySlug(slug), getAllServices()])

  if (!serviceData) {
    notFound()
  }

  const heroImage =
    serviceData.hero && typeof serviceData.hero !== 'string' ? (serviceData.hero.url ?? '') : ''

  const serviceDetails = (serviceData.sections ?? []).map(mapSectionToServiceDetailProps)

  const moreServices = allServices.map(mapServiceToMoreServicesItem)

  const relatedArticles: RelatedArticleItem[] = RELATED_ARTICLES_DATA[slug] ?? []

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc={heroImage}
        titleLine1={serviceData.title}
        showCta={false}
        contentPosition="bottom"
      />
      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="w-full py-6 md:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-16">
            <div className="order-1 lg:order-1 lg:col-span-2 px-4 flex flex-col gap-8">
              {serviceDetails.map((item, index) => (
                <ServiceDetail key={item._id || index} {...item} />
              ))}
            </div>

            <div className="order-4 mt-8 px-4 lg:order-2 lg:col-span-1 lg:mt-0">
              {relatedArticles.length > 0 && <RelatedArticle articles={relatedArticles} />}
            </div>

            <div className="order-2 pt-4 lg:order-3 col-span-3">
              <CTAFooter variant="light" />
            </div>

            <div className="order-3 w-full pt-4 pb-8 px-4 md:pb-16 lg:order-4 lg:col-span-3 lg:pt-8">
              <MoreServices services={moreServices} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
