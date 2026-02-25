import { Hero } from '@/components/hero/Hero'

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
    </div>
  )
}
