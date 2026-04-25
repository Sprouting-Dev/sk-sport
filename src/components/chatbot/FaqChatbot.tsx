'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChatCircleDotsIcon, XIcon, ArrowRightIcon, CaretLeftIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqChatbotProps {
  faqItems: FaqItem[]
}

type ChatResult = { type: 'answer'; item: FaqItem } | { type: 'no-match' }

function matchFaq(input: string, items: FaqItem[]): FaqItem | null {
  const words = input
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1)
  if (words.length === 0) return null

  let best: FaqItem | null = null
  let bestScore = 0

  for (const item of items) {
    const haystack = `${item.question} ${item.answer}`.toLowerCase()
    const score = words.filter((w) => haystack.includes(w)).length
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }

  return bestScore >= 1 ? best : null
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text
}

export function FaqChatbot({ faqItems }: FaqChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ChatResult | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && result === null) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, result])

  const hasFaqs = faqItems.length > 0
  const suggested = faqItems.slice(0, 4)

  const handleQuery = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    const match = matchFaq(trimmed, faqItems)
    setResult(match ? { type: 'answer', item: match } : { type: 'no-match' })
    setInput('')
  }

  const handleBack = () => {
    setResult(null)
    setInput('')
  }

  const handleClose = () => {
    setIsOpen(false)
    setResult(null)
    setInput('')
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 flex flex-col overflow-hidden rounded-box border border-base-300 bg-primary-content shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <ChatCircleDotsIcon className="h-5 w-5 text-primary-content" weight="fill" />
              <span className="text-sm font-semibold text-primary-content">FAQ Assistant</span>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close chatbot"
              className="text-primary-content/70 transition-colors hover:text-primary-content"
            >
              <XIcon className="h-5 w-5" weight="bold" />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 p-4">
            {result === null && !hasFaqs && (
              <div className="flex flex-col gap-3">
                <p className="body-sm text-base-content">
                  Hi! Our team is here to help with any questions about products or services.
                </p>
                <Link
                  href="/contact"
                  onClick={handleClose}
                  className="btn btn-gradient-solid-border btn-sm w-full"
                >
                  <span className="flex items-center gap-1 text-primary">
                    Contact Us
                    <ArrowRightIcon className="h-4 w-4" weight="bold" />
                  </span>
                </Link>
              </div>
            )}

            {result === null && hasFaqs && (
              <>
                <p className="body-sm text-base-content">
                  Hi! Ask me anything or pick a suggested question below.
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggested.map((item) => (
                    <button
                      key={item.question}
                      onClick={() => handleQuery(item.question)}
                      className="rounded-full border border-primary bg-primary-content px-3 py-1 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-content"
                    >
                      {truncate(item.question, 48)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {result?.type === 'answer' && (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {result.item.question}
                </p>
                <p className="body-sm leading-relaxed text-base-content">{result.item.answer}</p>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <CaretLeftIcon className="h-3 w-3" weight="bold" />
                  Back to questions
                </button>
              </div>
            )}

            {result?.type === 'no-match' && (
              <div className="flex flex-col gap-3">
                <p className="body-sm text-base-content">
                  Sorry, I couldn&apos;t find an answer to that. Our team is happy to help.
                </p>
                <Link
                  href="/contact"
                  onClick={handleClose}
                  className={cn('btn btn-gradient-solid-border btn-sm w-full')}
                >
                  <span className="flex items-center gap-1 text-primary">
                    Contact Us
                    <ArrowRightIcon className="h-4 w-4" weight="bold" />
                  </span>
                </Link>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <CaretLeftIcon className="h-3 w-3" weight="bold" />
                  Back to questions
                </button>
              </div>
            )}
          </div>

          {/* Input row — only shown on home state when FAQs exist */}
          {result === null && hasFaqs && (
            <div className="flex gap-2 border-t border-base-300 p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuery(input)
                }}
                placeholder="Type your question…"
                className="flex-1 rounded-xl border border-base-300 bg-secondary-content px-3 py-2 text-sm outline-none transition-all focus:border-secondary focus:ring-1 focus:ring-secondary"
              />
              <button
                onClick={() => handleQuery(input)}
                disabled={!input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition-opacity disabled:opacity-40"
              >
                <ArrowRightIcon className="h-4 w-4" weight="bold" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        aria-label={isOpen ? 'Close FAQ chatbot' : 'Open FAQ chatbot'}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" weight="bold" />
        ) : (
          <ChatCircleDotsIcon className="h-6 w-6" weight="fill" />
        )}
      </button>
    </div>
  )
}
