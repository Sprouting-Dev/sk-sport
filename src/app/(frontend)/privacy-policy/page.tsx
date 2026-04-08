import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-primary-content">Privacy Policy</h1>
          <p className="body-lg text-primary-content/80 mt-3">Last updated: January 2025</p>
        </div>
      </section>

      <section className="w-full bg-header-bg">
        <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
          <div className="flex flex-col gap-10 text-base-content">
            <div>
              <h2 className="mb-4">1. Introduction</h2>
              <p className="body-md text-subtle leading-relaxed">
                SK Sport Trading Co., Ltd. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, and safeguard information when you use our website or contact us
                for our services.
              </p>
            </div>

            <div>
              <h2 className="mb-4">2. Information We Collect</h2>
              <p className="body-md text-subtle leading-relaxed mb-3">
                We may collect personal information that you voluntarily provide, including:
              </p>
              <ul className="body-md text-subtle leading-relaxed list-disc list-inside space-y-1">
                <li>Name and contact details (phone number, email address)</li>
                <li>Organisation or institution name</li>
                <li>Enquiry details and product selections</li>
                <li>Correspondence sent to us via forms or email</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4">3. How We Use Your Information</h2>
              <p className="body-md text-subtle leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="body-md text-subtle leading-relaxed list-disc list-inside space-y-1">
                <li>Respond to enquiries and provide quotations</li>
                <li>Process and fulfil orders</li>
                <li>Communicate updates relevant to your project or order</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="body-md text-subtle leading-relaxed mt-3">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-4">4. Data Retention</h2>
              <p className="body-md text-subtle leading-relaxed">
                We retain personal data only for as long as necessary to fulfil the purposes
                described in this policy or as required by applicable law.
              </p>
            </div>

            <div>
              <h2 className="mb-4">5. Cookies</h2>
              <p className="body-md text-subtle leading-relaxed">
                Our website may use cookies to improve your browsing experience. Cookies are small
                files stored on your device. You can disable cookies through your browser settings,
                though some site functionality may be affected.
              </p>
            </div>

            <div>
              <h2 className="mb-4">6. Third-Party Services</h2>
              <p className="body-md text-subtle leading-relaxed">
                Our website may include embedded maps (Google Maps) and links to external websites.
                We are not responsible for the privacy practices of these third-party services and
                encourage you to review their policies separately.
              </p>
            </div>

            <div>
              <h2 className="mb-4">7. Your Rights</h2>
              <p className="body-md text-subtle leading-relaxed">
                You have the right to access, correct, or request deletion of your personal data
                that we hold. To exercise these rights, please contact us using the details below.
              </p>
            </div>

            <div>
              <h2 className="mb-4">8. Contact</h2>
              <p className="body-md text-subtle leading-relaxed">
                For questions about this Privacy Policy or to exercise your data rights, please{' '}
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
