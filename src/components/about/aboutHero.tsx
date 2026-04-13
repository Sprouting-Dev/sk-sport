interface AboutHeroProps {
  heroTitle?: string | null
  heroSubtitle?: string | null
}

export default function AboutHero({ heroTitle, heroSubtitle }: AboutHeroProps) {
  return (
    <section className="about-hero-gradient relative w-full overflow-hidden">
      <div className="about-hero-radial-overlay pointer-events-none absolute inset-0" />
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center px-6 py-12 text-center md:py-16 lg:about-hero-inner-py-lg">
        {heroTitle && (
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-wide text-primary-content drop-shadow-sm md:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
        )}
        {heroSubtitle && (
          <>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-primary-content/90 md:mt-5 md:text-lg">
              {heroSubtitle}
            </p>
            <div
              className="mt-5 h-0.5 w-12 shrink-0 rounded-full bg-primary-content/50 md:mt-6 md:w-14"
              aria-hidden
            />
          </>
        )}
      </div>
    </section>
  )
}
