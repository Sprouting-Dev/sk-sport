import { GlobalConfig } from 'payload'

export const Faq: GlobalConfig = {
  slug: 'faq',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'หัวข้อหน้า FAQ (Hero)',
      type: 'text',
    },
    {
      name: 'heroSubtitle',
      label: 'คำอธิบาย / บทนำ (Hero)',
      type: 'textarea',
    },
    {
      name: 'heroTitleFontSize',
      label: 'ขนาดหัวข้อ Hero หน้า FAQ (px)',
      type: 'number',
      defaultValue: 56,
      min: 32,
      max: 96,
      admin: {
        description: 'ตัวอักษรหัวข้อบนส่วนแบนเนอร์ (ตัวใหญ่บนสุด)',
      },
    },
    {
      name: 'heroSubtitleFontSize',
      label: 'ขนาดคำอธิบาย Hero หน้า FAQ (px)',
      type: 'number',
      defaultValue: 20,
      min: 14,
      max: 32,
      admin: {
        description: 'บรรทัดแนะนำใต้หัวข้อ Hero',
      },
    },
    {
      name: 'questionFontSize',
      label: 'ขนาดตัวอักษรคำถาม (px)',
      type: 'number',
      defaultValue: 18,
      min: 14,
      max: 32,
      admin: {
        description: 'หัวข้อแต่ละข้อคำถามในรายการ',
      },
    },
    {
      name: 'answerFontSize',
      label: 'ขนาดตัวอักษรคำตอบ (px)',
      type: 'number',
      defaultValue: 16,
      min: 14,
      max: 24,
      admin: {
        description: 'เนื้อหาคำตอบใต้คำถาม',
      },
    },
    {
      name: 'bottomCtaTitleFontSize',
      label: 'ขนาดหัวข้อ CTA ด้านล่าง (px)',
      type: 'number',
      defaultValue: 28,
      min: 20,
      max: 48,
      admin: {
        description: 'หัวข้อในกล่อง CTA ล่างสุด (เช่น “หาคำตอบไม่เจอ?”)',
      },
    },
    {
      name: 'bottomCtaBodyFontSize',
      label: 'ขนาดเนื้อหา CTA ด้านล่าง (px)',
      type: 'number',
      defaultValue: 16,
      min: 14,
      max: 24,
      admin: {
        description: 'บรรทัดอธิบายใต้หัวข้อ CTA ไม่รวมปุ่มติดต่อ',
      },
    },
    {
      name: 'bottomCtaBody',
      label: 'คำอธิบายใต้หัวข้อ CTA ด้านล่าง',
      type: 'textarea',
      admin: {
        description: 'เนื้อหาใต้หัว CTA; ถ้าเว้นว่างจะแสดงข้อความสำรองอัตโนมัติ',
      },
    },
    {
      name: 'faqItems',
      label: 'รายการคำถาม-คำตอบ',
      type: 'array',
      fields: [
        {
          name: 'question',
          label: 'คำถาม',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'คำตอบ',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
