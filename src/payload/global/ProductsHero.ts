import { GlobalConfig } from 'payload'

export const ProductsHero: GlobalConfig = {
  slug: 'products-hero',
  admin: {
    group: 'Page Heroes',
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
      name: 'heroSubtitle',
      label: 'Hero Subtitle',
      type: 'text',
    },
    {
      name: 'eyebrow',
      label: 'Eyebrow',
      type: 'text',
      admin: {
        description:
          'Short label above the title (e.g. category). If empty, the public site uses the default “Equipment & Gear”.',
      },
    },
    {
      name: 'titleSize',
      label: 'Title size',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' },
        { label: 'Extra large', value: 'extraLarge' },
      ],
    },
    {
      name: 'bodySize',
      label: 'Subtitle / body size',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      name: 'heroMedia',
      label: 'Hero Media',
      type: 'relationship',
      relationTo: 'hero-media',
      hasMany: true,
    },
  ],
}
