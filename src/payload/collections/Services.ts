import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'sectionTitle', 'variants', 'createdAt'],
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
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
    },

    {
      name: 'description',
      label: 'Descriptions',
      type: 'text', //ตอนแรกเป็น richtext
      required: true,
    },

    {
      name: 'images',
      label: 'Images',
      type: 'upload',
      relationTo: 'service-media',
      hasMany: true,
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
      name: 'columns',
      label: 'Column Image / Description',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'service-media',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
        },
      ],
    },

    {
      name: 'rows',
      label: 'Row Image / Description / Alignment',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'service-media',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
        },
        {
          name: 'alignment',
          label: 'Alignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
        },
      ],
    },

    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      hasMany: true,
    },
  ],
}
