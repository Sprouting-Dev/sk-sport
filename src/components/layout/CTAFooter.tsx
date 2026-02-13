'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const CTAFooter = () => {
  const pathname = usePathname()
  // Show on Home ('/')
  // Show on Single Pages
  const isHome = pathname === '/'
  const isSinglePage =
    // pathname.startsWith('/services/') ||
    pathname.includes('united-discovery') ||
    pathname.includes('health-management-system') ||
    pathname.includes('equipment-for-top-gymnasts')

  const shouldShow = isHome || isSinglePage

  if (!shouldShow) {
    return null
  }

  return (
    <div className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Need a complete sport facility solution ?</h2>
        <Link href="/contact" className="cta-button">
          Contact Our Team
        </Link>
      </div>
    </div>
  )
}
