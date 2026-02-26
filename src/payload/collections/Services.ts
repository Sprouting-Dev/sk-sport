import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'hero',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'service-media',
    },
    {
      name: 'sections',
      label: 'Sections',
      type: 'array',
      fields: [
        {
          name: 'sectionTitle',
          label: 'Section Title',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
        {
          name: 'variant',
          label: 'Variant',
          type: 'select',
          options: [
            { label: 'Column', value: 'column' },
            { label: 'Row', value: 'row' },
          ],
          defaultValue: 'column',
        },
        {
          name: 'images',
          label: 'Images',
          type: 'array',
          admin: {
            condition: ({ siblingData }: { siblingData?: { variant?: string } }) =>
              siblingData?.variant === 'column',
          },
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'service-media',
            },
          ],
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'service-media',
          admin: {
            condition: ({ siblingData }: { siblingData?: { variant?: string } }) =>
              siblingData?.variant === 'row',
          },
        },
        {
          name: 'alignment',
          label: 'Alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
          admin: {
            condition: ({ siblingData }: { siblingData?: { variant?: string } }) =>
              siblingData?.variant === 'row',
          },
        },
      ],
    },
  ],
}
