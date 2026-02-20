'use client'

import React from 'react'
import Image from 'next/image'
import { HeroCarousel } from '@/components/carousel/HeroCarousel'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

import heroBg1 from '@/assets/d048eb9439e681c322341cf84065711c767aa9b7.png'
import gymEquipImg from '@/assets/2333e2e983810b68fda29635701f7e8ec2321d91.jpg'
import outdoorFitnessImg from '@/assets/9569b11f338e44ba2f832f22f1d53659ce5edca0.jpg'

export const OurProducts = () => {
  const t = useTranslations('Home.Product')

  const categoryKeys = ['gymEquipment', 'outdoorFitness', 'gymnasticsEquipment'] as const
  const categoryImages = [gymEquipImg, outdoorFitnessImg, heroBg1]

  const heroImages = categoryImages.map((img, index) => ({
    src: img,
    alt: t(`categories.${categoryKeys[index]}.title`),
    id: `product-hero-${index}`,
  }))

  const [activeIndex, setActiveIndex] = React.useState(2)
  const activeKey = categoryKeys[activeIndex]

  const advanceSlide = () => {
    setActiveIndex((prev) => (prev + 1) % categoryKeys.length)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-40 bg-header-bg px-4 flex justify-center items-center">
        <h2 className="text-header">{t('title')}</h2>
      </div>

      <section className="relative w-full hero-wrapper-height h-full max-h-170 overflow-hidden text-primary-content transition-all duration-500">
        <HeroCarousel
          images={heroImages}
          activeIndex={activeIndex}
          onSlideChange={setActiveIndex}
          interval={5000}
        />

        <div className="absolute inset-0 z-10 container px-13 py-12 flex flex-col justify-end md:justify-center pointer-events-none mx-auto ">
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full h-full pb-16 md:pb-0 gap-8">
            <div className="max-w-2xl flex flex-col gap-4 pointer-events-auto">
              <h1 className=" leading-tight tracking-wide transition-all duration-300">
                {t(`categories.${activeKey}.displayTitle_line1`)}
                <br />
                {t(`categories.${activeKey}.displayTitle_line2`)}
              </h1>
              <p className="body-md transition-all duration-300">
                {t(`categories.${activeKey}.description`)}
              </p>
            </div>

            <div className="flex gap-3 items-end pointer-events-auto w-full md:w-auto md:self-end min-h-55 md:min-h-65">
              <AnimatePresence mode="popLayout">
                {[1, 2].map((offset) => {
                  const index = (activeIndex + offset) % categoryKeys.length
                  const key = categoryKeys[index]
                  const isLeft = offset === 1

                  return (
                    <motion.div
                      layout
                      key={index}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      onClick={isLeft ? advanceSlide : undefined}
                      className={
                        isLeft
                          ? 'group relative w-45 h-55 md:w-50 md:h-65 rounded-2xl overflow-hidden shrink-0 border-2 border-transparent hover-border-light-50 text-left cursor-pointer'
                          : 'relative w-33.75 h-41.25 md:w-37.5 md:h-48.75 rounded-xl overflow-hidden shrink-0 pointer-events-none'
                      }
                    >
                      <Image
                        src={categoryImages[index]}
                        alt={t(`categories.${key}.title`)}
                        fill
                        className="object-cover object-center"
                      />
                      <div
                        className={
                          isLeft
                            ? 'absolute inset-0 bg-gradient-card-left'
                            : 'absolute inset-0 bg-gradient-card-right '
                        }
                      />
                      <div
                        className={
                          isLeft
                            ? 'absolute bottom-4 left-4 text-primary-content font-medium text-lg leading-tight'
                            : 'absolute bottom-1 left-1 text-subtle font-medium text-xs leading-tight'
                        }
                      >
                        {t(`categories.${key}.title`)}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
