'use client'

import React from 'react'
import { ServiceCard } from '@/components/card'
import { SupportCard } from '@/components/card/supportCard'
import { Basketball, Heartbeat, Info } from '@phosphor-icons/react/dist/ssr'

export const Services = () => {
  return (
    <section className="w-full">
      <div className="text-center p-12 text-primary space-y-4">
        <h2>Our Services</h2>
        <p className="body-sm text-primary text-center">
          Professional solution for sports facility development
        </p>
      </div>

      <div className="w-full">
        <div className="mb-2 grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
          <ServiceCard
            title={`Gymnastic Equipment\nInstallation`}
            description={`Lorem ipsum dolor sit amet\ncon . Purus suscipit pellentesque.\nLorem ipsum\ndolor sit amet con.`}
            image="/gymnastic-equipment.png"
            href="/services/gymnastic-equipment"
            buttonText="Learn more"
            imageAlt="Gymnastic equipment in a modern facility"
            alignButton="bottom"
          />
          <ServiceCard
            title={`Outdoor Exercise\nEquipment`}
            description={`Lorem ipsum dolor sit amet\ncon . Purus suscipit pellentesque.\nLorem ipsum\ndolor sit amet con.`}
            image="/outdoor-exercise-equipment.png"
            href="/services/outdoor-exercise"
            buttonText="Learn more"
            imageAlt="Outdoor exercise equipment at sunset"
            alignButton="top"
          />
        </div>

        <div className="w-full px-4 pt-12">
          <div className="mb-8 text-center">
            <h2 className="text-primary">Support Services</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SupportCard
              title="Consulting & Design"
              image="/consulting-support-services.png"
              icon={<Basketball size={48} weight="light" />}
              imageAlt="Consulting and Design Services"
            />
            <SupportCard
              title="Health Care Service"
              image="/healthcare-support-services.png"
              icon={<Heartbeat size={48} weight="light" color="#FF3591" />}
              imageAlt="Health Care Services"
            />
            <SupportCard
              title="Maintenance & Support"
              image="/maintenance-support-services.png"
              icon={<Info size={48} weight="light" />}
              imageAlt="Maintenance and Support Services"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
