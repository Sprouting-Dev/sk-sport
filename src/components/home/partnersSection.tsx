import React from 'react'
import Image from 'next/image'

export type PartnerLogoItem = {
  id: string
  name: string
  logoUrl: string
}

type PartnersSectionProps = {
  partners: PartnerLogoItem[]
}

export const PartnersSection = ({ partners }: PartnersSectionProps) => {
  if (!partners.length) return null

  return (
    <div className="w-full bg-header-bg pt-12 pb-4 md:pt-20 md:pb-12">
      <div className="container mx-auto px-8 md:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="relative w-full flex justify-center items-center h-16">
              <div className="relative w-36 h-14 md:w-48 md:h-20">
                <Image
                  src={partner.logoUrl}
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
