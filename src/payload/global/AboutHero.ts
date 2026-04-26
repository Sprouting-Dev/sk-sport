import { GlobalConfig } from 'payload'

export const AboutHero: GlobalConfig = {
  slug: 'about-hero',
  admin: {
    group: 'Page Heroes',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'หัวข้อหลักหน้า About (Hero)',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      label: 'คำอธิบายใต้หัวข้อ (Hero)',
      type: 'text',
    },
    {
      name: 'heroTitleFontSize',
      label: 'ขนาดหัวข้อ Hero หน้า About (px)',
      type: 'number',
      defaultValue: 56,
      min: 32,
      max: 96,
      admin: {
        description: 'ใช้กำหนดขนาดตัวอักษรของหัวข้อหลัก บนส่วน Hero หน้า About',
      },
    },
    {
      name: 'heroSubtitleFontSize',
      label: 'ขนาดคำอธิบาย Hero หน้า About (px)',
      type: 'number',
      defaultValue: 20,
      min: 14,
      max: 32,
      admin: {
        description: 'ใช้กำหนดขนาดตัวอักษรของคำอธิบาย ใต้หัวข้อบน Hero หน้า About',
      },
    },
    {
      name: 'heroMedia',
      label: 'รูปภาพ Hero',
      type: 'relationship',
      relationTo: 'hero-media',
      hasMany: true,
    },
  ],
}
