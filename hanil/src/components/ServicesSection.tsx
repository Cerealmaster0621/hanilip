import Link from 'next/link';
import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/get-dictionary';
import FadeIn from './FadeIn';
import AnimatedArrow from './AnimatedArrow';

export default function ServicesSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <FadeIn duration={1200}>
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 max-w-lg text-base text-text-light sm:text-lg">
            {dict.services.subtitle}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 space-y-0 divide-y divide-border">
          {dict.services.items.map((item, index) => (
            <FadeIn key={index} delayMs={index * 150} duration={1000}>
              <Link
                href={`/${locale}${item.href}`}
                className="group flex items-start justify-between gap-6 py-7 sm:py-9 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl font-bold text-text sm:text-2xl lg:text-3xl">
                    <span className="accent-highlight">
                      {item.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-text-light sm:text-base lg:text-lg max-w-2xl">
                    {item.description}
                  </p>
                </div>
                <div className="mt-2 shrink-0 text-text-muted transition-colors duration-300 group-hover:text-accent">
                  <AnimatedArrow size={24} />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
