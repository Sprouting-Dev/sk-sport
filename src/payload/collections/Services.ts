import type { CollectionConfig } from 'payload'
import type { Service } from '../../payload-types'

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
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'descriptions',
      label: 'Descriptions',
      type: 'textarea',
    },
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      admin: {
        condition: (_: Partial<Service>, siblingData: Partial<Service>) =>
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
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'service-media',
      admin: {
        condition: (_: Partial<Service>, siblingData: Partial<Service>) =>
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
        condition: (_: Partial<Service>, siblingData: Partial<Service>) =>
          siblingData?.variant === 'row',
      },
    },
    {
      name: 'slug',
      label: 'Slug (Title as default)',
      type: 'text',
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
