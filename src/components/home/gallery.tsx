'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

const galleryImages = [
  '/gallery-1.png',
  '/gallery-2.png',
  '/gallery-3.png',
  '/gallery-4.png',
  '/gallery-5.png',
  '/gallery-1.png',
  '/gallery-2.png',
  '/gallery-3.png',
  '/gallery-4.png',
  '/gallery-5.png',
]

export const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -266,
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 266,
        behavior: 'smooth',
      })
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return

      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(
          (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length,
        )
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  return (
    <section className="w-full pt-10 pb-24">
      {/* Header */}
      <div className="mx-auto w-full gallery-max-width px-4">
        <h2 className="gallery-title-size gallery-title-leading gallery-title-pb">
          <span className="gallery-title-our">Our</span>
          <span> </span>
          <span className="gallery-title-gallery">Gallery</span>
        </h2>
      </div>

      {/* Gallery Strip - Edge to Edge */}
      <div className="relative mt-4 w-full gallery-container-height">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full gallery-button-bg p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Scroll left"
        >
          <CaretLeft size={32} weight="bold" />
        </button>

        {/* Image Container */}
        <div
          ref={scrollContainerRef}
          className="no-scrollbar flex h-full overflow-x-auto gallery-image-gap"
        >
          {galleryImages.map((src, index) => (
            <div
              key={`gallery-image-${index}-${src.replace(/[^a-z0-9]/gi, '')}`}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg gallery-image-width gallery-image-height"
              onClick={() => openModal(index)}
            >
              <Image src={src} alt={`Gallery ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full gallery-button-bg p-2 shadow-lg transition-all hover:scale-110"
          aria-label="Scroll right"
        >
          <CaretRight size={32} weight="bold" />
        </button>
      </div>

      {/* Modal Popup */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center gallery-modal-overlay backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative gallery-modal-top overflow-hidden gallery-modal-radius bg-light shadow-2xl gallery-modal-width gallery-modal-height"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full gallery-button-bg p-2 shadow-lg transition-all hover:scale-110"
              aria-label="Close"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full gallery-button-bg p-2 shadow-lg transition-all hover:scale-110"
              aria-label="Previous"
            >
              <CaretLeft size={32} weight="bold" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full gallery-button-bg p-2 shadow-lg transition-all hover:scale-110"
              aria-label="Next"
            >
              <CaretRight size={32} weight="bold" />
            </button>

            {/* Image */}
            <div className="relative h-full w-full">
              <Image
                src={galleryImages[selectedImageIndex]}
                alt={`Gallery ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
