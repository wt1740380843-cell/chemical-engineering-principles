'use client'

import Link from 'next/link'
import { BookOpen, Calculator, GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: '首页', icon: BookOpen },
  { href: '/chapters', label: '课程章节', icon: BookOpen },
  { href: '/tools', label: '计算工具', icon: Calculator },
  { href: '/quiz', label: '自测练习', icon: GraduationCap },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#eae5db] bg-[#fbf9f6]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d97706] text-white text-sm font-bold">
            CP
          </span>
          <span className="text-base font-bold tracking-tight text-[#2c2a29] hidden sm:block">
            化工原理
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#7c756e] hover:text-[#d97706] hover:bg-[#f5efe6] rounded-lg transition-all"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#7c756e] hover:bg-[#f5efe6] transition-all"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#eae5db] bg-[#fbf9f6] px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#7c756e] hover:text-[#d97706] hover:bg-[#f5efe6] rounded-lg transition-all"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#eae5db] bg-[#fbf9f6]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d97706] text-white text-xs font-bold">
              CP
            </span>
            <span className="text-sm font-semibold text-[#2c2a29]">化工原理学习平台</span>
          </div>
          <p className="text-xs text-[#7c756e]">
            基于夏清《化工原理》第二版知识体系 · 助力化工学习
          </p>
        </div>
      </div>
    </footer>
  )
}