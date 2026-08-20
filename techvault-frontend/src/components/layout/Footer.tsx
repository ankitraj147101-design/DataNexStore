'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  Truck,
  MessageSquare,
  CreditCard,
  Mail,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/mockData';
import BrandLogo from '@/components/common/BrandLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-300 border-t border-slate-800/80 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12 relative z-10">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-center gap-4 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/90 hover:border-sky-500/40 transition duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 group-hover:scale-105 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Free Express Air Shipping</h4>
              <p className="text-xs text-slate-400">On all prepaid orders over ₹1,500</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/90 hover:border-emerald-500/40 transition duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">100% Genuine Products</h4>
              <p className="text-xs text-slate-400">Direct authorized brand warranties</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/90 hover:border-emerald-500/40 transition duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">WhatsApp Order Desk</h4>
              <p className="text-xs text-slate-400">Live support on +91 9911371218</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/70 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/90 hover:border-amber-500/40 transition duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:scale-105 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Instant UPI & Billing</h4>
              <p className="text-xs text-slate-400">Instant QR & Bank Transfer</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Bio */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <BrandLogo size="lg" variant="dark" />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              DataNexStore is India's premier destination for genuine computer hardware, storage hard drives, high-speed NVMe SSDs, displays, and desktop components.
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-mono pt-1">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Sector 37, Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:Datanexstore@gmail.com" className="hover:text-sky-400 transition">
                  Datanexstore@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919911371218" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition text-emerald-400 font-semibold">
                  WhatsApp: +91 9911371218 (24x7 Support)
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Top Categories</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {INITIAL_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-sky-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-150"
                  >
                    <span>›</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://wa.me/919911371218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <span>›</span>
                  <span>WhatsApp Helpdesk</span>
                </a>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-sky-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-150">
                  <span>›</span>
                  <span>Track Air Shipment</span>
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-sky-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-150">
                  <span>›</span>
                  <span>Hardware Comparison</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-400 transition flex items-center gap-1.5 hover:translate-x-0.5 transform duration-150">
                  <span>›</span>
                  <span>Customer Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono uppercase font-bold text-white tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Order Alerts & Updates</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get flash sale alerts, restock notifications, and exclusive hardware promos.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900/90 text-xs text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 flex-1 focus:border-sky-400 focus:outline-none transition"
                />
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 shadow-md shadow-sky-600/30"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Subscribed successfully! Welcome to DataNexStore.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} DataNexStore. All rights reserved.
          </div>
          <div className="text-slate-500 text-xs">
            Genuine Hardware & Storage Solutions
          </div>
        </div>
      </div>
    </footer>
  );
}
