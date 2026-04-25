import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

export interface LineItemRow {
  title: string
  quantity: number
  unitPriceLabel: string
  lineTotalLabel: string
}

export interface OrderNotificationEmailProps {
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  customerNote: string
  subtotalLabel: string
  currency: string
  statusLabel: string
  paymentMethodLabel: string
  lineItems: LineItemRow[]
  slipId: string | null
  slipUrl: string | null
  /** From PaymentSlip when available; used for image preview vs link-only (e.g. PDF). */
  slipMimeType: string | null
  submittedAt: string
}

export const OrderNotificationEmail = ({
  orderId,
  customerName,
  email,
  phone,
  address,
  customerNote,
  subtotalLabel,
  currency,
  statusLabel,
  paymentMethodLabel,
  lineItems,
  slipId,
  slipUrl,
  slipMimeType,
  submittedAt,
}: OrderNotificationEmailProps) => {
  const isImageSlip = Boolean(
    slipUrl && slipMimeType && slipMimeType.toLowerCase().startsWith('image/'),
  )
  return (
    <Html>
      <Head />
      <Preview>
        New order {orderId} from {customerName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New order received</Heading>
          <Text style={meta}>
            Order ID: {orderId}
            <br />
            Submitted: {submittedAt}
          </Text>

          <Text style={summaryHeading}>Customer</Text>
          <Text style={label}>Name</Text>
          <Text style={value}>{customerName}</Text>
          <Text style={label}>Email</Text>
          <Text style={value}>{email}</Text>
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
          <Text style={label}>Address</Text>
          <Text style={value}>{address || '—'}</Text>
          <Text style={label}>Customer note</Text>
          <Text style={value}>{customerNote || '—'}</Text>

          <Text style={divider}>—</Text>

          <Text style={summaryHeading}>Order</Text>
          <Text style={label}>Status</Text>
          <Text style={value}>{statusLabel}</Text>
          <Text style={label}>Payment method</Text>
          <Text style={value}>{paymentMethodLabel}</Text>
          <Text style={label}>Subtotal</Text>
          <Text style={value}>
            {subtotalLabel} ({currency})
          </Text>

          <Text style={divider}>—</Text>

          <Text style={summaryHeading}>Line items</Text>
          {lineItems.length === 0 ? (
            <Text style={value}>—</Text>
          ) : (
            lineItems.map((line, i) => (
              <Text key={i} style={lineBlock}>
                <span style={lineTitle}>{line.title}</span>
                <br />
                Qty: {line.quantity} · Unit: {line.unitPriceLabel} · Line: {line.lineTotalLabel}
              </Text>
            ))
          )}

          <Text style={divider}>—</Text>

          <Text style={summaryHeading}>Payment slip</Text>
          {slipUrl ? (
            <>
              {isImageSlip ? (
                <Section style={slipPreviewWrap}>
                  <Img
                    src={slipUrl}
                    alt="Payment slip preview"
                    width={320}
                    height="auto"
                    style={slipPreviewImg}
                  />
                </Section>
              ) : null}
              <Text style={slipCtaBlock}>
                <Link href={slipUrl} rel="noreferrer" style={slipCta} target="_blank">
                  Open payment slip
                </Link>
              </Text>
              {slipId ? <Text style={slipRef}>Slip ID: {slipId}</Text> : null}
            </>
          ) : (
            <Text style={value}>
              {slipId
                ? `A slip is linked (ID: ${slipId}), but a file URL is not available in this message. Check Payload admin.`
                : 'No payment slip linked to this order yet.'}
            </Text>
          )}
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  paddingTop: '32px',
  paddingBottom: '16px',
}

const meta = {
  color: '#888',
  fontSize: '13px',
  lineHeight: '20px',
  marginBottom: '24px',
}

const summaryHeading = {
  color: '#555',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  margin: '8px 0 4px',
}

const label = {
  color: '#555',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '16px 0 4px',
}

const value = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const lineBlock = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '12px 0 0',
}

const lineTitle = {
  fontWeight: 600,
}

const divider = {
  color: '#ccc',
  fontSize: '16px',
  margin: '24px 0',
}

const slipPreviewWrap = {
  margin: '0 0 16px',
}

const slipPreviewImg = {
  display: 'block' as const,
  maxWidth: '100%',
  height: 'auto',
  border: '1px solid #e5e5e5',
  borderRadius: '4px',
}

const slipCtaBlock = {
  margin: '0 0 8px',
  lineHeight: '24px',
}

/** Gmail-friendly button-like link (no JS). */
const slipCta = {
  display: 'inline-block',
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
  borderRadius: '6px',
}

const slipRef = {
  color: '#888',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0',
}

export default OrderNotificationEmail
