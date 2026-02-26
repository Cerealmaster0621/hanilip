import { getDictionary } from '@/lib/get-dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import ScrollProvider from '@/components/ScrollProvider';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';

function JsonLd({ locale, dict }: { locale: string; dict: Awaited<ReturnType<typeof getDictionary>> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: dict.metadata.title,
    description: dict.metadata.description,
    url: `https://hanilip.com/${locale}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressRegion: 'Gangnam-gu',
      addressCountry: 'KR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@hanilip.com',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'Japanese', 'English'],
    },
    areaServed: [
      { '@type': 'Country', name: 'South Korea' },
      { '@type': 'Country', name: 'Japan' },
    ],
    knowsAbout: [
      'Intellectual Property',
      'Patent Analysis',
      'IP Strategy',
      'Korea-Japan IP Law',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'ko';
  const dict = await getDictionary(validLocale);

  const navItems = [
    { label: dict.nav.about, href: `/${validLocale}/about` },
    { label: dict.nav.research, href: `/${validLocale}/research` },
    { label: dict.nav.corporateTrends, href: `/${validLocale}/corporate-trends` },
    { label: dict.nav.patentTrends, href: `/${validLocale}/patent-trends` },
    { label: dict.nav.contact, href: `/${validLocale}/contact` },
  ];

  return (
    <>
      <JsonLd locale={validLocale} dict={dict} />
      <ScrollProvider>
        <Header locale={validLocale} title={dict.metadata.title} contactLabel={dict.banner.contactUs} navItems={navItems} />

        <main>
          <HeroSection locale={validLocale} dict={dict} />

          {/* Services */}
          <ServicesSection locale={validLocale} dict={dict} />

          {/* Stats (between services and featured) */}
          <StatsSection dict={dict} />

          {/* Featured News */}
          <FeaturedSection locale={validLocale} dict={dict} />
        </main>

        <Footer locale={validLocale} dict={dict} />
      </ScrollProvider>
    </>
  );
}
