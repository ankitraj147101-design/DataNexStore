'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    badge: 'WESTERN DIGITAL • 7200 RPM CLASS',
    title: 'WD Blue 1TB Desktop HDD',
    subtitle: 'High-Performance 3.5" Internal Mechanical Hard Drive',
    description: 'Engineered for robust desktop computing and mass storage. Features 64MB high-speed cache, SATA 6Gb/s interface, and 7200 RPM rotational speed for lightning-fast file transfers, gaming libraries, and system backups.',
    price: '₹3,499',
    mrp: '₹4,999',
    discount: '30% OFF',
    slug: 'wd-blue-1tb-internal-desktop-hard-drive-7200rpm-wd10ezex',
    image: '/products/wd-blue-1tb-front.png',
    bgGradient: 'from-blue-50/90 via-sky-50/50 to-white',
    accentBadge: 'bg-blue-100/80 text-blue-900 border-blue-200',
    glowColor: 'shadow-blue-500/10'
  },
  {
    id: 2,
    badge: 'WESTERN DIGITAL • 64MB CACHE',
    title: 'WD Blue 500GB Desktop HDD',
    subtitle: 'Reliable Everyday Desktop Storage & Backup (WD5000AZRZ)',
    description: 'Designed to deliver dependable everyday storage for desktop computers and workstations. Packed with 64MB cache and 5400 RPM class performance with SATA 6Gb/s connectivity.',
    price: '₹1,899',
    mrp: '₹2,999',
    discount: '36% OFF',
    slug: 'wd-blue-500gb-internal-desktop-hard-drive-wd5000azrz',
    image: '/products/wd-blue-500gb-front.png',
    bgGradient: 'from-sky-50/80 via-slate-50/40 to-white',
    accentBadge: 'bg-sky-100/80 text-sky-900 border-sky-200',
    glowColor: 'shadow-sky-500/10'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      suppressHydrationWarning
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.bgGradient} border border-slate-200/80 shadow-md ${slide.glowColor} transition-all duration-700`}
    >
      <div className="relative z-10 w-full p-4 sm:p-8 lg:p-12 min-h-[auto] sm:min-h-[480px] flex flex-col justify-between">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-5">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-bold tracking-wider uppercase font-mono ${slide.accentBadge}`}>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{slide.badge}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-lg font-bold text-slate-700">
                {slide.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed line-clamp-3 sm:line-clamp-none">
              {slide.description}
            </p>

            {/* Pricing & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-1 sm:pt-3">
              <div className="flex items-baseline gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-slate-200/80 shadow-xs w-fit">
                <span className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">
                  {slide.price}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono">
                  {slide.mrp}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md font-mono">
                  {slide.discount}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href={`/products/${slide.slug}`}
                  className="flex-1 sm:flex-initial bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-600/25 font-mono"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-slate-200 transition shadow-2xs font-mono text-center"
                >
                  Catalog
                </Link>
              </div>
            </div>
          </div>

          {/* Product Image Presentation */}
          <div className="lg:col-span-5 flex justify-center items-center relative order-first lg:order-last">
            <div className="relative w-full max-w-[220px] sm:max-w-md aspect-square rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md p-4 sm:p-6 border border-slate-200/80 shadow-xl shadow-slate-900/5 flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-slate-900/90 text-white backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[9px] sm:text-xs font-bold flex items-center gap-1 border border-slate-800 font-mono">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-400" />
                <span>100% Sealed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination */}
        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-200/60 mt-4 sm:mt-6">
          <div className="flex items-center gap-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-6 sm:w-8 bg-sky-600'
                    : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                )
              }
              className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
