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
        className={`${iconSizeClass} shrink-0 bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden rounded-xl border border-sky-500/30 shadow-md shadow-sky-500/15 group-hover:border-sky-400 group-hover:shadow-sky-500/30 transition-all duration-300`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial from-sky-500/20 via-transparent to-transparent pointer-events-none" />

        {/* Clean Iconic Cyber Hardware Microchip Emblem */}
        <svg
          viewBox="0 0 32 32"
          className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chip-core" x1="9" y1="9" x2="23" y2="23" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Top Pins */}
          <line x1="12" y1="3" x2="12" y2="8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="3" x2="16" y2="8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="3" x2="20" y2="8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bottom Pins */}
          <line x1="12" y1="24" x2="12" y2="29" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="24" x2="16" y2="29" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="24" x2="20" y2="29" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left Pins */}
          <line x1="3" y1="12" x2="8" y2="12" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="16" x2="8" y2="16" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3" y1="20" x2="8" y2="20" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Pins */}
          <line x1="24" y1="12" x2="29" y2="12" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="16" x2="29" y2="16" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="20" x2="29" y2="20" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

          {/* Outer Chip Silicon Die */}
          <rect
            x="7.5"
            y="7.5"
            width="17"
            height="17"
            rx="3.5"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />

          {/* Inner Glowing Processor Core */}
          <rect
            x="11"
            y="11"
            width="10"
            height="10"
            rx="2"
            fill="url(#chip-core)"
            stroke="#7dd3fc"
            strokeWidth="0.8"
          />

          {/* Center Glowing Silicon Nexus Dot */}
          <circle cx="16" cy="16" r="2" fill="#ffffff" />
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
