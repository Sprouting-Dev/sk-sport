import type { CollectionConfig } from 'payload'

function slugify(name: string): string {
  const s = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'founder'
}

export const Founders: CollectionConfig = {
  slug: 'founders',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role', 'sortOrder', 'isVisible'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'URL segment for the detail page. Left empty, it is generated from the name on save.',
      },
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
    },
    {
      name: 'excerpt',
      label: 'Short description (About page card)',
      type: 'textarea',
    },
    {
      name: 'description',
      label: 'Full description (detail page)',
      type: 'textarea',
    },
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
    },
    {
      name: 'aboutImage',
      label: 'Image (About page card)',
      type: 'relationship',
      relationTo: ['hero-media', 'gallery-media'],
    },
    {
      name: 'gallery',
      label: 'Gallery (detail page only)',
      type: 'relationship',
      relationTo: ['hero-media', 'gallery-media'],
      hasMany: true,
    },
    {
      name: 'sortOrder',
      label: 'Sort order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first on the About page.',
      },
    },
    {
      name: 'isVisible',
      label: 'Visible on site',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data
        const name = typeof data.name === 'string' ? data.name : ''
        const rawSlug = typeof data.slug === 'string' ? data.slug : ''
        const slug = rawSlug.trim()
        if (name && !slug) {
          data.slug = slugify(name)
        }
        return data
      },
    ],
  },
}
