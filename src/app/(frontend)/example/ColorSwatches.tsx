'use client'

import { useMemo } from 'react'

type ColorSwatchesProps = {
  tokens: string[]
}

export default function ColorSwatches({ tokens }: ColorSwatchesProps) {
  const stableTokens = useMemo(() => tokens, [tokens])

  return (
    <ul className="grid grid-cols-2 gap-3">
      {stableTokens.map((token) => (
        <li
          className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-100 px-3 py-2 text-sm"
          key={token}
        >
          <span
            aria-hidden="true"
            className="h-6 w-6 rounded-full border border-base-300"
            style={{ backgroundColor: `var(${token})` }}
          />
          <div className="min-w-0">
            <code className="block truncate">{token}</code>
          </div>
        </li>
      ))}
    </ul>
  )
}
