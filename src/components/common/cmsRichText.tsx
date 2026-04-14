'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

type CmsRichTextProps = {
  data: SerializedEditorState | null | undefined
  className?: string
}

export function CmsRichText({ data, className }: CmsRichTextProps) {
  if (!data?.root) return null
  return <RichText data={data} className={className} />
}
