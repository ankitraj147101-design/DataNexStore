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
        className={`${iconSizeClass} shrink-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center relative overflow-hidden border border-sky-500/40 shadow-lg shadow-sky-500/15 group-hover:border-sky-400 group-hover:shadow-sky-500/30 transition-all duration-300`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial from-sky-500/20 via-transparent to-transparent pointer-events-none" />

        {/* Futuristic 3D Isometric Nexus Data Matrix Emblem */}
        <svg
          viewBox="0 0 32 32"
          className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradient for Top Facet */}
            <linearGradient id="cube-top" x1="16" y1="4" x2="16" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
            {/* Gradient for Left Facet */}
            <linearGradient id="cube-left" x1="6" y1="11" x2="16" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284c7" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
            {/* Gradient for Right Facet */}
            <linearGradient id="cube-right" x1="26" y1="11" x2="16" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
            {/* Inner Core Glow */}
            <linearGradient id="core-glow" x1="16" y1="12" x2="16" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Isometric Data Cube Facets */}
          {/* Top Diamond Facet */}
          <path
            d="M16 4.5L25.5 10L16 15.5L6.5 10L16 4.5Z"
            fill="url(#cube-top)"
            stroke="#bae6fd"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Left Vertical Facet */}
          <path
            d="M6.5 10V21L16 27.5V15.5L6.5 10Z"
            fill="url(#cube-left)"
            stroke="#38bdf8"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Right Vertical Facet */}
          <path
            d="M25.5 10V21L16 27.5V15.5L25.5 10Z"
            fill="url(#cube-right)"
            stroke="#60a5fa"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Internal Circuit Nexus Lines */}
          <path
            d="M16 15.5V23M16 15.5L10 12M16 15.5L22 12"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Central Pulsing Nexus Node */}
          <circle cx="16" cy="15.5" r="1.8" fill="url(#core-glow)" />
          <circle cx="16" cy="7.5" r="1" fill="#ffffff" />
          <circle cx="11" cy="22" r="0.9" fill="#7dd3fc" />
          <circle cx="21" cy="22" r="0.9" fill="#93c5fd" />
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
