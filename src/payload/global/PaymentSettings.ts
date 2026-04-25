import type { GlobalConfig } from 'payload'

export const PaymentSettings: GlobalConfig = {
  slug: 'payment-settings',
  label: 'Payment settings',
  admin: {
    group: 'Checkout',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable bank transfer instructions on checkout',
    },
    {
      name: 'orderNotificationEmail',
      type: 'email',
      label: 'Order notification email',
      admin: {
        description:
          'Email address that receives new order notifications. If empty, system falls back to ORDER_NOTIFY_EMAIL or default business email.',
      },
    },
    {
      name: 'bankName',
      type: 'text',
      label: 'Bank name',
    },
    {
      name: 'accountName',
      type: 'text',
      label: 'Account name',
    },
    {
      name: 'accountNumber',
      type: 'text',
      label: 'Account number',
    },
    {
      name: 'branch',
      type: 'text',
      label: 'Branch',
    },
    {
      name: 'paymentInstructions',
      type: 'textarea',
      label: 'Payment instructions',
    },
    {
      name: 'qrCodeImage',
      type: 'relationship',
      relationTo: 'gallery-media',
      hasMany: false,
      label: 'QR code (optional)',
    },
  ],
}
