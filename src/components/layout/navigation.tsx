'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-base-content">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Brand Logo"
              width={150}
              height={50}
              className="w-auto object-contain pt-2"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="body-sm text-white font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            <button className="relative p-2 text-white">
              <ShoppingCart size={32} />
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white"
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>
      
      <div 
        className={cn(
            "fixed inset-0 z-40  md:hidden transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-1/2 bg-base-content transform transition-transform duration-300 ease-in-out md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-5 h-20">
            <button onClick={closeMenu} className="text-white">
                <X size={32} />
            </button>

            <button className="relative text-white p-2">
                <ShoppingCart size={32} />
            </button>
        </div>

        <div className="flex flex-col w-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMenu}
              className="group relative flex items-center w-full px-6 py-5 text-white overflow-hidden transition-all duration-300"
            >
              {/* 1. พื้นหลังไล่สี (ซ้าย -> ขวา) : แสดงเมื่อ Hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/40 from-50% to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* 2. เส้นขอบด้านซ้ายไล่สี (บน -> ล่าง) : ใช้ span สร้างแถบขนาด 4px */}
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary from-20% to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* ข้อความเมนู */}
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