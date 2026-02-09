
import { useState, useRef, useEffect } from 'react'

export const useCarousel = (length: number, intervalTime: number = 10000) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      const handleScroll = () => {
        const scrollLeft = carousel.scrollLeft
        const width = carousel.offsetWidth
        const index = Math.round(scrollLeft / width)
        setCurrentSlide(index)
      }
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextSlide = (currentSlide + 1) % length
        const width = carouselRef.current.offsetWidth
        carouselRef.current.scrollTo({
          left: width * nextSlide,
          behavior: 'smooth',
        })
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [currentSlide, length, intervalTime])

  return { currentSlide, setCurrentSlide, carouselRef }
}
