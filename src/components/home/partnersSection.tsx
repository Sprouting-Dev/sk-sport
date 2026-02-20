'use client'

import React from 'react'
import Image from 'next/image'

const partners = [
  {
    id: 1,
    name: 'Life Fitness',
    logo: '/Partners/LifeFitness.png',
  },
  {
    id: 2,
    name: 'NordicTrack',
    logo: '/Partners/NordicTrack.png',
  },
  {
    id: 3,
    name: 'Cybex',
    logo: '/Partners/Cybex.png',
  },
  {
    id: 4,
    name: 'Precor',
    logo: '/Partners/Precor.png',
  },
]

export const PartnersSection = () => {
  return (
    <div className="w-full bg-header-bg py-4 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="relative w-full flex justify-center items-center h-16">
              <div className="relative w-36 h-14 md:w-48 md:h-20">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(min-width: 768px) 12rem, 9rem"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
