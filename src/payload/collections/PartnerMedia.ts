import type { CollectionConfig } from 'payload'

export const PartnerMedia: CollectionConfig = {
  slug: 'partner-media',
  admin: {
    group: 'Media',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'name',
      label: 'Partner name',
      type: 'text',
      required: true,
      admin: {
        description: 'Shown in admin and used as logo alt text.',
      },
    },
  ],
}
