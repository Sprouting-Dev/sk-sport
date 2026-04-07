interface HistoryHighlight {
  value?: string | null
  label?: string | null
}

interface AboutHistoryProps {
  historySectionTitle?: string | null
  companyName?: string | null
  historyDescription?: string | null
  historyHighlights?: HistoryHighlight[] | null
}

export default function AboutHistory({
  historySectionTitle,
  companyName,
  historyDescription,
  historyHighlights,
}: AboutHistoryProps) {
  return (
    <section className="w-full bg-header-bg py-16 md:py-24">
      <div className="container mx-auto px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-4 max-w-3xl">
          {historySectionTitle && (
            <p className="body-sm text-primary font-semibold uppercase tracking-widest">
              {historySectionTitle}
            </p>
          )}
          {companyName && (
            <h2 className="text-gradient text-3xl md:text-4xl font-heading font-medium leading-tight">
              {companyName}
            </h2>
          )}
          {historyDescription && (
            <p className="body-sm text-base-content leading-relaxed indent-4">
              {historyDescription}
            </p>
          )}
        </div>

        {historyHighlights && historyHighlights.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {historyHighlights.map((item, index) => {
              if (!item.value && !item.label) return null
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 rounded-box border border-base-300 bg-primary-content px-4 py-6 text-center shadow-sm"
                >
                  {item.value && (
                    <span className="text-gradient text-2xl md:text-3xl font-heading font-semibold">
                      {item.value}
                    </span>
                  )}
                  {item.label && (
                    <span className="body-sm text-subtle text-sm leading-snug">{item.label}</span>
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
