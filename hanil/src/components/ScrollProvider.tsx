'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight * 0.5;
    setIsHero(scrollY < heroHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ isHero }}>
      {children}
    </ScrollContext.Provider>
  );
}
