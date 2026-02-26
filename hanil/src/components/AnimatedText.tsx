'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delayMs?: number;
  staggerMs?: number;
  splitBy?: 'line' | 'word';
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  delayMs = 0,
  staggerMs = 150,
  splitBy = 'line',
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const segments =
    splitBy === 'line'
      ? text.split('\n')
      : text.split(/\s+/);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {segments.map((segment, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="inline-block transition-all duration-1000 ease-out"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${delayMs + i * staggerMs}ms`,
            }}
          >
            {segment}
          </span>
        </span>
      ))}
    </Tag>
  );
}
