/**
 * Single source of truth for all public-facing contact details.
 * Update these values here and they will propagate to the footer,
 * home contact section, and contact form automatically.
 */
export const CONTACT = {
  phone: '06-3850302',
  email: 'jnfoe@gmail.com',
  address: 'Ek Thaksin Road, Pathum Thani',
  mapEmbedSrc:
    'https://maps.google.com/maps?q=Ek+Thaksin+Rd,+Pathum+Thani&t=&z=15&ie=UTF8&iwloc=&output=embed',
} as const

/**
 * Company social media profile URLs.
 * Replace each null with the real URL before launch.
 * These values propagate to the footer and contact form social icons.
 */
export const SOCIAL_URLS: {
  facebook: string | null
  instagram: string | null
  youtube: string | null
  line: string | null
} = {
  facebook: null, // TODO: replace with real Facebook page URL
  instagram: null, // TODO: replace with real Instagram profile URL
  youtube: null, // TODO: replace with real YouTube channel URL
  line: null, // TODO: replace with real LINE official account URL
}
