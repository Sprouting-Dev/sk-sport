'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { cn } from '@/utils/cn'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export interface GallerySectionProps {
  photos?: { id: string | number; src: string; description: string }[]
  videos?: { id: string | number; title: string; thumbnailUrl: string; src: string }[]
}

export const GallerySection = ({ photos = [], videos = [] }: GallerySectionProps) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo')

  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const activePhoto = photos[activePhotoIndex]

  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const activeVideo = videos[activeVideoIndex]

  const photoThumbContainerRef = useRef<HTMLDivElement>(null)
  const videoThumbContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeTab === 'photo' && photoThumbContainerRef.current) {
      const container = photoThumbContainerRef.current
      const activeElement = container.children[activePhotoIndex] as HTMLElement
      if (activeElement) {
        const scrollPosition =
          activeElement.offsetLeft - container.clientWidth / 2 + activeElement.clientWidth / 2
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' })
      }
    }
  }, [activePhotoIndex, activeTab])

  useEffect(() => {
    if (activeTab === 'video' && videoThumbContainerRef.current) {
      const container = videoThumbContainerRef.current
      const activeElement = container.children[activeVideoIndex] as HTMLElement
      if (activeElement) {
        const scrollPosition =
          activeElement.offsetLeft - container.clientWidth / 2 + activeElement.clientWidth / 2
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' })
      }
    }
  }, [activeVideoIndex, activeTab])

  const handleNextPhoto = () => setActivePhotoIndex((prev) => (prev + 1) % photos.length)
  const handlePrevPhoto = () =>
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)

  const handleNextVideo = () => setActiveVideoIndex((prev) => (prev + 1) % videos.length)
  const handlePrevVideo = () =>
    setActiveVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)

  if (!photos.length && !videos.length) return null

  const TabButton = ({
    mode,
    children,
  }: {
    mode: 'photo' | 'video'
    children: React.ReactNode
  }) => (
    <Button
      onClick={() => setActiveTab(mode)}
      variant="primary"
      size="sm"
      className={cn(
        'flex-1 md:flex-none whitespace-nowrap rounded-none w-34 h-11.5 md:h-13 transition-colors duration-300 shadow-none mt-2 md:mt-0',
        activeTab === mode
          ? 'bg-gradient text-primary-content shadow-lg border-none'
          : 'bg-primary-content text-base-content/30 border-base-content/30',
      )}
    >
      {children}
    </Button>
  )

  return (
    <div className="w-full flex flex-col gap-6 mt-2 md:mt-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2>GALLERY</h2>
        <div className="flex gap-1">
          {photos.length > 0 && <TabButton mode="photo">Photo</TabButton>}
          {videos.length > 0 && <TabButton mode="video">Video</TabButton>}
        </div>
      </div>

      {activeTab === 'photo' && activePhoto && (
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-50 md:h-125 overflow-hidden rounded-xl border-2 border-base-content/10">
            <Image
              src={activePhoto.src || '/checker.png'}
              alt={activePhoto.description || 'Gallery image'}
              fill
              className="object-cover"
            />
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-content/80 hover:bg-primary-content text-base-content rounded-full p-3 md:p-4 transition-all hover:scale-110 shadow-lg"
                >
                  <CaretLeftIcon className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-content/80 hover:bg-primary-content text-base-content rounded-full p-3 md:p-4 transition-all hover:scale-110 shadow-lg"
                >
                  <CaretRightIcon className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
                </button>
              </>
            )}
          </div>

          {activePhoto.description && (
            <p className="body-sm text-base-content/80 text-center">{activePhoto.description}</p>
          )}

          <div
            ref={photoThumbContainerRef}
            className="flex overflow-x-auto gap-1 md:gap-3 p-1 mt-0 md:mt-6 no-scrollbar"
          >
            {photos.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActivePhotoIndex(index)}
                className={cn(
                  'shrink-0 relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl border-2 transition-all',
                  index === activePhotoIndex
                    ? 'border-primary scale-105'
                    : 'border-transparent hover:border-base-content/20 opacity-70 hover:opacity-100',
                )}
              >
                <Image
                  src={item.src || '/checker.png'}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'video' && activeVideo && (
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-50 md:h-125 overflow-hidden rounded-xl border-2 border-base-content/10">
            <iframe
              src={activeVideo.src}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0"
            />

            {videos.length > 1 && (
              <>
                <button
                  onClick={handlePrevVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-content/80 hover:bg-primary-content text-base-content rounded-full p-3 md:p-4 transition-all hover:scale-110 shadow-lg"
                >
                  <CaretLeftIcon className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
                </button>
                <button
                  onClick={handleNextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-content/80 hover:bg-primary-content text-base-content rounded-full p-3 md:p-4 transition-all hover:scale-110 shadow-lg"
                >
                  <CaretRightIcon className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
                </button>
              </>
            )}
          </div>

          {activeVideo.title && (
            <p className="body-sm text-base-content/80 text-center">{activeVideo.title}</p>
          )}

          <div
            ref={videoThumbContainerRef}
            className="flex overflow-x-auto gap-1 md:gap-3 p-1 mt-0 md:mt-6 no-scrollbar"
          >
            {videos.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveVideoIndex(index)}
                className={cn(
                  'shrink-0 relative w-20 h-16 md:w-28 md:h-20 overflow-hidden rounded-xl border-2 transition-all',
                  index === activeVideoIndex
                    ? 'border-primary scale-105'
                    : 'border-transparent hover:border-base-content/20 opacity-70 hover:opacity-100',
                )}
              >
                <Image
                  src={item.thumbnailUrl || '/checker.png'}
                  alt={`Video Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
