import React from 'react';
import { Difficulty } from '@/types/systemly';

interface BadgeProps {
  diff?: Difficulty | string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({ diff, children, className = '', size = 'sm' }: BadgeProps) {
  let bg = 'var(--surface2)';
  let color = 'var(--muted)';

  if (diff === 'Beginner') {
    bg = 'var(--okSoft)';
    color = 'var(--ok)';
  } else if (diff === 'Advanced') {
    bg = 'var(--badSoft)';
    color = 'var(--bad)';
  } else if (diff === 'Intermediate') {
    bg = 'var(--warnSoft)';
    color = 'var(--warn)';
  }

  const sizeClasses =
    size === 'sm'
      ? 'text-[11px] px-2 py-0.5 font-medium'
      : 'text-[12px] px-2.5 py-1 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-md ${sizeClasses} ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {children || diff}
    </span>
  );
}

export function TagBadge({
  label,
  onClick,
  active = false
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center text-[12px] px-2 py-0.5 rounded-md transition-colors ${
        onClick ? 'cursor-pointer hover:opacity-80' : ''
      }`}
      style={{
        backgroundColor: active ? 'var(--accentSoft)' : 'var(--surface2)',
        color: active ? 'var(--accent)' : 'var(--muted)',
        border: active ? '1px solid var(--accent)' : '1px solid transparent'
      }}
    >
      {label}
    </span>
  );
}
