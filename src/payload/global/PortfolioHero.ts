import { GlobalConfig } from 'payload'

export const PortfolioHero: GlobalConfig = {
  slug: 'portfolio-hero',
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
      name: 'heroMedia',
      label: 'Hero Media',
      type: 'relationship',
      relationTo: 'hero-media',
      hasMany: true,
    },
  ],
}
