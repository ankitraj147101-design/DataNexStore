'use client';

import React from 'react';
import Link from 'next/link';
import {
  HardDrive,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/mockData';

const CATEGORY_ICONS: Record<string, any> = {
  hdd: HardDrive,
  ram: Layers,
  ssd: Zap
};

export default function CategoryGrid() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Hardware Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Storage & PC Components
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-bold text-slate-900 hover:text-sky-700 flex items-center gap-1 group font-mono"
        >
          <span>View All Hardware</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        {INITIAL_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || HardDrive;
          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-400 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-xl"
            >
              {/* Image Box */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-sky-400 shadow-md border border-slate-700/60">
                  <Icon className="w-5 h-5" />
                </div>
                {cat.slug === 'hdd' ? (
                  <span className="absolute top-3 right-3 bg-emerald-500/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    5 SKUs Live
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 bg-slate-900/80 text-sky-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    Catalog Active
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-700" />
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
                <div className="text-[11px] font-mono text-sky-700 pt-1 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Genuine Hardware</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
