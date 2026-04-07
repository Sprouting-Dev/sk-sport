interface AboutMissionVisionProps {
  missionTitle?: string | null
  missionDescription?: string | null
  visionTitle?: string | null
  visionDescription?: string | null
}

export default function AboutMissionVision({
  missionTitle,
  missionDescription,
  visionTitle,
  visionDescription,
}: AboutMissionVisionProps) {
  return (
    <section className="section-bg-to-left w-full py-16 md:py-24">
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col gap-5 rounded-box border border-primary-content/10 bg-primary-content/5 px-8 py-10 backdrop-blur-sm">
          {missionTitle && (
            <h2 className="text-2xl md:text-3xl font-heading font-medium tracking-wide text-primary-content">
              {missionTitle}
            </h2>
          )}
          <div className="h-0.5 w-12 bg-gradient" />
          {missionDescription && (
            <p className="body-sm text-primary-content/75 leading-relaxed">{missionDescription}</p>
          )}
        </div>

        <div className="flex flex-col gap-5 rounded-box border border-primary-content/10 bg-primary-content/5 px-8 py-10 backdrop-blur-sm">
          {visionTitle && (
            <h2 className="text-2xl md:text-3xl font-heading font-medium tracking-wide text-primary-content">
              {visionTitle}
            </h2>
          )}
          <div className="h-0.5 w-12 bg-gradient" />
          {visionDescription && (
            <p className="body-sm text-primary-content/75 leading-relaxed">{visionDescription}</p>
          )}
        </div>
      </div>
    </section>
  )
}
