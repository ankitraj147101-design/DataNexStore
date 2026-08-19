'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  FileSpreadsheet,
  Download,
  PlusCircle,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useStore } from '@/store/useStore';

const CATEGORY_COLORS = ['#0284c7', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  const adminStats = useStore((state) => state.adminStats);
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const categories = useStore((state) => state.categories);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING' || o.status === 'CONFIRMED').length;
  const inTransitOrders = orders.filter((o) => o.status === 'SHIPPED' || o.status === 'OUT_FOR_DELIVERY').length;
  const deliveredOrders = orders.filter((o) => o.status === 'DELIVERED').length;

  const totalUnitsInStock = products.reduce((acc, p) => acc + p.stock, 0);

  // Executive Top Stat Cards
  const statCards = [
    {
      title: 'Gross Merchandise Value (GMV)',
      value: `₹${adminStats.totalRevenue.toLocaleString()}`,
      subtitle: '+24.6% vs previous month',
      isPositive: true,
      icon: DollarSign,
      color: 'from-sky-500/10 to-blue-500/5 text-sky-700 border-sky-200'
    },
    {
      title: "Today's Verified Inflow",
      value: `₹${adminStats.todayRevenue.toLocaleString()}`,
      subtitle: '34 Orders Processed Today',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-emerald-500/10 to-teal-500/5 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Pending Fulfillment',
      value: `${pendingOrders} Orders`,
      subtitle: `${inTransitOrders} Currently in Air Transit`,
      isPositive: pendingOrders === 0,
      icon: ShoppingBag,
      color: 'from-blue-500/10 to-indigo-500/5 text-blue-700 border-blue-200'
    },
    {
      title: 'Warehouse Stock Health',
      value: `${totalUnitsInStock} Units`,
      subtitle: `${lowStockCount} SKUs below minimum buffer`,
      isPositive: lowStockCount === 0,
      icon: AlertTriangle,
      color: 'from-amber-500/10 to-orange-500/5 text-amber-700 border-amber-200'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome Title & Executive Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div>
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Storefront Telemetry & Sales Operations</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            Executive Command Center
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-2 font-mono shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-sky-400" />
            <span>Add New Product</span>
          </Link>

          <a
            href="https://wa.me/919911371218"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-2 font-mono shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Broadcast Promo</span>
          </a>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} bg-white border rounded-3xl p-5 space-y-3 transition-all hover:shadow-md shadow-xs`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 font-mono uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="p-2 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-mono font-medium mt-1 flex items-center gap-1">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                  <span>{stat.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Grid: Revenue Area Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Revenue Velocity Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono">
                Sales Trajectory & Revenue Inflow (INR)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Daily settled transaction volume from online gateway & WhatsApp orders
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl font-mono text-xs">
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-lg font-bold uppercase transition ${
                    timeframe === t
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminStats.salesChartData}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    fontFamily="monospace"
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    fontFamily="monospace"
                    tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '16px',
                      border: '1px solid #1e293b',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Settled Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Category Market Share */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono">
              Hardware Category Share
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Volume split across top product tiers
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={adminStats.categorySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {adminStats.categorySalesData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }}
                    formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Gross Volume']}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-mono">
            {adminStats.categorySalesData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                  ></span>
                  <span className="text-slate-700 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-950">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Bottom Grid: Live Orders Feed + Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders Processing Feed */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono">
                Recent Order Stream
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Real-time carrier statuses & payment confirmations
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 font-mono flex items-center gap-1"
            >
              <span>Manage All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 font-mono">{order.id}</span>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full font-mono uppercase ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'SHIPPED' || order.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    {order.customerName} • {order.items.length} Item(s) • Blue Dart #{order.trackingNumber || 'AWB-PENDING'}
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-black text-slate-950 text-sm">
                    ₹{order.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {order.paymentMethod}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Buffer Warnings */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Critical Stock Alerts</span>
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                SKUs requiring immediate distributor replenishment
              </p>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 font-mono"
            >
              Inventory Center
            </Link>
          </div>

          <div className="space-y-3">
            {products
              .filter((p) => p.stock <= 5)
              .slice(0, 4)
              .map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]?.imageUrl}
                      alt={prod.name}
                      className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">{prod.name}</div>
                      <div className="text-[10px] text-slate-500">SKU: {prod.sku}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-red-600">
                      {prod.stock} Left in Hub
                    </div>
                    <div className="text-[10px] text-slate-400">Reorder Level: 10</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
