import type { ResolvedFounderImage } from './founderMedia'

interface FounderDetailImagesProps {
  images: ResolvedFounderImage[]
}

export function FounderDetailImages({ images }: FounderDetailImagesProps) {
  if (images.length === 0) {
    return (
      <div className="min-h-64 w-full overflow-hidden rounded-2xl border border-base-300 bg-base-200">
        <div className="flex h-64 w-full items-center justify-center">
          <span className="text-sm text-base-content/40">No image</span>
        </div>
      </div>
    )
  }

  if (images.length === 1) {
    return (
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-2xl border border-base-300/50 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="aspect-ratio-3-4 w-full min-h-64 object-cover object-top"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {images.map((img, i) => (
        <div
          key={`${img.url}-${i}`}
          className="min-h-32 min-w-0 overflow-hidden rounded-2xl border border-base-300/50 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.url}
            alt={img.alt}
            className="aspect-ratio-4-3 h-full w-full min-h-32 object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}
