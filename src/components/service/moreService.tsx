'use client'

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export interface ServiceItem {
  id: number | string
  title: string
  image: string
  href: string
}

interface MoreServicesProps {
  services: ServiceItem[]
}

const arrowBtnClass =
  'drop-shadow-service-arrow absolute top-1/2 z-10 flex -translate-y-1/2 items-center p-2 text-base-content/65 transition-opacity hover:text-base-content hover:opacity-90 lg:hidden'

export const MoreServices = ({ services }: MoreServicesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [arrows, setArrows] = useState({ left: false, right: false })

  const servicesKey = services.map((s) => s.id).join(',')

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const isLg = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
    if (isLg) {
      setArrows({ left: false, right: false })
      return
    }
    const epsilon = 2
    const { scrollLeft, scrollWidth, clientWidth } = el
    const needsScroll = scrollWidth > clientWidth + epsilon
    const atStart = scrollLeft <= epsilon
    const atEnd = scrollLeft + clientWidth >= scrollWidth - epsilon
    setArrows({
      left: needsScroll && !atStart,
      right: needsScroll && !atEnd,
    })
  }, [])

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(() => updateArrows())
    ro.observe(el)
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows, { passive: true })
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => updateArrows()
    mq.addEventListener('change', onMq)
    updateArrows()
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
      mq.removeEventListener('change', onMq)
    }
  }, [updateArrows, servicesKey])

  const scrollPage = (dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <h2 className="mb-2">
          <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Explore More Services from Here
          </span>
        </h2>

        <div className="relative">
          {arrows.left ? (
            <button
              type="button"
              aria-label="Scroll services left"
              onClick={() => scrollPage(-1)}
              className={`${arrowBtnClass} left-0`}
            >
              <CaretLeftIcon className="h-7 w-7" weight="bold" />
            </button>
          ) : null}
          {arrows.right ? (
            <button
              type="button"
              aria-label="Scroll services right"
              onClick={() => scrollPage(1)}
              className={`${arrowBtnClass} right-0`}
            >
              <CaretRightIcon className="h-7 w-7" weight="bold" />
            </button>
          ) : null}

          <div
            ref={scrollRef}
            className="flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth no-scrollbar max-lg:px-8 md:max-lg:px-10 lg:grid lg:grid-cols-5 lg:gap-4 lg:px-6"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative flex h-41.5 w-34.5 shrink-0 flex-col justify-end overflow-hidden rounded-xl md:h-64.5 md:w-full"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-card-left" />

                <div className="relative z-10 flex flex-col p-4">
                  <h2 className="mb-1 md:mb-2 text-primary-content">{service.title}</h2>

                  <div className="flex justify-end mt-auto">
                    <Link
                      href={service.href}
                      className="group/btn flex items-center body-sm text-secondary"
                    >
                      View Service
                      <ArrowRightIcon className="w-5 md:w-6.25 h-5 md:h-6.25 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
