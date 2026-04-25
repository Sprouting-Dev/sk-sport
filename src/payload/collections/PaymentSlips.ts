import type { CollectionConfig } from 'payload'

export const PaymentSlips: CollectionConfig = {
  slug: 'payment-slips',
  labels: { singular: 'Payment slip', plural: 'Payment slips' },
  admin: {
    group: 'Checkout',
    useAsTitle: 'alt',
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  },
  access: {
    /**
     * Public read: order notification emails link to `/api/payment-slips/file/...`; the file route
     * uses collection read access. Recipients are unauthenticated, so read must be allowed here.
     * New uploads are still only created through the checkout server flow or Payload admin (create below).
     */
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Description (alt text)',
    },
  ],
}
