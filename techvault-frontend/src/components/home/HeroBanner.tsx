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
    badge: 'FLAGSHIP GAMING ARCHITECTURE • SOCKET AM5',
    title: 'AMD Ryzen 7 7800X3D',
    subtitle: 'The Architectural Apex of Desktop Gaming Performance',
    description: 'Engineered with 2nd-generation AMD 3D V-Cache stacking technology and 104MB low-latency cache on Zen 4. Delivers blistering frame rates with exceptional power efficiency.',
    price: '₹37,999',
    mrp: '₹46,999',
    discount: '19% OFF',
    slug: 'amd-ryzen-7-7800x3d-processor',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    bgGradient: 'from-sky-50/80 via-blue-50/40 to-white',
    accentBadge: 'bg-sky-100/80 text-sky-900 border-sky-200',
    glowColor: 'shadow-sky-500/10'
  },
  {
    id: 2,
    badge: 'PRECISION CNC ALUMINUM • DOUBLE GASKET MOUNT',
    title: 'Keychron Q1 Pro Wireless',
    subtitle: '75% Compact Layout QMK/VIA Custom Mechanical Keyboard',
    description: 'Machined from solid 6063 aerospace-grade aluminum with an acoustic double-gasket dampening structure. Features hot-swappable sockets and tri-mode Bluetooth 5.1 wireless.',
    price: '₹17,999',
    mrp: '₹21,999',
    discount: '18% OFF',
    slug: 'keychron-q1-pro-wireless-custom-mechanical-keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    bgGradient: 'from-indigo-50/80 via-purple-50/30 to-white',
    accentBadge: 'bg-indigo-100/80 text-indigo-900 border-indigo-200',
    glowColor: 'shadow-indigo-500/10'
  },
  {
    id: 3,
    badge: '240HZ 0.03MS MICRO-OLED • HDR10 CINEMATIC',
    title: 'ASUS ROG Swift OLED PG27AQDM',
    subtitle: '27-inch 1440p QHD 240Hz 0.03ms Master Gaming Display',
    description: 'Sub-millisecond 0.03ms gray-to-gray response time paired with custom heatsink cooling, intelligent voltage regulation, and 99% DCI-P3 cinematic color reproduction.',
    price: '₹78,999',
    mrp: '₹99,999',
    discount: '21% OFF',
    slug: 'asus-rog-swift-oled-pg27aqdm-27-inch-240hz',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    bgGradient: 'from-cyan-50/80 via-teal-50/30 to-white',
    accentBadge: 'bg-cyan-100/80 text-cyan-900 border-cyan-200',
    glowColor: 'shadow-cyan-500/10'
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
      <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 min-h-[480px] flex flex-col justify-between">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase font-mono ${slide.accentBadge}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg font-bold text-slate-700">
                {slide.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            {/* Pricing & CTA */}
            <div className="flex flex-wrap items-center gap-5 pt-3">
              <div className="flex items-baseline gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">
                  {slide.price}
                </span>
                <span className="text-xs text-slate-400 line-through font-mono">
                  {slide.mrp}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-md font-mono">
                  {slide.discount}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/products/${slide.slug}`}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-md shadow-sky-600/25 hover:scale-102 font-mono"
                >
                  <span>View Product Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold px-5 py-3.5 rounded-2xl border border-slate-200 transition shadow-2xs font-mono"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>

          {/* Product Image Presentation */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md p-6 border border-slate-200/80 shadow-xl shadow-slate-900/5 flex items-center justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain rounded-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-800 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>100% Brand Sealed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 mt-6">
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-8 bg-sky-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                )
              }
              className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
