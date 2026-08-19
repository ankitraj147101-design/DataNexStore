'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Search,
  Bell,
  ExternalLink,
  ChevronDown,
  Activity,
  Server,
  Database,
  Lock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/store/useStore';

const ADMIN_NAV = [
  { name: 'Executive Overview', href: '/admin', icon: LayoutDashboard, badge: 'Live' },
  { name: 'Products Catalog', href: '/admin/products', icon: Package, badgeKey: 'products' },
  { name: 'Categories & Schema', href: '/admin/categories', icon: Layers, badgeKey: 'categories' },
  { name: 'Order Fulfillment', href: '/admin/orders', icon: ShoppingBag, badgeKey: 'orders' },
  { name: 'Inventory & Warehouses', href: '/admin/inventory', icon: Warehouse, badgeKey: 'inventory' },
  { name: 'Promotions & Coupons', href: '/admin/coupons', icon: Tag, badgeKey: 'coupons' },
  { name: 'Review Moderation', href: '/admin/reviews', icon: MessageSquare, badgeKey: 'reviews' },
  { name: 'Customer Database', href: '/admin/customers', icon: Users, badgeKey: 'customers' }
];

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const currentUser = useStore((state) => state.currentUser);
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const categories = useStore((state) => state.categories);
  const reviews = useStore((state) => state.reviews);
  const coupons = useStore((state) => state.coupons);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING' || o.status === 'CONFIRMED').length;

  const getBadge = (key?: string) => {
    if (!isClient) return null;
    if (key === 'orders' && pendingOrders > 0) return `${pendingOrders} Pending`;
    if (key === 'inventory' && lowStockCount > 0) return `${lowStockCount} Low`;
    if (key === 'products') return `${products.length}`;
    if (key === 'categories') return `${categories.length}`;
    if (key === 'coupons') return `${coupons.length}`;
    if (key === 'reviews') return `${reviews.length}`;
    if (key === 'customers') return '4 Active';
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans">
      {/* Top Enterprise Command Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-3 sm:px-8 py-2.5 shadow-xs backdrop-blur-md">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Subsystem Indicator */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold font-mono"
              title="Return to Customer Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Storefront</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 flex items-center justify-center text-sky-400 shadow-md shadow-slate-900/10">
                <Zap className="w-5 h-5 fill-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 font-mono">
                    DATANEX<span className="text-sky-600">COMMAND</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>Enterprise Tier</span>
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
                  Mission Control • Cloud Cluster: AWS ap-south-1 (Mumbai)
                </div>
              </div>
            </div>
          </div>

          {/* Center Real-Time Telemetry Pills */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-50 border border-slate-200/80 px-4 py-1.5 rounded-2xl text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-600 font-medium">PostgreSQL Engine:</span>
              <span className="text-emerald-700 font-bold">100% Healthy (14ms)</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-slate-600 font-medium">Fulfillment Rate:</span>
              <span className="text-slate-900 font-bold">99.4% SLA</span>
            </div>
          </div>

          {/* Right Header Admin Identity & Live Store Link */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="https://wa.me/919911371218"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold px-3 py-2 rounded-xl transition font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>WhatsApp Desk Online</span>
            </a>

            <div className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <div className="w-7 h-7 rounded-xl bg-slate-900 text-sky-400 font-black text-xs flex items-center justify-center font-mono">
                {currentUser?.firstName?.charAt(0) || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-slate-900 leading-tight">
                  {currentUser?.firstName ? `${currentUser.firstName} (Admin)` : 'Super Administrator'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono leading-tight">
                  Full Authority
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content Area with Responsive Sidebar */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 space-y-2 shadow-xs sticky top-20">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center justify-between">
            <span>Modules & Workspaces</span>
            <span className="text-slate-300">8 Modules</span>
          </div>

          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              const badge = item.badge || getBadge(item.badgeKey);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition font-mono shrink-0 md:shrink ${
                    active
                      ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>

                  {badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 ${
                        active
                          ? 'bg-white/20 text-white'
                          : item.badgeKey === 'inventory' && lowStockCount > 0
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : item.badgeKey === 'orders' && pendingOrders > 0
                          ? 'bg-sky-100 text-sky-900 border border-sky-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick System Card at Bottom of Sidebar */}
          <div className="hidden md:block pt-3 border-t border-slate-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 font-medium">Database Node</span>
                <span className="text-emerald-700 font-bold">PostgreSQL v16</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 font-medium">Active Cache</span>
                <span className="text-sky-700 font-bold">Redis Cluster</span>
              </div>
              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[94%]"></div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex justify-between">
                <span>Memory Pool: 94% Free</span>
                <span>Tier 1 Secure</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
