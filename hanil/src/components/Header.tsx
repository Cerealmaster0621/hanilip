'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n-config';
import { locales, localeNames } from '@/lib/i18n-config';
import { logoMap } from '@/lib/design-tokens';
import { useScrollSection } from './ScrollProvider';

interface HeaderProps {
  locale: Locale;
  title: string;
  contactLabel: string;
  navItems: { label: string; href: string }[];
}

export default function Header({
  locale,
  title,
  contactLabel,
  navItems,
}: HeaderProps) {
  const { isHero } = useScrollSection();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isHero
            ? 'bg-primary border-b border-white/10'
            : 'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm'
        }`}
      >
        {/* Language banner */}
        <div
          className={`transition-colors duration-700 text-xs ${
            isHero
              ? 'bg-primary-dark/60 text-cream/60'
              : 'bg-bg-alt text-text-light'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="transition-colors hover:text-accent"
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
            <Link
              href={`/${locale}/contact`}
              className="transition-colors hover:text-accent"
            >
              {contactLabel}
            </Link>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href={`/${locale}`}
            className="relative shrink-0 h-10 sm:h-12"
          >
            <Image
              src={logoMap[locale].white}
              alt={title}
              width={280}
              height={70}
              priority
              className={`h-10 w-auto sm:h-12 absolute inset-0 object-contain object-left transition-opacity duration-700 ${
                isHero ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Image
              src={logoMap[locale].default}
              alt={title}
              width={280}
              height={70}
              priority
              className={`h-10 w-auto sm:h-12 transition-opacity duration-700 ${
                isHero ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isHero
                    ? 'text-cream hover:text-accent-light'
                    : 'text-text hover:text-primary'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    isHero ? 'bg-accent-light' : 'bg-primary'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger (open button) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`flex h-10 w-10 items-center justify-center lg:hidden transition-colors duration-300 ${
              isHero ? 'text-cream' : 'text-text'
            }`}
            aria-label="Open menu"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`block h-0.5 w-6 rounded-full ${
                  isHero ? 'bg-cream' : 'bg-text'
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded-full ${
                  isHero ? 'bg-cream' : 'bg-text'
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full ${
                  isHero ? 'bg-cream' : 'bg-text'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen mobile drawer — outside <header> to avoid stacking context issues */}
      <div
        className={`fixed inset-0 z-[60] bg-primary transition-all duration-500 ease-in-out lg:hidden ${
          drawerOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button (X) — top-right, inside the drawer */}
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className="absolute top-6 right-5 z-10 flex h-10 w-10 items-center justify-center text-cream sm:right-7"
          aria-label="Close menu"
        >
          <div className="relative flex h-5 w-6 items-center justify-center">
            <span className="absolute block h-0.5 w-[28px] rotate-45 rounded-full bg-cream" />
            <span className="absolute block h-0.5 w-[28px] -rotate-45 rounded-full bg-cream" />
          </div>
        </button>

        <nav className="flex h-full flex-col justify-center px-8 sm:px-16">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-4">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="group py-3 sm:py-4"
                style={{
                  transform: drawerOpen
                    ? 'translateY(0)'
                    : 'translateY(20px)',
                  opacity: drawerOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${drawerOpen ? i * 60 : 0}ms`,
                }}
              >
                <span className="text-2xl font-extrabold text-cream/90 transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                  {item.label}
                </span>
                <span className="mt-1 block h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Language options */}
          <div
            className="mt-12 flex items-center gap-6 border-t border-cream/15 pt-8"
            style={{
              opacity: drawerOpen ? 1 : 0,
              transition: `opacity 0.4s ease ${drawerOpen ? navItems.length * 60 + 100 : 0}ms`,
            }}
          >
            <span className="text-sm font-bold text-cream">
              {localeNames[locale]}
            </span>
            {otherLocales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                onClick={() => setDrawerOpen(false)}
                className="text-sm font-semibold text-cream/40 transition-colors hover:text-accent"
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
