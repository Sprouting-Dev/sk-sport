'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { useCarousel } from '@/hooks/useCarousel'
import { Button } from '../button'

interface HeroCarouselProps {
  images: StaticImageData[]
  activeIndex?: number
  onSlideChange?: (index: number) => void
  interval?: number
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  activeIndex,
  onSlideChange,
  interval = 5000,
}) => {
  const { currentSlide, carouselRef, scrollToSlide } = useCarousel(images.length, interval)
  const prevActiveIndexRef = React.useRef(activeIndex)

  React.useEffect(() => {
    if (typeof activeIndex === 'number' && activeIndex !== prevActiveIndexRef.current) {
      prevActiveIndexRef.current = activeIndex
      if (activeIndex !== currentSlide) {
        scrollToSlide(activeIndex)
      }
    }
  }, [activeIndex, scrollToSlide, currentSlide])

  const prevCurrentSlideRef = React.useRef(currentSlide)

  React.useEffect(() => {
    if (currentSlide !== prevCurrentSlideRef.current) {
      prevCurrentSlideRef.current = currentSlide
      onSlideChange?.(currentSlide)
    }
  }, [currentSlide, onSlideChange])

  return (
    <>
      <div className="absolute inset-0 z-0">
        <div
          ref={carouselRef}
          className="carousel w-full h-full snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              id={`slide${index + 1}`}
              className="carousel-item relative w-full h-full snap-start shrink-0"
            >
              <Image
                src={img}
                alt={`Hero Background ${index + 1}`}
                fill
                className="object-cover object-top"
                priority={index === 0}
              />
            </div>
          ))}
          <div
            key="clone-first"
            className="carousel-item relative w-full h-full snap-start shrink-0"
          >
            <Image
              src={images[0]}
              alt="Hero Background Clone"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-overlay-gradient pointer-events-none" />
      </div>

      <div className="absolute md:bottom-8 bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        {images.map((img, index) => (
          <Button
            key={img.src}
            shape="circle"
            size="sm"
            variant="ghost"
            onClick={() => scrollToSlide(index)}
            style={{ backgroundColor: currentSlide === index ? '#EC4899' : '#475569' }}
            className="min-h-0 h-3 w-3 p-0 border-none transition-all duration-300 ease-in-out hover:brightness-110"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}
