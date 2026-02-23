'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react'

const services = [
  {
    id: 1,
    title: 'United Discovery',
    image: '/Service/United Discovery.png',
    href: '/service/united-discovery',
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
  {
    id: 2,
    title: 'Integrated Sports Installation',
    image: '/Service/Integrated Sports Installation.png',
    href: '/service/integrated-sports-installation',
  },
]

export const MoreServices = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <h2 className="mb-2">
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Explore More Services from Here
          </span>
        </h2>

        <div className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto no-scrollbar px-1 md:px-6 lg:grid lg:grid-cols-5 lg:gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex h-41.5 w-34.5 shrink-0 flex-col justify-end overflow-hidden rounded-xl md:h-64.5 md:w-full"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-card-left" />

              <div className="relative z-10 flex flex-col p-4">
                <h2 className="mb-1 md:mb-2 text-primary-content">
                  {service.title}
                </h2>
                
                <div className="flex justify-end mt-auto">
                  <Link
                    href={service.href}
                    className="group/btn flex items-center body-sm text-secondary"
                  >
                    View Service
                    <ArrowRightIcon
                      className="w-5 md:w-6.25 h-5 md:h-6.25 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}