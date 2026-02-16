'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { NAV_ITEMS } from '@/const/navigation'
import { MapPinAreaIcon, PhoneIcon, EnvelopeIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const ContactSection = () => {
  const t = useTranslations('Home.ContactSection')
  const router = useRouter()

  const Path = NAV_ITEMS.find((item) => item.name === 'Contact Us')?.href || '#'

  return (
    <div className="w-full flex flex-col">
      <div className="bg-base-content text-light py-6 md:py-14 px-4 text-center">
        <h2>
          {t(`title1`)}
          <br />
          {t(`title2`)}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row w-full min-h-120">
        <div className="w-full md:w-[40%] h-90 md:h-auto relative order-2 md:order-1">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=Ek+Thaksin+Rd,+Pathum+Thani&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 w-full h-full"
            title="Google Map"
            loading="lazy"
          ></iframe>
        </div>

        <div className="w-full md:w-[60%] relative flex flex-col justify-center p-8 md:p-20 order-1 md:order-2 md:min-h-125">
          <div className="absolute inset-0 z-0">
            <div className="hidden md:block relative w-full h-full">
              <Image
                src="/Contact Section BG Desktop.png"
                alt="BG Desktop"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="block md:hidden relative w-full h-full">
              <Image
                src="/Contact Section BG Mobile.png"
                alt="BG Mobile"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-base-content/70" />
          </div>

          <div className="relative z-10 w-full max-w-lg md:max-w-2xl md:mr-auto">
            <h2 className="text-light mb-4 md:my-12">Meet Us</h2>

            <div className="flex flex-col gap-2 md:gap-6">
              <div className="flex items-start gap-4">
                <MapPinAreaIcon weight="fill" className="w-4 md:w-8 h-4 md:h-8 text-secondary" />
                <p className="text-xs md:text-2xl font-medium font-body text-light">
                  Ek Thaksin Road, Pathum Thani
                </p>
              </div>

              <div className="flex items-start gap-4">
                <PhoneIcon weight="fill" className="w-4 md:w-8 h-4 md:h-8 text-secondary" />
                <p className="text-xs md:text-2xl font-medium font-body text-light">
                  06-4927504258
                </p>
              </div>

              <div className="flex items-start gap-4">
                <EnvelopeIcon weight="fill" className="w-4 md:w-8 h-4 md:h-8 text-secondary" />
                <p className="text-xs md:text-2xl font-medium font-body text-light">
                  kheo@12gmail.com
                </p>
              </div>
            </div>

            <div className="mt-6 md:-mt-10 flex justify-start md:justify-end">
              <Button
                size="sm"
                onClick={() => router.push(Path)}
                className="w-27 md:w-38.5 h-7 md:h-12"
              >
                <span className="text-light">Contact Us</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
