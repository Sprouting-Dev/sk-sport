import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-primary-content">Terms &amp; Conditions</h1>
          <p className="body-lg text-primary-content/80 mt-3">Last updated: January 2025</p>
        </div>
      </section>

      <section className="w-full bg-header-bg">
        <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
          <div className="flex flex-col gap-10 text-base-content">
            <div>
              <h2 className="mb-4">1. Acceptance of Terms</h2>
              <p className="body-md text-subtle leading-relaxed">
                By accessing or using the SK Sport Trading website and services, you agree to be
                bound by these Terms and Conditions. If you do not agree to any part of these terms,
                you may not use our services.
              </p>
            </div>

            <div>
              <h2 className="mb-4">2. Products and Services</h2>
              <p className="body-md text-subtle leading-relaxed">
                SK Sport Trading Co., Ltd. provides sports equipment supply, installation, and
                facility development services. All product descriptions, specifications, and pricing
                are subject to change without notice. Availability of specific products is not
                guaranteed until a written order confirmation has been issued.
              </p>
            </div>

            <div>
              <h2 className="mb-4">3. Quotes and Orders</h2>
              <p className="body-md text-subtle leading-relaxed">
                Quotes submitted through this website are enquiries only and do not constitute
                binding orders. A formal order is established only upon receipt of a signed purchase
                order and written confirmation from SK Sport Trading Co., Ltd. Pricing is subject to
                change prior to order confirmation.
              </p>
            </div>

            <div>
              <h2 className="mb-4">4. Intellectual Property</h2>
              <p className="body-md text-subtle leading-relaxed">
                All content on this website, including text, images, logos, and design, is the
                property of SK Sport Trading Co., Ltd. or its content suppliers and is protected by
                applicable intellectual property laws. You may not reproduce, distribute, or create
                derivative works without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="mb-4">5. Limitation of Liability</h2>
              <p className="body-md text-subtle leading-relaxed">
                SK Sport Trading Co., Ltd. shall not be liable for any indirect, incidental, or
                consequential damages arising from the use or inability to use our website or
                services. Our liability in connection with any transaction shall not exceed the
                value of the relevant order.
              </p>
            </div>

            <div>
              <h2 className="mb-4">6. Governing Law</h2>
              <p className="body-md text-subtle leading-relaxed">
                These Terms and Conditions are governed by the laws of Thailand. Any disputes
                arising under these terms shall be subject to the exclusive jurisdiction of the
                courts of Thailand.
              </p>
            </div>

            <div>
              <h2 className="mb-4">7. Contact</h2>
              <p className="body-md text-subtle leading-relaxed">
                For questions about these Terms and Conditions, please{' '}
                <Link href="/contact" className="text-primary underline underline-offset-2">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
