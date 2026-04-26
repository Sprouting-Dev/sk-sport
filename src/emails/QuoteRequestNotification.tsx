import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

export interface QuoteLineForEmail {
  productId: string
  slug: string
  title: string
  category: string
  quantity: number
}

export interface QuoteRequestNotificationEmailProps {
  quoteRequestId: string
  customerName: string
  email: string
  phone: string
  companyName: string
  message: string
  lineRows: QuoteLineForEmail[]
  submittedAt: string
}

export const QuoteRequestNotificationEmail = ({
  quoteRequestId,
  customerName,
  email,
  phone,
  companyName,
  message,
  lineRows,
  submittedAt,
}: QuoteRequestNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New quote request from {customerName || 'a customer'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New quote request</Heading>
        <Text style={meta}>
          ID: {quoteRequestId}
          <br />
          Submitted: {submittedAt}
        </Text>

        <Text style={summaryHeading}>Customer</Text>
        <Text style={label}>Name</Text>
        <Text style={value}>{customerName || '—'}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email || '—'}</Text>
        <Text style={label}>Phone</Text>
        <Text style={value}>{phone || '—'}</Text>
        <Text style={label}>Company</Text>
        <Text style={value}>{companyName || '—'}</Text>
        <Text style={label}>Message</Text>
        <Text style={value}>{message || '—'}</Text>

        <Text style={summaryHeading}>Line items</Text>
        {lineRows.map((row, i) => (
          <Text key={i} style={lineBlock}>
            {row.title} × {row.quantity}
            <br />
            <span style={metaInline}>
              Product ID: {row.productId} · Slug: {row.slug} · Category: {row.category}
            </span>
          </Text>
        ))}
      </Container>
    </Body>
  </Html>
)

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
  fontWeight: 'bold' as const,
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
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  margin: '24px 0 8px',
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
  margin: '12px 0',
  paddingBottom: '8px',
  borderBottom: '1px solid #eee',
}

const metaInline = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '18px',
}

export default QuoteRequestNotificationEmail
