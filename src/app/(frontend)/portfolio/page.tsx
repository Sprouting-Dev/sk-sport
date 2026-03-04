'use client'

import React, { useState } from 'react'
import { FilterTab } from '@/components/portfolio'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [search, setSearch] = useState('')

  return (
    <div className="w-full bg-header-bg">
      <div>
        <FilterTab
          desktopCategories={['ALL', 'VENUE', 'FACILITY', 'TRAINING']}
          mobileCategories={['ALL', 'ARTICLES', 'GALLERY']}
          activeCategory={activeTab}
          onCategoryChange={setActiveTab}
          searchQuery={search}
          onSearchChange={setSearch}
          placeholder="Search..."
        />
      </div>
    </div>
  )
}
