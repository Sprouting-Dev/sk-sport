'use client'

import React, { useCallback, useMemo } from 'react'
import { useFormFields, usePayloadAPI } from '@payloadcms/ui'

import type { PaymentSlip } from '@/payload-types'

function slipIdFromFormValue(v: string | { id: string } | null | undefined): string | null {
  if (v == null) return null
  if (typeof v === 'string' && v.trim() !== '') return v
  if (typeof v === 'object' && v !== null && 'id' in v && typeof v.id === 'string') return v.id
  return null
}

function extractDoc(
  data: unknown,
): Pick<PaymentSlip, 'id' | 'url' | 'mimeType' | 'filename' | 'alt'> | null {
  if (!data || typeof data !== 'object') return null
  const o = data as Record<string, unknown>
  const doc = o.doc
  if (doc && typeof doc === 'object') {
    return doc as Pick<PaymentSlip, 'id' | 'url' | 'mimeType' | 'filename' | 'alt'>
  }
  if ('id' in o && 'url' in o) {
    return o as Pick<PaymentSlip, 'id' | 'url' | 'mimeType' | 'filename' | 'alt'>
  }
  return null
}

/**
 * Form state tuple from @payloadcms/ui: [fields, dispatch] — we only read `slip` for preview.
 * Note: do not use `useField` here: it calls `useConfig`, which is not available in this UI
 * field’s render path; `useFormFields` only needs the form context.
 */
const selectSlipValue = (formState: unknown): unknown => {
  if (!Array.isArray(formState) || formState.length < 1) return undefined
  const fields = formState[0] as Record<string, { value?: unknown }> | undefined
  return fields?.slip?.value
}

/**
 * Admin UI: shows payment slip preview (image) or open-PDF action next to the `slip` relationship.
 * Does not duplicate file data; reads via REST using the same slip id.
 */
export default function OrderSlipPreviewField() {
  const readSlip = useCallback((state: unknown) => selectSlipValue(state), [])
  const slipRaw = useFormFields(readSlip)
  const slipId = useMemo(
    () => slipIdFromFormValue(slipRaw as string | { id: string } | null | undefined),
    [slipRaw],
  )

  const apiPath = useMemo(() => (slipId ? `/api/payment-slips/${slipId}` : ''), [slipId])

  const [apiState] = usePayloadAPI(apiPath, {})
  const { data, isLoading, isError } = apiState

  const doc = useMemo(() => extractDoc(data), [data])
  const url = doc?.url && typeof doc.url === 'string' ? doc.url : null
  const mime = doc?.mimeType && typeof doc.mimeType === 'string' ? doc.mimeType : null
  const adminSlipUrl = slipId ? `/admin/collections/payment-slips/${slipId}` : null

  if (!slipId) {
    return (
      <div className="field-type">
        <p style={{ color: 'var(--theme-elevation-500)', fontSize: 13, margin: 0 }}>
          Select a payment slip above to see a preview.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="field-type">
        <p style={{ fontSize: 13, margin: 0 }}>Loading slip…</p>
      </div>
    )
  }

  if (isError || !doc) {
    return (
      <div className="field-type">
        <p style={{ color: 'var(--theme-error-500)', fontSize: 13, margin: 0 }}>
          Could not load slip preview. Open the document from the relationship or the link below.
        </p>
        {adminSlipUrl ? (
          <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13 }}>
            <a href={adminSlipUrl} rel="noreferrer" target="_blank">
              Open payment slip in admin
            </a>
          </p>
        ) : null}
      </div>
    )
  }

  const isImage = Boolean(mime && mime.startsWith('image/'))
  const isPdf = mime === 'application/pdf'

  return (
    <div className="field-type" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {isImage && url ? (
        <div
          style={{
            maxWidth: 420,
            border: '1px solid var(--theme-elevation-100)',
            borderRadius: 4,
            padding: 8,
            background: 'var(--theme-elevation-50)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Payload admin: S3 or storage URL in CMS */}
          <img
            src={url}
            alt={doc.alt || 'Payment slip'}
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      ) : null}

      {!isImage && url ? (
        <p style={{ margin: 0, fontSize: 13 }}>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            style={{ fontWeight: isPdf ? 600 : undefined }}
          >
            {isPdf ? 'Open PDF' : 'Open slip file'}
          </a>
          {mime ? <span style={{ color: 'var(--theme-elevation-500)' }}> ({mime})</span> : null}
        </p>
      ) : null}

      {adminSlipUrl ? (
        <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-elevation-500)' }}>
          <a href={adminSlipUrl} rel="noreferrer" target="_blank">
            Open full payment slip document in admin
          </a>
        </p>
      ) : null}
    </div>
  )
}
