import Link from 'next/link'

const FAQ_ITEMS = [
  {
    question: 'What types of sports facilities does SK Sport Trading handle?',
    answer:
      'We supply and install equipment for a wide range of facilities including gymnasiums, fitness centres, multi-purpose sports halls, outdoor training areas, and competition-grade venues for government and institutional clients.',
  },
  {
    question: 'Do you offer full installation services, or only equipment supply?',
    answer:
      'We provide end-to-end solutions — from site survey and equipment specification through to delivery, professional installation, and post-installation maintenance and support.',
  },
  {
    question: 'Which brands and product categories do you carry?',
    answer:
      'Our catalogue includes strength and conditioning equipment, cardio machines, gymnastics apparatus, court flooring, sports lighting, and integrated health-management systems. Please visit our Products page or contact us for a full catalogue.',
  },
  {
    question: 'Can you work with government or public-sector procurement requirements?',
    answer:
      'Yes. We have extensive experience working within government procurement frameworks and can provide full documentation, warranties, and compliance certificates to meet institutional requirements.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'You can browse our Products page, add items to your cart, and use the "Request a Quote" button to send us your selection. Alternatively, visit our Contact page and fill in the enquiry form directly.',
  },
  {
    question: 'What is the typical lead time for orders?',
    answer:
      'Lead times depend on product availability and project scope. Standard equipment orders typically take 4–8 weeks from confirmation. Large-scale facility projects are planned on a project-by-project basis.',
  },
  {
    question: 'Do you provide after-sales maintenance and support?',
    answer:
      'Yes. We offer scheduled maintenance programmes and on-demand support for all equipment we install. Contact our team to discuss a maintenance plan suited to your facility.',
  },
  {
    question: 'Are your products certified to international standards?',
    answer:
      'All equipment we supply meets relevant international safety and quality standards. Certifications vary by product category; documentation is available upon request.',
  },
]

export default function FaqPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <section className="section-bg-to-right w-full py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-primary-content">Frequently Asked Questions</h1>
          <p className="body-lg text-primary-content/80 mt-3 max-w-xl">
            Find answers to the most common questions about our products, services, and processes.
          </p>
        </div>
      </section>

      <section className="w-full bg-header-bg">
        <div className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
          <div className="flex flex-col divide-y divide-base-300">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="py-6 first:pt-0 last:pb-0">
                <h3 className="mb-3 text-base-content">{item.question}</h3>
                <p className="body-md text-subtle leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-box border border-base-300 bg-primary-content px-6 py-6 shadow-sm text-center">
            <p className="body-md text-subtle mb-4">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact" className="btn btn-gradient-solid-border btn-lg btn-lg-typo px-8">
              <span className="text-primary">Contact Our Team</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
