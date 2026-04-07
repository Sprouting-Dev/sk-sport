interface AboutHeroProps {
  heroTitle?: string | null
  heroSubtitle?: string | null
}

export default function AboutHero({ heroTitle, heroSubtitle }: AboutHeroProps) {
  return (
    <section className="section-bg-to-right w-full py-24 md:py-36">
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center gap-6">
        {heroTitle && (
          <h1 className="text-4xl md:text-6xl font-heading font-medium leading-tight tracking-wider text-primary-content">
            {heroTitle}
          </h1>
        )}
        {heroSubtitle && (
          <p className="body-sm text-primary-content/80 max-w-2xl leading-relaxed">
            {heroSubtitle}
          </p>
        )}
      </div>
    </section>
  )
}
