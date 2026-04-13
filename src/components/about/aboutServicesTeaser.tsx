import Link from 'next/link'

export interface AboutServiceSummaryItem {
  title: string
  description: string
}

interface AboutServicesTeaserProps {
  servicesSectionTitle?: string | null
  servicesSectionSubtitle?: string | null
  servicesCtaText?: string | null
  serviceSummaries?: AboutServiceSummaryItem[]
}

const SERVICE_ICONS = [
  (props: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={props.className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1-.722-1.415 2.612 2.612 0 0 1 1.064-2.378l2.06-1.735a2.65 2.65 0 0 1 3.367.26L19.5 9.5"
      />
    </svg>
  ),
  (props: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={props.className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75A2.25 2.25 0 0 1 15.75 13.5H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25ZM13.5 6A2.25 2.25 0 0 1 15.75 3.75H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25A2.25 2.25 0 0 1 10.5 15.75V18A2.25 2.25 0 0 1 8.25 20.25H6A2.25 2.25 0 0 1 3.75 18v-2.25Z"
      />
    </svg>
  ),
  (props: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={props.className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  ),
] as const

export default function AboutServicesTeaser({
  servicesCtaText,
  serviceSummaries = [],
}: AboutServicesTeaserProps) {
  const items = serviceSummaries.slice(0, 3)

  return (
    <section className="w-full bg-primary-content py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2 className="text-2xl font-semibold tracking-wide text-base-content md:text-3xl lg:text-4xl">
            Our Services
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient md:mt-5" />
        </div>

        {items.length > 0 ? (
          <ul className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-8 md:mb-14 md:grid-cols-3 md:gap-6 lg:gap-10">
            {items.map((item, i) => {
              const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
              return (
                <li
                  key={`${item.title}-${i}`}
                  className="flex flex-row items-start gap-4 text-left md:gap-5"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/20 text-primary shadow-md ring-1 ring-primary/20 md:h-16 md:w-16"
                    aria-hidden
                  >
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-base font-semibold leading-snug text-base-content md:text-lg">
                      {item.title}
                    </h3>
                    {item.description ? (
                      <p className="about-service-desc-md mt-2 text-sm leading-relaxed text-base-content/65 md:mt-2.5">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
        ) : null}

        {servicesCtaText ? (
          <div className="flex justify-center">
            <Link
              href="/service"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-9 py-3.5 text-sm font-semibold text-primary-content shadow-lg transition hover:opacity-95 md:px-10 md:py-4 md:text-base"
            >
              {servicesCtaText}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
