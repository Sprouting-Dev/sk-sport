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
      name: 'titleFontSize',
      label: 'Title font size (px)',
      type: 'number',
      required: false,
      defaultValue: 56,
      min: 32,
      max: 96,
    },
    {
      name: 'subtitleFontSize',
      label: 'Subtitle font size (px)',
      type: 'number',
      defaultValue: 20,
      min: 14,
      max: 32,
    },
    {
      name: 'categoryTitleFontSize',
      label: 'Category heading font size (px)',
      type: 'number',
      defaultValue: 32,
      min: 20,
      max: 56,
      admin: {
        description: 'e.g. “BASKETBALL EQUIPMENT” row titles on the product listing.',
      },
    },
    {
      name: 'productCardTitleFontSize',
      label: 'Product card title font size (px)',
      type: 'number',
      defaultValue: 22,
      min: 14,
      max: 36,
      admin: {
        description: 'Product name on each card in the listing grid and list.',
      },
    },
    {
      name: 'productPriceFontSize',
      label: 'Product price font size (px)',
      type: 'number',
      defaultValue: 16,
      min: 12,
      max: 28,
      admin: {
        description: 'Controls product price text size in product cards/list.',
      },
    },
    {
      name: 'detailTitleFontSize',
      label: 'Product detail: title (px)',
      type: 'number',
      defaultValue: 56,
      min: 32,
      max: 96,
      admin: {
        description: 'Main product name on the product detail page.',
      },
    },
    {
      name: 'detailSubtitleFontSize',
      label: 'Product detail: subtitle (px)',
      type: 'number',
      defaultValue: 18,
      min: 14,
      max: 32,
      admin: {
        description: 'Product subtitle on the product detail page.',
      },
    },
    {
      name: 'detailSectionTitleFontSize',
      label: 'Product detail: “Details” heading (px)',
      type: 'number',
      defaultValue: 28,
      min: 20,
      max: 48,
      admin: {
        description: 'Section heading for the product description block.',
      },
    },
    {
      name: 'detailBodyFontSize',
      label: 'Product detail: body text (px)',
      type: 'number',
      defaultValue: 16,
      min: 14,
      max: 24,
      admin: {
        description: 'Product description / body copy on the product detail page.',
      },
    },
    {
      name: 'relatedTitleFontSize',
      label: 'Product detail: “You may also like” (px)',
      type: 'number',
      defaultValue: 28,
      min: 20,
      max: 48,
      admin: {
        description: 'Heading above related products on the product detail page.',
      },
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
