import type { CollectionConfig } from 'payload'

export const PortfolioArticles: CollectionConfig = {
  slug: 'portfolio-articles',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'tag', 'highlight', 'createdAt'],
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
      name: 'highlight',
      label: 'Highlight',
      type: 'checkbox',
    },
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
    },
    {
      name: 'sectionDetail',
      label: 'Section Detail',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sectionImage',
      label: 'Section Image',
      type: 'relationship',
      relationTo: 'gallery-media',
      hasMany: false,
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'relationship',
      relationTo: 'gallery-media',
      hasMany: true,
    },
    {
      name: 'tag',
      label: 'Tag',
      type: 'text',
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
