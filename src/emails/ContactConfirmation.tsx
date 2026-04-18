import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ContactConfirmationEmailProps {
  name: string
  phoneNumber: string
  detail: string
}

export const ContactConfirmationEmail = ({
  name,
  phoneNumber,
  detail,
}: ContactConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>We have received your message — SK Sport will be in touch soon.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank You for Contacting Us</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Thank you for reaching out to SK Sport. We have received your message and our team will
          contact you as soon as possible.
        </Text>

        <Text style={divider}>—</Text>

        <Text style={summaryHeading}>Your Submission Summary</Text>
        <Text style={label}>Name</Text>
        <Text style={value}>{name}</Text>
        <Text style={label}>Phone Number</Text>
        <Text style={value}>{phoneNumber || '—'}</Text>
        <Text style={label}>Message</Text>
        <Text style={value}>{detail || '—'}</Text>

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

const divider = {
  color: '#ccc',
  fontSize: '16px',
  margin: '24px 0',
}

export default ContactConfirmationEmail
