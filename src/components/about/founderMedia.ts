import type { Founder, GalleryMedia, HeroMedia } from '@/payload-types'

export type ResolvedFounderImage = { url: string; alt: string }

function mediaFromValue(
  v: string | HeroMedia | GalleryMedia | null | undefined,
): ResolvedFounderImage | null {
  if (!v || typeof v === 'string') return null
  if (typeof v === 'object' && v.url) {
    return { url: v.url, alt: v.alt ?? '' }
  }
  return null
}

export function resolveFounderAboutImage(
  aboutImage: Founder['aboutImage'],
): ResolvedFounderImage | null {
  if (!aboutImage || typeof aboutImage !== 'object' || !('value' in aboutImage)) return null
  return mediaFromValue(aboutImage.value)
}

export function resolveFounderGalleryImages(gallery: Founder['gallery']): ResolvedFounderImage[] {
  if (!gallery?.length) return []
  const out: ResolvedFounderImage[] = []
  for (const item of gallery) {
    if (!item || typeof item !== 'object' || !('value' in item)) continue
    const m = mediaFromValue(item.value)
    if (m) out.push(m)
  }
  return out
}

export function resolveFounderDetailImages(founder: Founder): ResolvedFounderImage[] {
  const fromGallery = resolveFounderGalleryImages(founder.gallery)
  if (fromGallery.length > 0) return fromGallery
  const one = resolveFounderAboutImage(founder.aboutImage)
  return one ? [one] : []
}

/** Legacy global: single relationship to hero-media only */
export function resolveLegacyFounderImage(
  founderImage: string | HeroMedia | null | undefined,
): ResolvedFounderImage | null {
  if (!founderImage || typeof founderImage === 'string') return null
  return mediaFromValue(founderImage)
}
