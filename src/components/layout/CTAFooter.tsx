'use client'

import React from 'react'
import Link from 'next/link'

export const CTAFooter = () => {
  return (
    <div className="cta-gradient-bg flex w-full items-center justify-center">
      <div className="cta-content-width flex w-full flex-col items-center justify-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <h2 className="cta-text-style font-heading font-semibold">
          Need a complete sport facility solution ?
        </h2>
        <Link
          href="/contact"
          className="font-heading cta-button-bg cta-button-bg-hover cta-text-style flex items-center justify-center gap-2.5 border border-transparent bg-clip-padding font-semibold transition-all duration-300"
        >
          Contact Our Team
        </Link>
      </div>
    </div>
  )
}
