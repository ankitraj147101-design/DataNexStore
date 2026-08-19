'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Warehouse,
  Tag,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const ADMIN_NAV = [
  { name: 'Store Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Products Catalog', href: '/admin/products', icon: Package },
  { name: 'Categories & Specs', href: '/admin/categories', icon: Layers },
  { name: 'Order Processing', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Inventory & Stock', href: '/admin/inventory', icon: Warehouse },
  { name: 'Promotions & Coupons', href: '/admin/coupons', icon: Tag },
  { name: 'Review Moderation', href: '/admin/reviews', icon: MessageSquare },
  { name: 'Customer Database', href: '/admin/customers', icon: Users }
];

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentUser = useStore((state) => state.currentUser);
  const pendingOrders = useStore((state) => state.adminStats.pendingOrders);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-sky-400">
                <Zap className="w-4 h-4 fill-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight text-slate-900">
                    DATANEX<span className="text-sky-600">STORE</span>
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded border border-slate-200 uppercase">
                    Admin Control Center
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono -mt-0.5">
                  Live Operations & Storefront Management
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono font-bold text-slate-700">
                System Active
              </span>
            </div>

            <Link
              href="/"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition font-mono"
            >
              Live Storefront
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content Area with Sidebar */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3 py-1">
            Store Management
          </div>
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.href === '/admin/orders' && pendingOrders > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-sky-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pendingOrders}
                  </span>
                )}
              </Link>
            );
          })}
        </aside>

        {/* Dynamic Route View */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
