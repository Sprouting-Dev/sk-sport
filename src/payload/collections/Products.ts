import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'createdAt'],
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
      name: 'category',
      label: 'Category',
      type: 'text',
    },
    {
      name: 'mode',
      label: 'Sales mode',
      type: 'select',
      required: true,
      defaultValue: 'quote',
      options: [
        { label: 'Quote only (request a quote)', value: 'quote' },
        { label: 'Buy (add to cart)', value: 'buy' },
      ],
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      min: 0,
      admin: {
        description: 'Use when mode is Buy (e.g. price in THB).',
        condition: (data) => (data as { mode?: string }).mode === 'buy',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'relationship',
      relationTo: 'gallery-media',
      hasMany: false,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
