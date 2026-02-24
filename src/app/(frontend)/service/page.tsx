'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { ServiceHero } from '@/components/hero/serviceHero'
import { ServiceCard, ServiceCardProps } from '@/components/service/'

type Service = ServiceCardProps & { id: number }

const services: Service[] = [
  {
    id: 1,
    title: 'United Discovery',
    description:
      'Professional international travel and study tour services. With extensive experience in global educational tours, we are trusted by government agencies and educational institutions for comprehensive and well-organized programs worldwide.',
    image: '/Service/United Discovery.png',
    href: '/service/united-discovery',
    variant: 'horizontal',
  },
  {
    id: 2,
    title: 'Integrated Sports Installation',
    description:
      'Design and installation of professional sports equipment for indoor and outdoor facilities.',
    image: '/Service/Integrated Sports Installation.png',
    href: '/service/integrated-sports-installation',
    variant: 'vertical',
  },
  {
    id: 3,
    title: 'Health Management System',
    description:
      'Technology-driven systems for monitoring and managing health and physical performance.',
    image: '/Service/Health Management System.png',
    href: '/service/health-management-system',
    variant: 'vertical',
  },
  {
    id: 4,
    title: 'Equipment for Top Gymnasts',
    description:
      'High-performance gymnastics equipment designed for elite athletes and international competition standards.',
    image: '/Service/Equipment for Top Gymnasts.png',
    href: '/service/equipment-for-top-gymnasts',
    variant: 'vertical',
  },
  {
    id: 5,
    title: 'Sports Vision Training',
    description:
      'Vision and coordination training systems to enhance athletic performance and reaction efficiency.',
    image: '/Service/Sports Vision Training.png',
    href: '/service/sports-vision-training',
    variant: 'vertical',
  },
]

export default function ServicePage() {
  const t = useTranslations('Service.Hero')

  return (
    <main className="flex w-full flex-col items-center">
      <ServiceHero
        imageSrc="/services-hero.png"
        titleLine1={t('titleLine1')}
        titleLine2={t('titleLine2')}
        subtitle={
          <>
            {t('subtitle_line1')}
            <br />
            {t('subtitle_line2')}
          </>
        }
        ctaLabel={t('cta')}
      />

      <div className="flex w-full flex-col items-center justify-center bg-header-bg">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={service.variant === 'horizontal' ? 'md:col-span-2' : 'col-span-1'}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  href={service.href}
                  variant={service.variant}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
