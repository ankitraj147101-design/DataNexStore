'use client';

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Flame, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/product/ProductCard';

type TabType = 'featured' | 'bestsellers' | 'trending' | 'new';

export default function TrendingTabs() {
  const products = useStore((state) => state.products);
  const [activeTab, setActiveTab] = useState<TabType>('featured');

  const filtered = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'trending') return p.isTrending;
    if (activeTab === 'new') return p.isNewArrival || p.id % 2 === 0;
    return true;
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Curated Hardware Selections
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Top-Rated Computing Hardware & Components
          </h2>
        </div>

        {/* Tab Switchers */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200 font-mono text-xs">
          <button
            onClick={() => setActiveTab('featured')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'featured'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Featured Hardware</span>
          </button>
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'bestsellers'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Best Sellers</span>
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'trending'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Trending in India</span>
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>New Releases</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
