import { CollectionConfig } from 'payload'
import { render } from '@react-email/components'
import { ContactNotificationEmail } from '../../emails/ContactNotification'
import { ContactConfirmationEmail } from '../../emails/ContactConfirmation'

const NOTIFY_TO = 'saseewirun@sksporttrading.com'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create') return
        try {
          const submittedAt = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })
          const html = await render(
            ContactNotificationEmail({
              name: doc.name ?? '',
              email: doc.email ?? '',
              phoneNumber: doc.phoneNumber ?? '',
              detail: doc.detail ?? '',
              submittedAt,
            }),
          )
          await req.payload.sendEmail({
            to: NOTIFY_TO,
            subject: `[SK-Sport] New Contact Form Submission from ${doc.name ?? 'Unknown'}`,
            html,
          })
        } catch (err) {
          req.payload.logger.error(`[Contact] notification email failed: ${err}`)
        }

        try {
          const confirmHtml = await render(
            ContactConfirmationEmail({
              name: doc.name ?? '',
              phoneNumber: doc.phoneNumber ?? '',
              detail: doc.detail ?? '',
            }),
          )
          await req.payload.sendEmail({
            to: doc.email,
            subject: 'We have received your message — SK Sport',
            html: confirmHtml,
          })
        } catch (err) {
          req.payload.logger.error(`[Contact] confirmation email failed: ${err}`)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'detail',
      type: 'textarea',
    },
  ],
}
