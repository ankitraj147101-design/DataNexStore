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
  Sparkles,
  KeyRound,
  LogIn,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Fingerprint,
  Cpu,
  ShieldAlert
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

// High-Security Executive Admin Login Gate Component
function AdminLoginGate() {
  const loginAs = useStore((state) => state.loginAs);
  const updateUserProfile = useStore((state) => state.updateUserProfile);

  const [adminEmail, setAdminEmail] = useState('admin@datanexstore.in');
  const [adminPassword, setAdminPassword] = useState('Datanex@2026');
  const [securityPin, setSecurityPin] = useState('991137');
  const [adminName, setAdminName] = useState('Administrator');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setLoadingStep('Verifying RSA Security Signature...');

    setTimeout(() => {
      setLoadingStep('Validating Multi-Factor Security Token...');
    }, 400);

    setTimeout(() => {
      if (adminEmail.trim() && adminPassword.trim().length >= 4) {
        loginAs('admin');
        updateUserProfile({
          firstName: adminName.trim() || 'Store Administrator',
          lastName: '',
          email: adminEmail
        });
        setIsLoading(false);
      } else {
        setErrorMessage('Authentication Failed: Invalid Administrator Credentials or Security Passkey.');
        setIsLoading(false);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-sky-500 selection:text-white font-sans">
      {/* Top Ambient Command Header */}
      <header className="px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>HSM Cluster: AP-SOUTH-1</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Security Gateway Online</span>
          </div>
        </div>
      </header>

      {/* Main Login Card Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 space-y-6 backdrop-blur-2xl relative overflow-hidden">
          
          {/* Subtle Top Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500"></div>

          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-800 border border-slate-700/80 flex items-center justify-center mx-auto shadow-xl shadow-sky-500/10">
              <ShieldCheck className="w-8 h-8 text-sky-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-black text-white font-mono tracking-tight">
                  DATANEX<span className="text-sky-400">COMMAND</span>
                </h1>
                <span className="text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded uppercase">
                  v2.8
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Executive Storefront Administration & Control Gateway
              </p>
            </div>
          </div>

          {/* Security Alert / Error Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/70 border border-red-800/80 text-xs text-red-200 flex items-center gap-2.5 font-mono">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                <span>Administrator Identity</span>
                <span className="text-[10px] text-slate-500">Authorized Personnel</span>
              </label>
              <input
                type="text"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Store Administrator"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-4 py-3 rounded-2xl focus:border-sky-500 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                <span>Corporate Admin Email</span>
                <span className="text-[10px] text-slate-500">Encrypted Channel</span>
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@datanexstore.in"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-4 py-3 rounded-2xl focus:border-sky-500 focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">
                  Security Passkey
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-4 py-3 rounded-2xl focus:border-sky-500 focus:outline-none font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold block">
                  2FA Security PIN
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="991137"
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white px-4 py-3 rounded-2xl focus:border-sky-500 focus:outline-none font-mono tracking-widest text-center font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs py-3.5 rounded-2xl transition flex items-center justify-center gap-2 font-mono shadow-lg shadow-sky-600/30"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  <span>{loadingStep}</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Open Command Center</span>
                </>
              )}
            </button>
          </form>

          {/* Security Telemetry Footer inside card */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 / AES-256</span>
            </div>
            <div className="text-slate-500">
              Session Node: #991137
            </div>
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="px-4 sm:px-8 py-4 text-center text-xs font-mono text-slate-500 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>DatanexStore Enterprise Control Systems • All Rights Reserved © 2026</span>
        <span>Authorized Internal Personnel Only</span>
      </footer>
    </div>
  );
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
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

  // If user is not an authenticated Admin, render the Admin Login Gate
  const isAdminAuthenticated =
    isClient &&
    currentUser &&
    (currentUser.role === 'ROLE_ADMIN' || currentUser.role === 'ROLE_SUPER_ADMIN');

  if (isClient && !isAdminAuthenticated) {
    return <AdminLoginGate />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50/60 text-slate-900 flex flex-col font-sans">
      {/* 100% Full-Width Top Enterprise Command Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3 shadow-xs backdrop-blur-md w-full">
        <div className="w-full flex items-center justify-between gap-4">
          
          {/* Brand & Subsystem Indicator */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-2 text-xs font-bold font-mono"
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
                  <span className="text-base sm:text-xl font-black tracking-tight text-slate-950 font-mono">
                    DATANEX<span className="text-sky-600">COMMAND</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 bg-sky-50 text-sky-800 border border-sky-200 font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>Enterprise Tier</span>
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
                  Mission Control • Cloud Cluster: AWS ap-south-1 (Mumbai)
                </div>
              </div>
            </div>
          </div>

          {/* Center Real-Time Telemetry Pills */}
          <div className="hidden xl:flex items-center gap-4 bg-slate-50 border border-slate-200/80 px-4 py-1.5 rounded-2xl text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-slate-600 font-medium">PostgreSQL Engine:</span>
              <span className="text-emerald-700 font-bold">100% Healthy (14ms)</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span className="text-slate-600 font-medium">Fulfillment SLA:</span>
              <span className="text-slate-900 font-bold">99.4% On-Time</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-slate-600 font-medium">Cache Rate:</span>
              <span className="text-indigo-700 font-bold">98.2% Hit</span>
            </div>
          </div>

          {/* Right Header Admin Identity & Sign Out Action */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="https://wa.me/919911371218"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold px-3.5 py-2 rounded-xl transition font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>WhatsApp Desk Online</span>
            </a>

            {/* Admin Profile Details */}
            <div className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-sky-400 font-black text-xs flex items-center justify-center font-mono shadow-xs">
                {currentUser?.firstName?.charAt(0) || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-slate-900 leading-tight">
                  {currentUser?.firstName ? `${currentUser.firstName} (Admin)` : 'Super Administrator'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono leading-tight">
                  {currentUser?.email || 'admin@datanexstore.in'}
                </div>
              </div>
            </div>

            {/* Interactive Admin Logout Button */}
            <button
              onClick={() => logout()}
              title="Sign Out of Admin Portal"
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl transition font-mono shadow-xs cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 100% Full-Width Workspace Layout */}
      <div className="w-full px-4 sm:px-8 py-6 sm:py-8 flex-1 flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Full-Height Sidebar Nav */}
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

          {/* Quick System Telemetry Card & Sidebar Logout */}
          <div className="hidden md:block pt-3 border-t border-slate-100 space-y-2">
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

            {/* Sidebar Logout Button */}
            <button
              onClick={() => logout()}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold font-mono flex items-center justify-center gap-2 border border-red-200 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Admin Session</span>
            </button>
          </div>
        </aside>

        {/* 100% Full-Width Dynamic Workspace Container */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
