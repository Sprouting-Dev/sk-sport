export enum NavKey {
  PRODUCT = 'product',
  SERVICE = 'service',
  PORTFOLIO = 'portfolio',
  ABOUT_US = 'aboutUs',
  CONTACT_US = 'contactUs',
}

export const NAV_PATHS: Record<NavKey, string> = {
  [NavKey.PRODUCT]: '/product',
  [NavKey.SERVICE]: '/service',
  [NavKey.PORTFOLIO]: '/portfolio',
  [NavKey.ABOUT_US]: '/about',
  [NavKey.CONTACT_US]: '/contact',
}
