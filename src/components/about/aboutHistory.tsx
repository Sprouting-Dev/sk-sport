interface HistoryHighlight {
  value?: string | null
  label?: string | null
}

interface AboutHistoryProps {
  /** Retained for CMS compatibility; intro uses fixed “About Us” heading per layout. */
  historySectionTitle?: string | null
  companyName?: string | null
  historyDescription?: string | null
  historyHighlights?: HistoryHighlight[] | null
}

export default function AboutHistory({
  companyName,
  historyDescription,
  historyHighlights,
}: AboutHistoryProps) {
  return (
    <section className="w-full bg-header-bg py-12 md:py-16">
      <div className="container mx-auto flex flex-col items-center gap-8 px-6 md:gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold tracking-wide text-base-content md:text-3xl">
            About Us
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient md:w-14" aria-hidden />
          {companyName && (
            <p className="text-base font-medium text-gradient md:text-lg">{companyName}</p>
          )}
          {historyDescription && (
            <p className="text-sm leading-relaxed text-base-content/75 md:text-base">
              {historyDescription}
            </p>
          )}
        </div>

        {historyHighlights && historyHighlights.length > 0 && (
          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {historyHighlights.map((item, index) => {
              if (!item.value && !item.label) return null
              return (
                <div
                  key={index}
                  className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-base-300/50 bg-primary-content px-6 py-6 text-center shadow-sm md:min-h-32"
                >
                  {item.value && (
                    <span className="text-2xl font-semibold text-gradient md:text-3xl">
                      {item.value}
                    </span>
                  )}
                  {item.label && (
                    <span className="text-sm leading-snug text-base-content/60 md:text-base">
                      {item.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
