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
        className={`${iconSizeClass} shrink-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center relative overflow-hidden rounded-xl border border-sky-400/30 shadow-md shadow-sky-500/20 group-hover:border-sky-400 group-hover:shadow-sky-500/35 transition-all duration-300`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/25 via-transparent to-blue-600/15 pointer-events-none" />

        {/* Signature Aerodynamic 'D' Data-Nexus Monogram */}
        <svg
          viewBox="0 0 36 36"
          className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Electric Cyan Gradient */}
            <linearGradient id="dn-grad-1" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.5" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>

            {/* Top Accent Gradient */}
            <linearGradient id="dn-grad-2" x1="10" y1="6" x2="28" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Outer Geometric 'D' Arc Loop */}
          <path
            d="M9 7C9 5.89543 9.89543 5 11 5H20C25.5228 5 30 9.47715 30 15C30 20.5228 25.5228 25 20 25H11C9.89543 25 9 24.1046 9 23V7Z"
            stroke="url(#dn-grad-1)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Forward Speed Notch / 'N' Nexus Wing */}
          <path
            d="M15 11.5L21 17L15 22.5"
            stroke="url(#dn-grad-2)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Pulse Accent Dots */}
          <circle cx="20" cy="15" r="1.5" fill="#ffffff" />
          <circle cx="9" cy="15" r="1.2" fill="#38bdf8" />
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
