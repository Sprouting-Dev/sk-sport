'use client'

import React from 'react'
import { Button } from '../button'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

export interface FilterTabProps {
  desktopCategories: string[]
  mobileCategories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

export const FilterTab: React.FC<FilterTabProps> = ({
  desktopCategories,
  mobileCategories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between p-8">
      <div className="w-full overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <div className="flex items-center justify-center gap-1 md:hidden">
          {mobileCategories.map((category) => (
            <Button
              key={`mobile-${category}`}
              onClick={() => onCategoryChange(category)}
              variant="primary"
              size="sm"
              className={`whitespace-nowrap rounded-none w-27 h-8 transition-all duration-300 shadow-none ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-content border-none'
                  : 'bg-primary-content text-base-content/30 border-base-content/30'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="hidden items-center justify-start gap-1 md:flex">
          {desktopCategories.map((category) => (
            <Button
              key={`desktop-${category}`}
              onClick={() => onCategoryChange(category)}
              variant="primary"
              size="sm"
              className={`whitespace-nowrap rounded-none w-38 h-12 transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-content border-none'
                  : 'bg-primary-content text-base-content/30 border-base-content/30'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative w-full shrink-0 md:w-105">
        <MagnifyingGlassIcon
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50"
          weight="bold"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="body-sm w-full border border-base-content/30 bg-primary-content h-9.5 md:h-12.5 pl-11 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  )
}
