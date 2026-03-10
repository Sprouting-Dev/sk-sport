import React from 'react'
import { PortfolioClient } from '@/components/portfolio'
import { ArticleData } from '@/components/portfolio/cardArticle'

export default async function Portfolio() {
  let fetchedArticles: ArticleData[] = []

  try {
    const res = await fetch('https://api.example.com', {})

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`)
    }

    fetchedArticles = await res.json()
  } catch (error) {
    console.error('Error fetching:', error)
  }

  return (
    <main>
      <PortfolioClient articles={fetchedArticles} />
    </main>
  )
}
