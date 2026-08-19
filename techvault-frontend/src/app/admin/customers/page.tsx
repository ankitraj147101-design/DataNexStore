'use client';

import React, { useState } from 'react';
import { Users, Search, ShoppingBag, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useStore } from '@/store/useStore';

const DEMO_CUSTOMERS = [
  {
    id: 1,
    name: 'Aakash Verma',
    email: 'customer@datanexstore.in',
    phone: '+91 9123456789',
    city: 'Bengaluru',
    state: 'Karnataka',
    ordersCount: 2,
    totalSpent: 44993,
    status: 'ACTIVE',
    joined: '2026-06-15'
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 9876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    ordersCount: 4,
    totalSpent: 89490,
    status: 'ACTIVE',
    joined: '2026-05-20'
  },
  {
    id: 3,
    name: 'Vikramaditya Nair',
    email: 'vikram.nair@outlook.com',
    phone: '+91 9811223344',
    city: 'Hyderabad',
    state: 'Telangana',
    ordersCount: 1,
    totalSpent: 16999,
    status: 'ACTIVE',
    joined: '2026-07-02'
  },
  {
    id: 4,
    name: 'Pooja Iyer',
    email: 'pooja.iyer@gmail.com',
    phone: '+91 9900112233',
    city: 'Chennai',
    state: 'Tamil Nadu',
    ordersCount: 3,
    totalSpent: 54990,
    status: 'ACTIVE',
    joined: '2026-06-28'
  }
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = DEMO_CUSTOMERS.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Accounts & CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Customer Database</span>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold border border-slate-200">
              {DEMO_CUSTOMERS.length} Verified Users
            </span>
          </h1>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, email or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Information</th>
                <th className="p-4">Location</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-slate-800">{c.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.phone}</div>
                  </td>

                  <td className="p-4 text-slate-700">
                    {c.city}, {c.state}
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-800">
                    {c.ordersCount} Orders
                  </td>

                  <td className="p-4 font-mono font-bold text-emerald-700">
                    ₹{c.totalSpent.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                      {c.status}
                    </span>
                  </td>

                  <td className="p-4 text-right font-mono text-slate-500">
                    {c.joined}
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
