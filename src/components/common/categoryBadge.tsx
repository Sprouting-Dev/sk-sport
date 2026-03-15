import React from 'react'
import { cn } from '@/utils/cn'

export interface CategoryBadgeProps {
  text: string
  className?: string
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ text, className }) => {
  if (!text) return null

  return (
    <div
      className={cn(
        'inline-flex h-7 md:h-10 rounded-lg p-0.25 bg-gradient-to-r from-primary to-secondary',
        className
      )}
    >
      <span className="flex h-full w-full items-center justify-center bg-primary-content text-primary body-sm px-4 rounded-lg uppercase">
        {text}
      </span>
    </div>
  )
}