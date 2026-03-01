'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface ScrollContextValue {
  isHero: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({ isHero: true });

export function useScrollSection() {
  return useContext(ScrollContext);
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const [isHero, setIsHero] = useState(true);

  useEffect(() => {
    const banner = document.querySelector('[data-page-banner]');
    if (!banner) {
      setIsHero(false);
      return;
    }

    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight ?? 80;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHero(entry.isIntersecting),
      { threshold: 0, rootMargin: `-${headerHeight}px 0px 0px 0px` },
    );

    observer.observe(banner);
    return () => observer.disconnect();
  }, []);

  return (
    <ScrollContext.Provider value={{ isHero }}>
      {children}
    </ScrollContext.Provider>
  );
}
