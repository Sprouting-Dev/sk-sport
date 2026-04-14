import { GlobalConfig } from 'payload'

export const TermsOfService: GlobalConfig = {
  slug: 'terms-of-service',
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
      name: 'lastUpdated',
      label: 'Last Updated',
      type: 'text',
      admin: {
        description: 'e.g. January 2025',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
    },
  ],
}
