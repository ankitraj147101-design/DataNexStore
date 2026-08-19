'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, HardDrive, Layers, Tv, ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';

export default function PcBuilderBanner() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-sm relative overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HighStore System Architect</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
            Building a Custom Gaming or Workstation PC?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Use our Hardware Matrix Comparison to verify socket compatibility (AM5 / LGA1700), PCIe lane bandwidth, RAM clearances, and optimal power delivery before ordering.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>AM5 / Intel LGA1700 Verification</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DDR5 6000MHz Memory QVL Matched</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>PCIe 4.0/5.0 Heatsink Verified</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/compare"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <Sliders className="w-4 h-4" />
              <span>Open Hardware Comparison Matrix</span>
            </Link>
            <Link
              href="/products?category=processors"
              className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-white/20 transition"
            >
              Browse CPUs
            </Link>
          </div>
        </div>

        {/* Right Visual Component Badges */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <Link
            href="/products?category=processors"
            className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition group"
          >
            <Cpu className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Processors</div>
            <div className="text-[10px] text-slate-400">Ryzen 7 & Intel Core</div>
          </Link>

          <Link
            href="/products?category=ram"
            className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition group"
          >
            <Layers className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">DDR5 Memory</div>
            <div className="text-[10px] text-slate-400">Low Latency Kits</div>
          </Link>

          <Link
            href="/products?category=ssd"
            className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition group"
          >
            <HardDrive className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">PCIe 4.0 SSDs</div>
            <div className="text-[10px] text-slate-400">Up to 7,450 MB/s</div>
          </Link>

          <Link
            href="/products?category=monitors"
            className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition group"
          >
            <Tv className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">OLED Displays</div>
            <div className="text-[10px] text-slate-400">240Hz High Refresh</div>
          </Link>
        </div>

      </div>
    </div>
  );
}
