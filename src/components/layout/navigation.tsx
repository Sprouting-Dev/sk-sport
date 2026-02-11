'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/const/navigation'
import { ListIcon, XIcon, ShoppingCartSimpleIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'

export const Navbar = () => {
  const t = useTranslations('Footer')

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-base-content">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <h3 className="tracking-wider">
              <span className="company-name-part1">{t('companyNamePart1')} </span>
              <span className="company-name-part2">{t('companyNamePart2')}</span>
            </h3>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="body-sm text-primary-content font-medium"
              >
                {item.name}
              </Link>
            ))}

            <button className="relative p-2 text-primary-content">
              <ShoppingCartSimpleIcon size={32} />
            </button>
          </div>

          <button onClick={toggleMenu} className="md:hidden p-2 text-primary-content">
            <ListIcon size={32} />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-40  md:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeMenu}
      />

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-1/2 bg-base-content transform transition-transform duration-300 ease-in-out md:hidden flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex justify-between items-center p-5 h-20">
          <button onClick={closeMenu} className="text-primary-content">
            <XIcon size={32} />
          </button>

          <button className="relative text-primary-content p-2">
            <ShoppingCartSimpleIcon size={32} />
          </button>
        </div>

        <div className="flex flex-col w-full">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="group relative flex items-center w-full px-6 py-5 text-primary-content overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-linear-to-r from-primary/40 from-50% to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <span className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-r from-primary from-20% to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 body-md tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
