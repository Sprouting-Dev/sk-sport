'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface MarqueeProps {
  children: React.ReactNode
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

export const Marquee = ({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 20,
  className,
}: MarqueeProps) => {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className={cn('flex w-full overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex shrink-0 gap-4 px-4"
        animate={{
          x: isPaused ? undefined : direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{ x: isPaused ? undefined : 0 }}
      >
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  )
}
