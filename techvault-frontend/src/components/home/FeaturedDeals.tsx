'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/product/ProductCard';

export default function FeaturedDeals() {
  const products = useStore((state) => state.products);
  const dealProducts = products.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 20);

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      suppressHydrationWarning
      className="bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-white border border-amber-200/60 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm shadow-amber-500/5"
    >
      {/* Header Bar with Countdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100/70 text-amber-900 border border-amber-300/80 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider font-mono mb-2">
            <Flame className="w-3.5 h-3.5 fill-amber-600 text-amber-600 animate-bounce" />
            <span>Limited-Time Flash Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Special Deals & Featured Offers
          </h2>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-200/80 shadow-xs">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold text-slate-600 uppercase font-mono mr-1">
            Offer Closes In:
          </span>
          <div className="flex items-center gap-1 font-mono font-black text-sm text-slate-900" suppressHydrationWarning>
            <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-amber-600">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Deal Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dealProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
