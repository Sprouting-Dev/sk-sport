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
    <div className="flex w-full flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-6">
      <div className="w-full min-w-0 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <div className="flex items-center justify-start gap-1 md:hidden">
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

        <div className="hidden items-center justify-start gap-1.5 md:flex md:flex-wrap">
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

      <div className="relative w-full shrink-0 md:max-w-sm lg:max-w-xs">
        <MagnifyingGlassIcon
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/45 md:left-3.5 md:h-5 md:w-5"
          weight="bold"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="body-sm h-10 w-full border border-base-content/25 bg-primary-content pl-10 pr-3 outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-1 focus:ring-primary md:h-11 md:pl-11"
        />
      </div>
    </div>
  )
}
