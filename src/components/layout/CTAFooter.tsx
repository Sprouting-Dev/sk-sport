'use client'

import React from 'react'
import { Button } from '@/components/button'
import { NavKey, NAV_PATHS } from '@/const/navigation'
import { useRouter } from 'next/navigation'

export const CTAFooter = () => {
  const router = useRouter()

  return (
    <div className="section-bg-to-left h-40 md:h-80 flex w-full items-center justify-center">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center-safe">
        <h2 className="text-primary-content font-heading font-semibold">
          Need a complete sport facility solution ?
        </h2>
        <Button
          variant="gradient"
          onClick={() => router.push(NAV_PATHS[NavKey.CONTACT_US])}
          className="h-10 md:h-27 flex items-center justify-center border border-transparent bg-clip-padding transition-all duration-300"
        >
          <h2 className="text-primary-content">Contact Our Team</h2>
        </Button>
      </div>
    </div>
  )
}
