import type { CollectionConfig } from 'payload'

export const HeroMedia: CollectionConfig = {
  slug: 'hero-media',
  admin: {
    group: 'Media',
  },
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      label: 'คำอธิบายรูป (Alt text)',
      type: 'text',
      required: true,
      admin: {
        description: 'อธิบายว่าภาพนี้คืออะไร สำหรับคนใช้ screen reader และ SEO',
      },
    },
  ],
}
