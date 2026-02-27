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
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g. "united-discovery")',
      },
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
          name: 'serviceTitle',
          label: 'Service Title',
          type: 'text',
        },
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
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
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
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
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
            condition: (_: Partial<Service>, siblingData: { variant?: string }) =>
              siblingData?.variant === 'row',
          },
        },
      ],
    },
  ],
}
