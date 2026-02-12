import { useState, useRef, useEffect, useCallback } from 'react'

export const useCarousel = (length: number, intervalTime: number = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const isResettingRef = useRef(false)

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const handleScroll = () => {
        if (isResettingRef.current) return
        const scrollLeft = carousel.scrollLeft
        const width = carousel.offsetWidth
        const rawIndex = Math.round(scrollLeft / width)
        const index = rawIndex >= length ? 0 : rawIndex
        setCurrentSlide(index)
      }
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [length])

  useEffect(() => {
    if (length < 2) return

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextRawIndex = currentSlide + 1
        const width = carouselRef.current.offsetWidth
        carouselRef.current.scrollTo({
          left: width * nextRawIndex,
          behavior: 'smooth',
        })

        if (nextRawIndex >= length) {
          setTimeout(() => {
            if (carouselRef.current) {
              isResettingRef.current = true
              carouselRef.current.scrollTo({ left: 0, behavior: 'instant' })
              setCurrentSlide(0)
              requestAnimationFrame(() => {
                isResettingRef.current = false
              })
            }
          }, 500)
        }
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [currentSlide, length, intervalTime])

  const scrollToSlide = useCallback(
    (index: number) => {
      if (!carouselRef.current) return
      const width = carouselRef.current.offsetWidth

      if (index > currentSlide) {
        carouselRef.current.scrollTo({
          left: width * index,
          behavior: 'smooth',
        })
      } else if (index < currentSlide) {
        if (index === 0) {
          carouselRef.current.scrollTo({
            left: width * length,
            behavior: 'smooth',
          })
          setTimeout(() => {
            if (carouselRef.current) {
              isResettingRef.current = true
              carouselRef.current.scrollTo({ left: 0, behavior: 'instant' })
              setCurrentSlide(0)
              requestAnimationFrame(() => {
                isResettingRef.current = false
              })
            }
          }, 500)
        } else {
          carouselRef.current.scrollTo({
            left: width * index,
            behavior: 'smooth',
          })
        }
      }
    },
    [currentSlide, length],
  )

  return { currentSlide, setCurrentSlide, carouselRef, scrollToSlide }
}
