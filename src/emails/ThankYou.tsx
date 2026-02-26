import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ThankYouEmailProps {
  customerName: string
}

export const ThankYouEmail = ({ customerName = 'Customer' }: ThankYouEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for using our services!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank You</Heading>
        <Text style={text}>Hi {customerName},</Text>
        <Text style={text}>
          We just wanted to reach out and say thank you for choosing SK Sport. We hope you had a
          great experience with our services.
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

export default ThankYouEmail
