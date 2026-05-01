'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { NavKey, NAV_PATHS } from '@/const/navigation'
import { MapPinAreaIcon, PhoneIcon, EnvelopeIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { CONTACT } from '@/const/contact'

type ContactSectionProps = {
  sectionTitleFontSizePx: number
  mapEmbedSrc?: string
}

export const ContactSection = ({ sectionTitleFontSizePx, mapEmbedSrc }: ContactSectionProps) => {
  const t = useTranslations('Home.ContactSection')
  const router = useRouter()

  return (
    <div className="w-full flex flex-col">
      <div className="bg-base-content text-primary-content py-6 md:py-14 px-4 text-center">
        <h2 style={{ fontSize: `${sectionTitleFontSizePx}px` }}>
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
            src={mapEmbedSrc || CONTACT.mapEmbedSrc}
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
            <h2
              className="text-primary-content mb-4 md:my-12"
              style={{ fontSize: `${sectionTitleFontSizePx}px` }}
            >
              Meet Us
            </h2>

            <div className="flex flex-col gap-2 md:gap-6">
              <div className="flex items-start gap-4">
                <MapPinAreaIcon
                  weight="fill"
                  className="w-4 md:w-8 h-4 md:h-8 text-secondary md:shrink-0 lg:shrink"
                />
                <p className="text-xs md:text-xl font-medium font-body text-primary-content">
                  {(() => {
                    const parts = CONTACT.address.split(', Bueng Yitho')
                    if (parts.length < 2) return CONTACT.address
                    return (
                      <>
                        {parts[0]},<br />
                        Bueng Yitho{parts[1]}
                      </>
                    )
                  })()}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <PhoneIcon
                  weight="fill"
                  className="w-4 md:w-8 h-4 md:h-8 text-secondary md:shrink-0 lg:shrink"
                />
                <p className="text-xs md:text-xl font-medium font-body text-primary-content">
                  {CONTACT.phone}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <EnvelopeIcon
                  weight="fill"
                  className="w-4 md:w-8 h-4 md:h-8 text-secondary md:shrink-0 lg:shrink"
                />
                <p className="text-xs md:text-xl font-medium font-body text-primary-content">
                  {CONTACT.email}
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex justify-start md:justify-end">
              <Button
                size="sm"
                onClick={() => router.push(NAV_PATHS[NavKey.CONTACT_US])}
                className="w-27 md:w-38.5 h-7 md:h-12"
              >
                <span className="text-primary-content">Contact Us</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
