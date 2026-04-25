import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

import type { LineItemRow } from './OrderNotification'

export interface OrderConfirmationEmailProps {
  customerName: string
  orderId: string
  subtotalLabel: string
  currency: string
  statusLabel: string
  paymentMethodLabel: string
  lineItems: LineItemRow[]
  submittedAt: string
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  subtotalLabel,
  currency,
  statusLabel,
  paymentMethodLabel,
  lineItems,
  submittedAt,
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>We have received your order — order {orderId}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for your order</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          We have received your order and will verify your payment. You will receive another update
          from us if we need more information.
        </Text>
        <Text style={meta}>
          Order ID: {orderId}
          <br />
          Submitted: {submittedAt}
        </Text>

        <Text style={divider}>—</Text>

        <Text style={summaryHeading}>Order summary</Text>
        <Text style={label}>Status</Text>
        <Text style={value}>{statusLabel}</Text>
        <Text style={label}>Payment method</Text>
        <Text style={value}>{paymentMethodLabel}</Text>
        <Text style={label}>Subtotal</Text>
        <Text style={value}>
          {subtotalLabel} ({currency})
        </Text>

        <Text style={label}>Line items</Text>
        {lineItems.length === 0 ? (
          <Text style={value}>—</Text>
        ) : (
          lineItems.map((line, i) => (
            <Text key={i} style={lineBlock}>
              <span style={lineTitle}>{line.title}</span>
              <br />
              Qty: {line.quantity} · Line: {line.lineTotalLabel}
            </Text>
          ))
        )}

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
  fontWeight: 'bold',
  paddingTop: '32px',
  paddingBottom: '16px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

const meta = {
  color: '#888',
  fontSize: '13px',
  lineHeight: '20px',
  marginTop: '16px',
  marginBottom: '8px',
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
  margin: '8px 0 0',
}

const lineTitle = {
  fontWeight: 600,
}

const divider = {
  color: '#ccc',
  fontSize: '16px',
  margin: '24px 0',
}

export default OrderConfirmationEmail
