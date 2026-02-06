'use client'

import React from 'react'
import { HeroCarousel } from './HeroCarousel'
import heroBg3 from '../assets/banner-test3.jpg'
import heroBg2 from '../assets/bannner-test2.jpg'
import heroBg1 from '../assets/d048eb9439e681c322341cf84065711c767aa9b7.png'

export const Hero: React.FC = () => {
  const carouselImages = [heroBg3, heroBg2, heroBg1]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-900 text-white">
      <HeroCarousel images={carouselImages} />

      <div className="relative z-10 flex h-full w-full max-w-[468px] flex-col justify-center px-24 py-24 pointer-events-none bg-black/40 gap-9">
        <div className="max-w-xl flex flex-col pointer-events-auto gap-6">
          <h1 className="h1">
            <span className="block text-white">PUSH</span>
            <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              BEYOND
            </span>
            <span className="block text-white">LIMITS</span>
          </h1>

          <p className="body-sm">
            Your Partner for World-Class Sports Facility Development. Lorem ipsum dolor sit amet
            consectetur.
          </p>
        </div>
        <button className="btn btn-gradient-solid-border btn-sm-typo text-white  w-[154px]">
          <span>Contact Us</span>
        </button>
      </div>
    </section>
  )
}
