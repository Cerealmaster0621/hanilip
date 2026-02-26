import type { Dictionary } from '@/lib/get-dictionary';
import FadeIn from './FadeIn';
import AnimatedCounter from './AnimatedCounter';

export default function StatsSection({ dict }: { dict: Dictionary }) {
  const stats = [
    dict.stats.years,
    dict.stats.publications,
    dict.stats.patents,
  ];

  return (
    <section className="border-y border-border bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <FadeIn duration={1200}>
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="font-serif text-3xl font-bold text-primary sm:text-4xl lg:text-5xl"
                />
                <p className="mt-2 text-xs font-medium text-text-light sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
