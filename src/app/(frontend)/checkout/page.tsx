import { getCheckoutPaymentSettings } from '@/data/paymentSettings'
import { CheckoutClient } from './CheckoutClient'

export default async function CheckoutPage() {
  const payment = await getCheckoutPaymentSettings()
  return <CheckoutClient payment={payment} />
}
