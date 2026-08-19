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
    <footer className="bg-white text-slate-700 border-t border-slate-200 pt-16 pb-12 mt-20">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-100">
          <div className="flex items-center gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Free Express Air Shipping</h4>
              <p className="text-xs text-slate-500">On all prepaid orders over ₹1,500</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">100% Genuine Products</h4>
              <p className="text-xs text-slate-500">Direct authorized brand warranties</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">WhatsApp Order Desk</h4>
              <p className="text-xs text-slate-500">Live support on +91 9911371218</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">WhatsApp Invoice & Billing</h4>
              <p className="text-xs text-slate-500">Manual UPI / QR / Bank Transfer</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Bio */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/datanexstore-logo.jpg"
                alt="DataNexStore Logo"
                className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Datanexstore is India's dedicated e-commerce platform for computer components, enthusiast mechanical keyboards, displays, NVMe storage, and PC gaming hardware.
            </p>

            <div className="space-y-1.5 text-xs text-slate-600 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Datanexstore@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp: +91 9911371218 (24x7 Order Desk)</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {INITIAL_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-sky-600 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a
                  href="https://wa.me/919911371218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 transition text-emerald-600 font-semibold"
                >
                  WhatsApp Helpdesk
                </a>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-sky-600 transition">
                  Track Air Shipment
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-sky-600 transition">
                  Hardware Comparison Matrix
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-600 transition">
                  Customer Account & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-900 tracking-wider">
              Order Alerts & News
            </h4>
            <p className="text-xs text-slate-500">
              Get flash sale alerts, restock notifications, and exclusive promo coupon drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-50 text-xs text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 flex-1 focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1 shadow-xs"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully! Welcome to Datanexstore.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Datanexstore Retail Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>GSTIN: 29AABCT8829K1ZR</span>
            <span>•</span>
            <span>Official WhatsApp: +91 9911371218</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
