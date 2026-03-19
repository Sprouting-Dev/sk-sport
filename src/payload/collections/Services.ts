import type { CollectionConfig } from 'payload'
import type { Service } from '../../payload-types'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'subtitle', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Service Subtitle',
      type: 'text',
    },
    {
      name: 'hero',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'service-media',
    },
    {
      name: 'slug',
      label: 'Slug (Title as default)',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ data, value }: { data?: Partial<Service> | null; value?: string | null }) => {
            if (!value && data && typeof data.title === 'string') {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'sections',
      label: 'Service Sections',
      type: 'array',
      fields: [
        {
          name: 'sectionTitle',
          label: 'Section Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        {
          name: 'variant',
          label: 'Layout Variant',
          type: 'select',
          options: [
            { label: 'Column (Images Grid)', value: 'column' },
            { label: 'Row (Image + Text)', value: 'row' },
          ],
          defaultValue: 'column',
          required: true,
        },
        {
          name: 'images',
          label: 'Images',
          type: 'array',
          admin: {
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
              siblingData?.variant === 'column',
          },
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'service-media',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          label: 'Single Image',
          type: 'upload',
          relationTo: 'service-media',
          admin: {
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
              siblingData?.variant === 'row',
          },
        },
        {
          name: 'alignment',
          label: 'Image Alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
          admin: {
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
              siblingData?.variant === 'row',
          },
        },
      ],
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
        },
      ],
    },
  ],
}
