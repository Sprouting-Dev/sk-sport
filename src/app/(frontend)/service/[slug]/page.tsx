'use client'

import { useParams } from 'next/navigation'
import { ServiceHero } from '@/components/hero/serviceHero'
import { CTAFooter } from '@/components/layout'
import {
  RelatedArticle,
  type RelatedArticleItem,
  MoreServices,
  ServiceDetail,
  type ServiceDetailProps,
} from '@/components/service'

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

const SERVICES_DATA = [
  {
    id: 1,
    title: 'United Discovery',
    image: '/Service/United Discovery.png',
    href: '/service/united-discovery',
  },
  {
    id: 2,
    title: 'Integrated Sports Installation',
    image: '/Service/Integrated Sports Installation.png',
    href: '/service/integrated-sports-installation',
  },
  {
    id: 3,
    title: 'Health Management System',
    image: '/Service/Health Management System.png',
    href: '/service/health-management-system',
  },
  {
    id: 4,
    title: 'Equipment for Top Gymnasts',
    image: '/Service/Equipment for Top Gymnasts.png',
    href: '/service/equipment-for-top-gymnasts',
  },
  {
    id: 5,
    title: 'Sports Vision Training',
    image: '/Service/Sports Vision Training.png',
    href: '/service/sports-vision-training',
  },
]

const SERVICE_DETAILS_DATA: Record<string, ServiceDetailProps[]> = {
  'united-discovery': [
    {
      serviceTitle: '',
      sectionTitle: 'Bangkok - Singapore [3 วัน 2 คืน]',
      detail:
        'มารีนา เบย์ แซนด์ - เมอร์ไลอ้อน - ล่องเรือ - ยูนิเวอร์แซล สตูดิโอ - วัดเจ้าแม่กวนอิม - น้ำพุแห่งความมั่งคั่ง - ช้อปปิ้งออร์ชาร์ด ฯลฯ บริษัท ยูไนเต็ด ดิสคัพเวอรี่ จำกัด มีความยินดีที่ได้นำท่านเหินฟ้าท้าชั้นบรรยากาศ สู่ "เกาะสิงคโปร์" ที่เป็นดั่งดินแดนสวรรค์ของนักท่องเที่ยว ไม่ว่าจะเป็น บรรยากาศ สถานที่ท่องเที่ยวกิจกรรมต่างๆ และแหล่งช้อปปิ้งของแบร์นเนมชื่อดัง จากทั่วทุกมุมโลก รวมทั้งคาสิโนแห่งแรกของประเทศสิงคโปร์ รอให้ทุกท่านร่วมสัมผัสกับประสบการณ์ใหม่ที่น่าตื่นเต้น และสุดประทับใจ',
      variant: 'row',
      alignment: 'left',
      images: ['/united-discovery/united-1.png'],
      tags: ['3 วัน', '2 คืน', 'สิงคโปร์'],
    },
    {
      serviceTitle: '',
      sectionTitle: 'Bangkok - Korea [5 วัน 4 คืน]',
      detail:
        'เกาหลี - SKI RESORT - สวนสนุกเอเวอร์แลนด์ - ซัมซุงเด็ก - กันฮยอน - SEOUL TOWER - TEDDY BEAR SHOP - หลายอย่างอีกมากมาย ทัวร์เกาหลีฤดูหนาวที่สุดประทับใจ กิจกรรมหิมะที่ได้รับความนิยมสูงสุด',
      variant: 'column',
      images: ['/united-discovery/united-3.png'],
      tags: ['5 วัน', '4 คืน', 'เกาหลี'],
    },
    {
      serviceTitle: 'Bangkok - Osaka',
      sectionTitle: 'Bangkok - Osaka [5 วัน 4 คืน]',
      detail:
        'Bangkok - Osaka (5 Fr 4คืน) เกียวโต - โตเกียวดิสนีย์แลนด์ - ยูนิเวอร์แซล สตูดิโอ - นารา - เกียวโต - โอซาก้า - โชปปิ้ง - ช้อปปิ้ง - ตลาดนัดขนาดใหญ่ 150 แห่ง เพื่อแนะนำร้านค้าที่ขายปลีกสินค้ายี่ห้อดัง นำท่านเดินทางสู่ "ไดโนซอร์" ที่ได้รับความนิยมสูงมากจากนักท่องเที่ยว รับบัตรเข้าชมแหล่ง 240 ที่สามารถนำไปใช้ นำโชค และเข้าชมความงดงามของตึกระฟ้าที่กรุงโอซาก้า',
      variant: 'row',
      alignment: 'right',
      images: ['/united-discovery/united-4.png'],
      tags: ['5 วัน', '4 คืน', 'ญี่ปุ่น'],
    },
    {
      serviceTitle: 'SPIETH World-class gymnastics',
      sectionTitle: 'Bangkok - Beijing [5 วัน 4 คืน]',
      detail:
        'Bangkok - Beijing (5 Fr 4คืน) Beijing Sports University - Beijing Research Institute of Sport Science (BISS) - China Institute of Sport Science (CISS) - ผู้เชี่ยวชาญจากจีน เพื่อเรียนรู้เกี่ยวกับ "วิทยาศาสตร์การกีฬา" ที่ประเทศจีน - มหาวิทยาลัยกีฬาปักกิ่ง กำแพงเมืองจีน พระราชวังฤดูร้อน พระราชวังต้องห้าม จัตุรัสเทียนอันเหมิน และอื่นๆ อีกมากมาย',
      variant: 'column',
      images: [
        '/united-discovery/united-1.png',
        '/united-discovery/united-2.png',
        '/united-discovery/united-3.png',
      ],
      tags: ['5 วัน', '4 คืน', 'จีน'],
    },
  ],
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
  const currentServiceDetails = SERVICE_DETAILS_DATA[slugValue] || []

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
            <div className="order-1 lg:order-1 lg:col-span-2 px-4 flex flex-col gap-8">
              {currentServiceDetails.map((item) => (
                <ServiceDetail key={item.sectionTitle ?? item.serviceTitle} {...item} />
              ))}
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
              <MoreServices services={SERVICES_DATA} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
