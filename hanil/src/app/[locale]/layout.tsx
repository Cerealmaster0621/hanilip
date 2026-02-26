import type { Metadata } from 'next';
import {
  Noto_Serif_KR,
  Noto_Sans_KR,
  Noto_Serif_JP,
  Noto_Sans_JP,
  Playfair_Display,
  Inter,
} from 'next/font/google';
import { locales, type Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import '../globals.css';

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading-ko',
  display: 'swap',
  preload: false,
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body-ko',
  display: 'swap',
  preload: false,
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading-ja',
  display: 'swap',
  preload: false,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body-ja',
  display: 'swap',
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading-en',
  display: 'swap',
  preload: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body-en',
  display: 'swap',
  preload: false,
});

const fontClassMap: Record<Locale, string> = {
  ko: `${notoSerifKR.variable} ${notoSansKR.variable}`,
  ja: `${notoSerifJP.variable} ${notoSansJP.variable}`,
  en: `${playfairDisplay.variable} ${inter.variable}`,
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hanilip.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const titleSuffix = dict.metadata.titleEnglish
    ? `${dict.metadata.title} | ${dict.metadata.titleEnglish} | ${dict.metadata.ipAttorneys}`
    : `${dict.metadata.title} | ${dict.metadata.ipAttorneys}`;

  return {
    title: {
      default: titleSuffix,
      template: `%s - ${titleSuffix}`,
    },
    description: dict.metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
    icons: {
      icon: `${basePath}/images/logo-white.svg`,
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: [`${basePath}/images/logo.svg`],
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : 'ko';

  return (
    <html lang={validLocale} className={fontClassMap[validLocale]}>
      <head>
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://hanilip.com/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://hanilip.com/ko"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
