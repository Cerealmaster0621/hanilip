import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/get-dictionary';
import FadeIn from './FadeIn';
import AnimatedArrow from './AnimatedArrow';

export default function FeaturedSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="bg-bg-alt py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <FadeIn duration={1200}>
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            {dict.featured.title}
          </h2>
          <p className="mt-4 max-w-lg text-base text-text-light sm:text-lg">
            {dict.featured.subtitle}
          </p>
        </FadeIn>

        <div className="mt-10 sm:mt-14 space-y-0 divide-y divide-border">
          {dict.featured.items.map((item, index) => (
            <FadeIn key={index} delayMs={index * 150} duration={1000}>
              <article className="group cursor-pointer py-6 sm:py-8 transition-colors">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <span className="font-semibold text-accent">
                        {item.category}
                      </span>
                      <time className="text-text-muted">{item.date}</time>
                    </div>
                    <h3 className="mt-2 font-serif text-base font-bold text-text sm:text-lg lg:text-xl">
                      <span className="accent-highlight">
                        {item.title}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-text-light line-clamp-2 max-w-2xl sm:text-base">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 shrink-0 flex items-center gap-2 text-sm font-medium text-text-muted transition-colors duration-300 group-hover:text-accent">
                    <span className="hidden sm:inline accent-underline">
                      {dict.featured.viewMore}
                    </span>
                    <AnimatedArrow size={18} />
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
