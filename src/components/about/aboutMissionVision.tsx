import { Eye, Target } from '@phosphor-icons/react/dist/ssr'

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
    <section className="w-full bg-header-bg py-9 md:py-11">
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-3 px-6 md:grid-cols-2 md:gap-4 lg:max-w-4xl">
        <div className="flex flex-col rounded-lg border border-primary/25 bg-primary/10 px-4 py-4 md:px-5 md:py-5">
          <div className="flex items-start gap-2.5 md:gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary md:h-9 md:w-9"
              aria-hidden
            >
              <Target className="h-4 w-4 md:h-5 md:w-5" weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              {missionTitle && (
                <h2 className="text-sm font-normal tracking-normal text-base-content/90 md:text-base">
                  {missionTitle}
                </h2>
              )}
              <div className="mt-1.5 h-px w-6 bg-primary/35" />
              {missionDescription && (
                <p className="mt-2 text-xs leading-relaxed text-base-content/58 md:text-sm">
                  {missionDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-secondary/25 bg-secondary/10 px-4 py-4 md:px-5 md:py-5">
          <div className="flex items-start gap-2.5 md:gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary/20 text-secondary md:h-9 md:w-9"
              aria-hidden
            >
              <Eye className="h-4 w-4 md:h-5 md:w-5" weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              {visionTitle && (
                <h2 className="text-sm font-normal tracking-normal text-base-content/90 md:text-base">
                  {visionTitle}
                </h2>
              )}
              <div className="mt-1.5 h-px w-6 bg-secondary/35" />
              {visionDescription && (
                <p className="mt-2 text-xs leading-relaxed text-base-content/58 md:text-sm">
                  {visionDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
