'use client';

interface AnimatedArrowProps {
  className?: string;
  size?: number;
}

export default function AnimatedArrow({
  className = '',
  size = 20,
}: AnimatedArrowProps) {
  return (
    <span
      className={`inline-flex items-center transition-transform duration-300 ease-out group-hover:translate-x-1 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14m0 0l-5-5m5 5l-5 5"
        />
      </svg>
    </span>
  );
}
