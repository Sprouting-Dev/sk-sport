import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

import type { QuoteLineForEmail } from './QuoteRequestNotification'

export interface QuoteRequestConfirmationEmailProps {
  customerName: string
  message: string
  lineRows: QuoteLineForEmail[]
}

export const QuoteRequestConfirmationEmail = ({
  customerName,
  message,
  lineRows,
}: QuoteRequestConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>We have received your quote request — SK Sport will be in touch soon.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for your quote request</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          We have received your product quote request. Our team will review it and contact you as
          soon as possible.
        </Text>

        <Text style={divider}>—</Text>

        <Text style={summaryHeading}>Items you requested</Text>
        {lineRows.map((row, i) => (
          <Text key={i} style={lineBlock}>
            {row.title} × {row.quantity}
            {row.category && row.category !== '—' ? (
              <>
                <br />
                <span style={metaInline}>{row.category}</span>
              </>
            ) : null}
          </Text>
        ))}

        {message && message.trim() !== '' ? (
          <>
            <Text style={summaryHeading}>Your message</Text>
            <Text style={value}>{message}</Text>
          </>
        ) : null}

        <Text style={divider}>—</Text>

        <Text style={text}>
          Best regards,
          <br />
          The SK Sport Team
        </Text>
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

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const summaryHeading = {
  color: '#555',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  margin: '8px 0 4px',
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
  margin: '8px 0',
  paddingLeft: '8px',
  borderLeft: '3px solid #ccc',
}

const metaInline = {
  color: '#666',
  fontSize: '13px',
}

const divider = {
  color: '#ccc',
  fontSize: '16px',
  margin: '24px 0',
}

export default QuoteRequestConfirmationEmail
