import { GlobalConfig } from 'payload'

export const Faq: GlobalConfig = {
  slug: 'faq',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'Hero Title',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      label: 'Hero Subtitle / Intro',
      type: 'textarea',
    },
    {
      name: 'faqItems',
      label: 'FAQ Items',
      type: 'array',
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
