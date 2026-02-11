'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useTranslations } from 'next-intl'
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  LineIcon,
  PhoneIcon,
  EmailIcon,
} from '@/components/icons'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: <FacebookIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <InstagramIcon />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: <YouTubeIcon />,
  },
  {
    label: 'LINE',
    href: 'https://line.me',
    icon: <LineIcon />,
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
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="social-icon-bg flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/70 transition-all duration-300 hover:border-white hover:text-white hover:scale-110"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Contact buttons */}
            <div className="flex flex-row flex-nowrap gap-3">
              <Link
                href="tel:06-3850302"
                className="btn-gradient-solid-border flex items-center justify-start gap-[13px] px-[15px] py-[10px] flex-1 max-w-[252px] h-[48px] text-white body-sm transition-all duration-300 whitespace-nowrap"
              >
                <PhoneIcon className="w-4 h-4 relative z-1 shrink-0" />
                <span className="relative z-1 truncate">06-3850302</span>
              </Link>
              <Link
                href="mailto:jnfoe@gmail.com"
                className="btn-gradient-solid-border flex items-center justify-start gap-[13px] px-[15px] py-[10px] flex-1 max-w-[252px] h-[48px] text-white body-sm transition-all duration-300 whitespace-nowrap"
              >
                <EmailIcon className="w-4 h-4 relative z-1 shrink-0" />
                <span className="relative z-1 truncate">jnfoe@gmail.com</span>
              </Link>
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
