import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface ContactNotificationEmailProps {
  name: string
  email: string
  phoneNumber: string
  detail: string
  submittedAt: string
}

export const ContactNotificationEmail = ({
  name,
  email,
  phoneNumber,
  detail,
  submittedAt,
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Text style={meta}>Received: {submittedAt}</Text>
        <Text style={label}>Name</Text>
        <Text style={value}>{name}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email}</Text>
        <Text style={label}>Phone Number</Text>
        <Text style={value}>{phoneNumber || '—'}</Text>
        <Text style={label}>Message / Detail</Text>
        <Text style={value}>{detail || '—'}</Text>
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

const meta = {
  color: '#888',
  fontSize: '13px',
  lineHeight: '20px',
  marginBottom: '24px',
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

export default ContactNotificationEmail
