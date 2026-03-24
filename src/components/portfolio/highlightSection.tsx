import React from 'react'

export interface HighlightSectionProps {
  text: string 
}

export const HighlightSection: React.FC<HighlightSectionProps> = ({ text }) => {
  if (!text) return null

  return (
    <div className="w-full bg-accent-content border-l-4 border-primary rounded-r-xl px-5 py-3">
      <p className="body-md text-base-content">
        {text}
      </p>
    </div>
  )
}