import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  admin: {
    group: 'Content',
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
      name: 'historySectionTitle',
      label: 'History Section Title',
      type: 'text',
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
    },
    {
      name: 'historyDescription',
      label: 'History Description',
      type: 'textarea',
    },
    {
      name: 'historyHighlights',
      label: 'History Highlights',
      type: 'array',
      fields: [
        {
          name: 'value',
          label: 'Value',
          type: 'text',
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
      ],
    },
    {
      name: 'missionTitle',
      label: 'Mission Title',
      type: 'text',
    },
    {
      name: 'missionDescription',
      label: 'Mission Description',
      type: 'textarea',
    },
    {
      name: 'visionTitle',
      label: 'Vision Title',
      type: 'text',
    },
    {
      name: 'visionDescription',
      label: 'Vision Description',
      type: 'textarea',
    },
    {
      name: 'founderSectionTitle',
      label: 'Founder Section Title',
      type: 'text',
    },
    {
      name: 'founderImage',
      label: 'Founder Image',
      type: 'relationship',
      relationTo: 'hero-media',
      hasMany: false,
    },
    {
      name: 'founderName',
      label: 'Founder Name',
      type: 'text',
    },
    {
      name: 'founderRole',
      label: 'Founder Role',
      type: 'text',
    },
    {
      name: 'founderDescription',
      label: 'Founder Description',
      type: 'textarea',
    },
    {
      name: 'founderQuote',
      label: 'Founder Quote',
      type: 'textarea',
    },
    {
      name: 'featuredProjectsSectionTitle',
      label: 'Featured Projects Section Title',
      type: 'text',
    },
    {
      name: 'featuredProjectsSectionSubtitle',
      label: 'Featured Projects Section Subtitle',
      type: 'textarea',
    },
    {
      name: 'featuredProjectsCtaText',
      label: 'Featured Projects CTA Text',
      type: 'text',
    },
    {
      name: 'servicesSectionTitle',
      label: 'Services Section Title',
      type: 'text',
    },
    {
      name: 'servicesSectionSubtitle',
      label: 'Services Section Subtitle',
      type: 'textarea',
    },
    {
      name: 'servicesCtaText',
      label: 'Services CTA Text',
      type: 'text',
    },
    {
      name: 'productsSectionTitle',
      label: 'Products Section Title',
      type: 'text',
    },
    {
      name: 'productsSectionSubtitle',
      label: 'Products Section Subtitle',
      type: 'textarea',
    },
    {
      name: 'productsCtaText',
      label: 'Products CTA Text',
      type: 'text',
    },
  ],
}
