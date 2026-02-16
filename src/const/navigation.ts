export enum NavKey {
  Products = 'products',
  Services = 'services',
  Portfolio = 'portfolio',
  AboutUs = 'aboutUs',
  ContactUs = 'contactUs',
}

export const NAV_PATHS: Record<NavKey, string> = {
  [NavKey.Products]: '/products',
  [NavKey.Services]: '/services',
  [NavKey.Portfolio]: '/portfolio',
  [NavKey.AboutUs]: '/about',
  [NavKey.ContactUs]: '/contact',
}