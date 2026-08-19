'use client';

import React from 'react';
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
  Truck
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

const CATEGORY_COLORS = ['#0284c7', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function AdminDashboardPage() {
  const adminStats = useStore((state) => state.adminStats);
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING' || o.status === 'CONFIRMED').length;

  const statCards = [
    {
      title: 'Total Gross Revenue',
      value: `₹${adminStats.totalRevenue.toLocaleString()}`,
      change: '+18.4% vs last week',
      isPositive: true,
      icon: DollarSign,
      color: 'text-sky-700 bg-sky-50 border-sky-200'
    },
    {
      title: 'Today Revenue',
      value: `₹${adminStats.todayRevenue.toLocaleString()}`,
      change: '34 Orders Today',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Active Orders',
      value: `${orders.length} Total`,
      change: `${pendingOrders} Pending Fulfillment`,
      isPositive: false,
      icon: ShoppingBag,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      title: 'Low Stock SKU Alerts',
      value: `${lowStockCount} SKUs`,
      change: 'Requires reorder',
      isPositive: false,
      icon: AlertTriangle,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Store Performance Insights
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Analytics Overview
          </h1>
        </div>
      </div>

      {/* 4 Metric Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 transition-all hover:shadow-md shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-2xl font-black text-slate-950 font-mono tracking-tight">
                {stat.value}
              </div>

              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Clock className="w-3 h-3 text-amber-600" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Area Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Revenue Trajectory (Past 7 Days)</h3>
              <p className="text-xs text-slate-500 font-mono">Real-time daily GMV in INR</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono px-2.5 py-1 rounded-full font-bold">
              +24% Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={adminStats.revenueHistory}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '16px',
                    color: '#0f172a',
                    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)'
                  }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Category Share</h3>
            <p className="text-xs text-slate-500 font-mono">By sales volume</p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={adminStats.categorySales}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {adminStats.categorySales.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    color: '#0f172a'
                  }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Sales']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {adminStats.categorySales.map((c, i) => (
              <div key={c.category} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                />
                <span className="text-slate-600 truncate">{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Stream Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
            <p className="text-xs text-slate-500 font-mono">Live fulfillment queue</p>
          </div>
          <span className="text-xs text-slate-500 font-mono font-bold">
            {orders.length} Total Orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Carrier & Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-mono font-bold text-sky-700">
                    {order.orderNumber}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{order.customerName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{order.customerEmail}</div>
                  </td>
                  <td className="p-4 text-slate-700">
                    {order.items.length} Item(s)
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-950">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-mono ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-sky-50 text-sky-800 border border-sky-200'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-600">
                    {order.trackingNumber || 'Pending Dispatch'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
