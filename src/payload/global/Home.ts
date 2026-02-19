import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroMedia',
      label: 'Hero Media',
      type: 'relationship',
      relationTo: 'hero-media',
      hasMany: true,
    },
  ],
}
