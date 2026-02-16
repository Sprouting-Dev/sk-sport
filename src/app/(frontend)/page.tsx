'use client'

import React from 'react'
import {
  Accomplishment,
  AboutCompany,
  ContactSection,
  OurProducts,
  PartnersSection,
  Services,
} from '@/components/home'
import { CTAFooter } from '@/components/layout/CTAFooter'
import { Hero } from '@/components/hero/Hero'
import './styles.css'

const blogPosts = [
  {
    id: 1,
    image: '/Article1.png',
    date: 'July 2025',
    title: 'Asia Games Opening Ceremony',
    href: '#',
  },
  {
    id: 2,
    image: '/Article2.png',
    date: 'July 2025',
    title: 'Title of the image.',
    href: '#',
  },
  {
    id: 3,
    image: '/Article3.png',
    date: 'July 2025',
    title: 'with Thai goverment',
    href: '#',
  },
  {
    id: 4,
    image: '/Article4.png',
    date: 'July 2025',
    title: 'Title of the image.',
    href: '#',
  },
  {
    id: 5,
    image: '/Article4.png',
    date: 'July 2025',
    title: 'Title of the image.',
    href: '#',
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full flex-col items-center justify-center bg-header-bg">
      <Hero />
      <Services />
      <OurProducts />
      <Accomplishment items={blogPosts} />
      <CTAFooter />
      <AboutCompany />
      <ContactSection />
      <PartnersSection />
      <Gallery />
    </div>
  )
}
