import { GlobalConfig } from 'payload'

export const ContactHero: GlobalConfig = {
  slug: 'contact-hero',
  admin: {
    group: 'Page Heroes',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'หัวข้อหลักหน้า Contact (Hero)',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      label: 'คำอธิบายใต้หัวข้อ (Hero)',
      type: 'text',
    },
    {
      name: 'heroTitleFontSize',
      label: 'ขนาดหัวข้อ Hero หน้า Contact (px)',
      type: 'number',
      defaultValue: 56,
      min: 32,
      max: 96,
      admin: {
        description: 'ขนาดตัวอักษรของหัวข้อหลักบนแบนเนอร์หน้า Contact',
      },
    },
    {
      name: 'heroSubtitleFontSize',
      label: 'ขนาดคำอธิบาย Hero หน้า Contact (px)',
      type: 'number',
      defaultValue: 20,
      min: 14,
      max: 32,
      admin: {
        description: 'ขนาดตัวอักษรของคำอธิบายใต้หัวข้อ บนแบนเนอร์',
      },
    },
    {
      name: 'contactSectionTitleFontSize',
      label: 'ขนาดหัวข้อ Section (px)',
      type: 'number',
      defaultValue: 28,
      min: 20,
      max: 48,
      admin: {
        description: 'หัวข้อรายส่วนเช่น “Get in touch” และ “Send us message” (คอลัมน์หลัก)',
      },
    },
    {
      name: 'contactInfoTitleFontSize',
      label: 'ขนาดหัวข้อกล่องข้อมูล (px)',
      type: 'number',
      defaultValue: 18,
      min: 14,
      max: 32,
      admin: {
        description: 'หัวข้อย่อยเช่น ที่อยู่, อีเมล, ติดตามโซเชียล, เวลาเปิดทำการ',
      },
    },
    {
      name: 'contactInfoBodyFontSize',
      label: 'ขนาดเนื้อหาในข้อมูล (px)',
      type: 'number',
      defaultValue: 16,
      min: 14,
      max: 24,
      admin: {
        description: 'เนื้อหาหลัก, รายละเอียดติดต่อ, ย่อนำ (ไม่รวมปุ่ม)',
      },
    },
    {
      name: 'formLabelFontSize',
      label: 'ขนาดป้ายฟอร์ม (px)',
      type: 'number',
      defaultValue: 14,
      min: 12,
      max: 20,
      admin: {
        description: 'ป้าย Name, Email, ฯลฯ ไม่รวมข้อความ error',
      },
    },
    {
      name: 'formInputFontSize',
      label: 'ขนาดตัวอักษรในช่องกรอก (px)',
      type: 'number',
      defaultValue: 16,
      min: 14,
      max: 22,
      admin: {
        description: 'ช่อง input และ textarea (ไม่รวม error หรือปุ่ม)',
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
