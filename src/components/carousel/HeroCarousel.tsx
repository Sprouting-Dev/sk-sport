'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { Button } from '../button'

interface HeroCarouselProps {
  images: StaticImageData[]
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  const { currentSlide, carouselRef } = useCarousel(images.length)

  return (
    <>
      <div className="absolute inset-0 z-0">
        <div
          ref={carouselRef}
          className="carousel w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full h-full snap-start"
            >
              <Image
                src={img}
                alt={`Hero Background ${index + 1}`}
                fill
                className="object-cover object-center "
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="absolute md:bottom-8 bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        {images.map((img, index) => (
          <Button
            key={img.src}
            asChild
            shape="circle"
            size="sm"
            variant="ghost"
            style={{ backgroundColor: currentSlide === index ? '#EC4899' : '#475569' }}
            className="min-h-0 h-3 w-3 p-0 border-none transition-all duration-300 ease-in-out hover:brightness-110"
          >
            <a href={`#slide${index + 1}`} aria-label={`Go to slide ${index + 1}`} />
          </Button>
        ))}
      </div>
    </>
  )
}
