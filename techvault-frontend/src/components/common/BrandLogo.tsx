import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = 'md',
  variant = 'light',
  showTagline = true,
  className = ''
}: BrandLogoProps) {
  const iconSizeClass = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  }[size];

  const titleSizeClass = {
    sm: 'text-base font-black tracking-tight',
    md: 'text-lg sm:text-xl font-black tracking-tight',
    lg: 'text-2xl sm:text-3xl font-black tracking-tight'
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* High-Tech Vector Icon Emblem */}
      <div
        className={`${iconSizeClass} shrink-0 bg-slate-950 flex items-center justify-center relative overflow-hidden border border-sky-500/30 shadow-md shadow-sky-500/10 group-hover:border-sky-400/60 group-hover:shadow-sky-500/25 transition-all duration-300`}
      >
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 via-transparent to-blue-500/10" />
        
        {/* Sharp SVG Lightning Zap */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="url(#brand-bolt-gradient)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="brand-bolt-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className={`${titleSizeClass} font-mono tracking-tight flex items-baseline`}>
          <span className={isDark ? 'text-white' : 'text-slate-950 font-black'}>
            DATANEX
          </span>
          <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent font-black ml-0.5">
            STORE
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[8px] sm:text-[9.5px] uppercase tracking-[0.2em] font-mono font-bold mt-0.5 sm:mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Premier Tech Hardware
          </span>
        )}
      </div>
    </div>
  );
}
