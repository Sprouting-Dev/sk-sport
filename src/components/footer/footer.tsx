'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98H9.198v8.01Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.25-3.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.015 3.015 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    label: 'LINE',
    href: 'https://line.me',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 .63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755Zm-3.855 3.016a.63.63 0 0 1-.63.631.618.618 0 0 1-.51-.262l-2.397-3.274v2.905a.629.629 0 0 1-1.26 0V8.108a.631.631 0 0 1 .63-.63c.2 0 .381.098.494.254l2.412 3.29V8.108a.63.63 0 0 1 1.26 0v4.771Zm-5.741 0a.63.63 0 0 1-1.26 0V8.108a.63.63 0 0 1 1.26 0v4.771Zm-2.451.63H4.932a.63.63 0 0 1-.63-.63V8.108a.63.63 0 0 1 1.262 0v4.141h1.755a.63.63 0 0 1 0 1.26ZM24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
      </svg>
    ),
  },
]

export const Footer: React.FC = () => {
  const router = useRouter()
  const t = useTranslations('Footer')

  const siteMapLinks = [
    { label: t('links.home'), href: '/' },
    { label: t('links.aboutUs'), href: '/about' },
    { label: t('links.products'), href: '/products' },
    { label: t('links.services'), href: '/services' },
    { label: t('links.portfolio'), href: '/portfolio' },
    { label: t('links.articles'), href: '/articles' },
    { label: t('links.faq'), href: '/faq' },
  ]

  const legalLinks = [
    { label: t('links.privacyPolicy'), href: '/privacy-policy' },
    { label: t('links.termsOfService'), href: '/terms' },
  ]

  return (
    <footer className="footer-bg w-full min-h-[450px] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-12 md:px-12 lg:px-[72px] lg:py-[72px]">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20 w-full justify-between">
          <div className="flex flex-col gap-5 lg:max-w-[500px] flex-1">
            <h2 className="tracking-wider">
              <span className="company-name-part1">{t('companyNamePart1')} </span>
              <span className="company-name-part2">{t('companyNamePart2')}</span>
            </h2>

            {/* Description */}
            <p className="body-sm text-white/60 mb-2">{t('description')}</p>

            {/* Social icons */}
            <div className="flex items-center gap-6 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="social-icon-bg flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/70 transition-all duration-300 hover:border-white hover:text-white hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact buttons */}
            <div className="flex flex-row flex-nowrap gap-3">
              <a
                href="tel:06-3850302"
                className="btn-gradient-solid-border flex items-center justify-start gap-[13px] px-[15px] py-[10px] flex-1 max-w-[252px] h-[48px] text-white body-sm transition-all duration-300 whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 relative z-[1] flex-shrink-0"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.1.31.03.66-.25 1.02l-2.2 2.2Z" />
                </svg>
                <span className="relative z-[1] truncate">06-3850302</span>
              </a>
              <a
                href="mailto:jnfoe@gmail.com"
                className="btn-gradient-solid-border flex items-center justify-start gap-[13px] px-[15px] py-[10px] flex-1 max-w-[252px] h-[48px] text-white body-sm transition-all duration-300 whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 relative z-[1] flex-shrink-0"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
                <span className="relative z-[1] truncate">jnfoe@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right columns - Links */}
          <div className="flex gap-12 lg:gap-16 xl:gap-24">
            {/* Site Map */}
            <div className="flex flex-col gap-4 min-w-[140px]">
              <h3 className="h3 text-white tracking-wider mb-1">{t('siteMap')}</h3>
              <nav className="flex flex-col gap-3">
                {siteMapLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => router.push(link.href)}
                    className="body-sm text-white/60 transition-colors duration-200 hover:text-white text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 min-w-[140px]">
              <h3 className="h3 text-white tracking-wider mb-1">{t('legal')}</h3>
              <nav className="flex flex-col gap-3">
                {legalLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => router.push(link.href)}
                    className="body-sm text-white/60 transition-colors duration-200 hover:text-white text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
