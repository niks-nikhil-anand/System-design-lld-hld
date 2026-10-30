import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function SystemlyLogo({ className = "", size = 26 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        className="flex-shrink-0 rounded-[22%] object-contain"
      />
      <span className="font-semibold text-[17px] tracking-[-0.01em] text-[var(--text)]">
        System Design Mate
      </span>
    </div>
  );
}
