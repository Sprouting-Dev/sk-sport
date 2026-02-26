import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface PurchaseSuccessEmailProps {
  customerName: string
}

export const PurchaseSuccessEmail = ({ customerName = 'Customer' }: PurchaseSuccessEmailProps) => (
  <Html>
    <Head />
    <Preview>Your purchase was successful!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Purchase Successful</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          Thank you for your purchase! Your order has been confirmed and is being processed. We will
          notify you once it has been shipped.
        </Text>
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
  paddingBottom: '32px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
}

export default PurchaseSuccessEmail
