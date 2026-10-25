import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function SystemlyLogo({ className = '', size = 26 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <rect x="1" y="1" width="24" height="24" rx="7" fill="var(--accent)" />
        <circle cx="8" cy="13" r="2.4" fill="var(--accentText)" />
        <circle cx="18" cy="7.5" r="2.1" fill="var(--accentText)" />
        <circle cx="18" cy="13" r="2.1" fill="var(--accentText)" />
        <circle cx="18" cy="18.5" r="2.1" fill="var(--accentText)" />
        <path
          d="M10 13L16 7.6M10 13H16M10 13L16 18.4"
          stroke="var(--accentText)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-semibold text-[17px] tracking-[-0.01em] text-[var(--text)]">
        Systemly
      </span>
    </div>
  );
}
