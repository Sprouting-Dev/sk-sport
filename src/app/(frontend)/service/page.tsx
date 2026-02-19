'use client'

import React from 'react'
import { ServiceCard, ServiceCardProps } from '@/components/service/'

type Service = ServiceCardProps & { id: number }

const services: Service[] = [
  {
    id: 1,
    title: 'United Discovery',
    description: 'Professional international travel and study tour services. With extensive experience in global educational tours, we are trusted by government agencies and educational institutions for comprehensive and well-organized programs worldwide.',
    image: '/Service/United Discovery.png',
    href: "#",
    variant: 'horizontal',
  },
  {
    id: 2,
    title: 'Integrated Sports Installation',
    description: 'Design and installation of professional sports equipment for indoor and outdoor facilities.',
    image: '/Service/Integrated Sports Installation.png',
    href: "#",
    variant: 'vertical',
  },
  {
    id: 3,
    title: 'Health Management System',
    description: 'Technology-driven systems for monitoring and managing health and physical performance.',
    image: '/Service/Health Management System.png',
    href: "#",
    variant: 'vertical',
  },
  {
    id: 4,
    title: 'Equipment for Top Gymnasts',
    description: 'High-performance gymnastics equipment designed for elite athletes and international competition standards.',
    image: '/Service/Equipment for Top Gymnasts.png',
    href: "#",
    variant: 'vertical',
  },
  {
    id: 5,
    title: 'Sports Vision Training',
    description: 'Vision and coordination training systems to enhance athletic performance and reaction efficiency.',
    image: '/Service/Sports Vision Training.png',
    href: "#",
    variant: 'vertical',
  },
]

export default function ServiceePage() {
  return ( 
    <div className="flex w-full flex-col items-center justify-center bg-header-bg">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className={service.variant === 'horizontal' ? 'md:col-span-2' : 'col-span-1'}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                variant={service.variant}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}