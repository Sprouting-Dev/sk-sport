'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'

interface HeroCarouselProps {
  images: StaticImageData[]
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const width = carouselRef.current.offsetWidth
      const index = Math.round(scrollLeft / width)
      setCurrentSlide(index)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="absolute inset-0 z-0">
        <div ref={carouselRef} className="carousel w-full h-full snap-x snap-mandatory">
          {images.map((img, index) => (
            <div
              key={img.src}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full h-full snap-start"
            >
              <Image
                src={img}
                alt={`Hero Background ${index + 1}`}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        {images.map((img, index) => (
          <a
            key={img.src}
            href={`#slide${index + 1}`}
            className={`rounded-full transition-all duration-300 ease-in-out ${
              currentSlide === index
                ? 'h-3 w-3 bg-pink-500'
                : 'h-3 w-3 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}
