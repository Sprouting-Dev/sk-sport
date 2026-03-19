'use client'

import React from 'react'
import { Button } from '../button'
import { cn } from '@/utils/cn'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export interface PaginationButtonProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const visiblePages = getVisiblePages()
  const showArrows = totalPages > 5

  return (
    <div className="mt-10 flex items-center justify-center space-x-2">
      {showArrows && currentPage > 1 && (
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          variant="primary"
          size="sm"
          className="flex h-10 w-10 items-center justify-center bg-primary-content text-base-content border-base-content/30 hover:bg-primary hover:text-primary-content transition-colors rounded-none shadow-none"
        >
          <CaretLeftIcon size={20} weight="bold" />
        </Button>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant="primary"
          size="sm"
          className={cn(
            'flex h-10 w-10 items-center justify-center border-base-content/30 transition-colors rounded-none shadow-none',
            currentPage === page
              ? 'bg-primary text-primary-content'
              : 'bg-primary-content text-base-content/80 hover:bg-primary hover:text-primary-content',
          )}
        >
          {page}
        </Button>
      ))}

      {showArrows && currentPage < totalPages && (
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          variant="primary"
          size="sm"
          className="flex h-10 w-10 items-center justify-center bg-primary-content text-base-content border-base-content/30 hover:bg-primary hover:text-primary-content transition-colors rounded-none shadow-none"
        >
          <CaretRightIcon size={20} weight="bold" />
        </Button>
      )}
    </div>
  )
}
