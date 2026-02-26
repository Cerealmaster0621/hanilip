import Link from 'next/link';
import { locales, localeNames, type Locale } from '@/lib/i18n-config';

export default function LanguageBanner({
  locale,
  contactLabel,
}: {
  locale: Locale;
  contactLabel: string;
}) {
  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <div className="bg-primary-dark text-cream/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6">
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
  );
}
