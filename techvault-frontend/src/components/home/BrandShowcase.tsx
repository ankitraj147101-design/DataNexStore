'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { INITIAL_BRANDS } from '@/lib/data/mockData';

export default function BrandShowcase() {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authorized Distribution Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Official Brand Partner Stores
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {INITIAL_BRANDS.slice(0, 6).map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.slug}`}
            className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-sky-300 rounded-3xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 p-2 border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {brand.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5 line-clamp-1">
                {brand.description}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[10px] text-sky-700 font-mono font-bold">
              <span>View Brand Store</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
