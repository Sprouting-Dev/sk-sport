import { Hero } from '@/components/hero/Hero'
import { ContactForm } from '@/components/contact'

export default async function Contact() {
  const contactMedia = [
    { id: '1', url: '/Contact Section BG Desktop.png', alt: 'Contact Background' }
  ]

  return (
    <div className="w-full bg-header-bg">
      <Hero 
        variant="contact"
        media={contactMedia as unknown as React.ComponentProps<typeof Hero>['media']}
        title="Contact us"
        description={
          <>
            Your Partner for World-Class Sports Facility Development.<br />
            Lorem ipsum dolor sit amet consectetur.
          </>
        }
      />
      <div className="relative z-20 -mt-40 md:-mt-64">
        <ContactForm />
      </div>
    </div>
  )
}
