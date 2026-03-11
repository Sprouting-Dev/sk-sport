import { CollectionConfig } from 'payload'
import { render } from '@react-email/components'
import { PurchaseSuccessEmail } from '../../emails/PurchaseSuccess'
import { ThankYouEmail } from '../../emails/ThankYou'

export const EmailTests: CollectionConfig = {
  slug: 'email-tests',
  admin: {
    useAsTitle: 'recipientEmail',
    description: 'Use this collection to test sending emails.',
  },
  fields: [
    {
      name: 'emailType',
      type: 'select',
      required: true,
      options: [
        { label: 'Purchase Success', value: 'purchase-success' },
        { label: 'Thank You', value: 'thank-you' },
      ],
    },
    {
      name: 'recipientEmail',
      type: 'email',
      required: true,
      defaultValue: 'sksport.db@gmail.com',
      admin: {
        description: 'The email address to send the test email to.',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
      admin: {
        description: 'A mock customer name to insert into the email template.',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          try {
            let html = ''
            let subject = ''

            if (doc.emailType === 'purchase-success') {
              html = await render(PurchaseSuccessEmail({ customerName: doc.customerName }))
              subject = 'Purchase Successful'
            } else if (doc.emailType === 'thank-you') {
              html = await render(ThankYouEmail({ customerName: doc.customerName }))
              subject = 'Thank you for your service'
            }

            if (html && subject) {
              await req.payload.sendEmail({
                to: doc.recipientEmail,
                subject: subject,
                html: html,
              })
              req.payload.logger.info(`Test email sent successfully to ${doc.recipientEmail}`)
            }
          } catch (error) {
            req.payload.logger.error(`Error sending test email: ${error}`)
          }
        }
      },
    ],
  },
}
