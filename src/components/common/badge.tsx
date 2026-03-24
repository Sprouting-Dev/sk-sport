'use client'

import React from 'react'
import { SparkleIcon } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

export const Badge = () => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 w-24 md:w-30 h-7 md:h-10 px-2.5 md:px-4 rounded-lg bg-primary body-sm text-primary-content',
      )}
    >
      <span className="flex items-center justify-center w-4 h-4">
        <SparkleIcon />
      </span>

      <span>NEWEST</span>
    </div>
  )
}
