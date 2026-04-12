'use client'

import React from 'react'
import Link from 'next/link'
import { ServiceCard } from '@/components/card'
import { SupportCard } from '@/components/card/supportCard'
import { BasketballIcon, HeartbeatIcon, InfoIcon } from '@phosphor-icons/react/dist/ssr'

export const Services = () => {
  return (
    <section className="w-full">
      <div className="relative text-primary space-y-4 text-center py-12 px-4">
        <h2>Our Services</h2>
        <p className="font-body">Professional solution for sports facility development</p>
        <Link
          href="/service"
          className="absolute right-4 top-1/2 -translate-y-1/2 body-sm text-primary hover:underline underline-offset-2"
        >
          View all →
        </Link>
      </div>

      {/* Services Content */}
      <div className="w-full">
        <div className="mb-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          {/* Left Card */}
          <ServiceCard
            title={`Gymnastic Equipment\nInstallation`}
            description={`From planning and positioning to anchoring and final safety checks, we deliver a complete installation service built for long-term performance.`}
            image="/gymnastic-equipment.png"
            href="/service/integrated-sports-installation"
            buttonText="Learn more"
            imageAlt="Gymnastic equipment in a modern facility"
            alignButton="bottom"
          />

          {/* Right Card */}
          <ServiceCard
            title={`Outdoor Exercise\nEquipment`}
            description={`Expert installation for every facility—aligned, secured, and tested to meet standards for safe daily training and competition readiness.`}
            image="/outdoor-exercise-equipment.png"
            href="/service"
            buttonText="Learn more"
            imageAlt="Outdoor exercise equipment at sunset"
            alignButton="bottom"
          />
        </div>

        {/* Support cards — part of the same unified services section */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 mt-2">
          <SupportCard
            title="Consulting & Design"
            image="/consulting-support-services.png"
            icon={<BasketballIcon size={48} weight="light" />}
            href="/service"
            imageAlt="Consulting and Design Services"
          />
          <SupportCard
            title="Health Care Service"
            image="/healthcare-support-services.png"
            icon={<HeartbeatIcon size={48} weight="light" color="#FF3591" />}
            href="/service"
            imageAlt="Health Care Services"
          />
          <SupportCard
            title="Maintenance & Support"
            image="/maintenance-support-services.png"
            icon={<InfoIcon size={48} weight="light" />}
            href="/service"
            imageAlt="Maintenance and Support Services"
          />
        </div>
      </div>
    </section>
  )
}
