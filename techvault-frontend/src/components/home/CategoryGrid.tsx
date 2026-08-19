'use client';

import React from 'react';
import Link from 'next/link';
import {
  Keyboard,
  Mouse,
  HardDrive,
  Cpu,
  Tv,
  Headphones,
  Wifi,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/mockData';

const CATEGORY_ICONS: Record<string, any> = {
  keyboards: Keyboard,
  mouse: Mouse,
  ssd: HardDrive,
  ram: Layers,
  monitors: Tv,
  processors: Cpu,
  headphones: Headphones,
  'wifi-routers': Wifi
};

export default function CategoryGrid() {
  const topCategories = INITIAL_CATEGORIES.slice(0, 8);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Product Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Hardware & Peripherals by Category
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-sky-700 flex items-center gap-1 group font-mono"
        >
          <span>View All 26 Categories</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {topCategories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || Layers;
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg"
            >
              {/* Image Box */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-100">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-sky-600 shadow-xs border border-slate-200">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-700" />
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {cat.description}
                </p>
                <div className="text-[10px] font-mono text-sky-700 mt-2 font-bold uppercase tracking-wider">
                  {cat.productCount || 10}+ Verified Models Available
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
