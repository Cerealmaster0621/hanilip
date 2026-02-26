'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(value: string): { numeric: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^\d]*)(\d[\d,.]*)([^\d]*)$/);
  if (!match) return null;
  const numeric = parseFloat(match[2].replace(/,/g, ''));
  if (isNaN(numeric) || numeric < 100) return null;
  return { numeric, prefix: match[1], suffix: match[3] };
}

function formatNumber(n: number, template: string): string {
  if (template.includes(',')) {
    return n.toLocaleString();
  }
  return String(n);
}

export default function AnimatedCounter({
  value,
  className = '',
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  const parsed = parseValue(value);
  const shouldAnimate = parsed !== null;

  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && parsed) {
          setHasAnimated(true);
          observer.disconnect();

          const start = performance.now();
          const target = parsed.numeric;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplayValue(
              `${parsed.prefix}${formatNumber(current, value)}${parsed.suffix}`
            );
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAnimate, hasAnimated, parsed, value, duration]);

  if (!shouldAnimate) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? displayValue : '0' + (parsed?.suffix || '')}
    </span>
  );
}
