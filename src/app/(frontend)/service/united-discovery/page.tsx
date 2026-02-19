import React from 'react'
import { RelatedArticle, type RelatedArticleItem } from '@/components/service'

const RELATED_ARTICLES: RelatedArticleItem[] = [
  {
    id: 1,
    title: 'How Study Tours Enhance Global Learning Experiences',
    href: '#',
    image: '',
  },
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
]

export default function UnitedDiscoveryPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-header-bg">
      <div className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
          
          <div className="lg:col-span-2">
            <p className="body-md mb-2 md:mb-6">
                   บริษัท ยูในเต็ด ดิสคัพเวอรี่ จำกัด เป็น บริษัทในเครื่อ ยูในเต็ด สปอร์ต กรุ๊ป
              ก่อตัังขึ้นเมื่อ วันที่ 6 ตุลาคม พ.ศ 2551 ( ใบอนุญาตธุรกิจนำเที่ยวเลขที่ 11/04537 )
              ซึ่งเป็นบริษัทที่ประกอบธุกิจด้าน การท่องเทียวและการบริการ
              จองตั๋วเครื่องบินและจองโรงแรมรวมทั้งการนำทัวร์เพื่อศึกษาดูงานในต่าง ประเทศต่างๆ เช่น
              เกาหลี ญี่ปุ่น จีน อังกฤษ เอเมริกา ออสเตรเรีย แคนนาดา และอื่นๆอีกมากมายทั่วโลก
            </p>
            <p className="body-md mb-12">
                   บริษัท ยูในเต็ด ดิสคัพเวอรี่ จำกัด เป็นผู้เชี่ยวชาญในการนำเที่ยว
              และทัวร์ศึกษษดูงานทั่วโลก และด้วยประสบการณ์การนำเที่ยวในหลายประเทศที่ผ่านมา ทำให
              ้บริษัทยูในเต็ด ดิสคัพเวอรี่ จำกัด ได้รับความไว้วางใจ
              จากหน่วยงานราชการและสถาบันการศึกษาต่างๆ ให้นำเที่ยวต่างประเทศมาโดยตลอด
              ระยะเวลาที่ผ่านมา
            </p>
          </div>

          <div className="order-last lg:order-none lg:col-span-1">
            <RelatedArticle articles={RELATED_ARTICLES} />
          </div>
        </div>
      </div>
    </div>
  )
}
