'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Building2,
  Calendar,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const awbParam = searchParams.get('awb') || '';
  const [query, setQuery] = useState(awbParam);
  const [searched, setSearched] = useState(Boolean(awbParam));

  const orders = useStore((state) => state.orders);
  const order = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === query.trim().toLowerCase() ||
      (o.trackingNumber && o.trackingNumber.toLowerCase() === query.trim().toLowerCase())
  ) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearched(true);
    }
  };

  const checkpoints = [
    { title: 'Electronic Shipping Info Received', location: 'DataNex Warehouse, Bengaluru Hub', time: '15 Aug 2026, 11:30 AM', done: true },
    { title: 'Package Picked Up & Screened', location: 'Bengaluru Sort Facility', time: '15 Aug 2026, 04:15 PM', done: true },
    { title: 'Departed Facility in Transit', location: 'Blue Dart Aviation Cargo (Flight BLR-DEL)', time: '16 Aug 2026, 02:00 AM', done: true },
    { title: 'Arrived at Destination Distribution Center', location: 'Delhi Express Logistics Hub', time: '16 Aug 2026, 08:45 AM', done: order?.status === 'SHIPPED' || order?.status === 'OUT_FOR_DELIVERY' || order?.status === 'DELIVERED' },
    { title: 'Out for Delivery (Courier Assigned)', location: 'Delivery Agent (Ramesh S. - OTP Verification)', time: '17 Aug 2026, 09:30 AM', done: order?.status === 'OUT_FOR_DELIVERY' || order?.status === 'DELIVERED' },
    { title: 'Delivered & Handed Over', location: 'Recipient Doorstep', time: 'Estimated by 6:00 PM', done: order?.status === 'DELIVERED' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header & Search */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Logistics & Carrier Milestone Tracking
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Track Your Hardware Shipment</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g. DNX-2026-89412) or AWB Tracking Number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition shadow-xs"
          >
            Track Status
          </button>
        </form>
      </div>

      {order && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="text-xs text-slate-500 font-mono">Order Number</div>
              <div className="text-base font-black text-slate-900 font-mono">{order.orderNumber}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">Carrier Partner & AWB</div>
              <div className="text-xs font-bold text-sky-700 font-mono">
                {order.courierName || 'Blue Dart Express'} • {order.trackingNumber || 'BLUEDART-882941029'}
              </div>
            </div>
            <div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase font-mono ${
                  order.status === 'DELIVERED'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-sky-50 text-sky-800 border border-sky-200'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* WhatsApp Desk Verification Banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  {order.status === 'PENDING'
                    ? 'Awaiting WhatsApp Verification from Store Desk'
                    : 'Verified & Confirmed via WhatsApp (+91 9911371218)'}
                </div>
                <div className="text-[11px] text-emerald-800">
                  Order Payment Mode: <strong className="font-mono">{order.payment.paymentMethod}</strong>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/919911371218?text=${encodeURIComponent(
                `Hello Datanexstore! Please update me on the live status of Order #${order.orderNumber}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition font-mono whitespace-nowrap"
            >
              Ask on WhatsApp
            </a>
          </div>

          {/* Timeline Checkpoints */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Live Transit Milestones
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {checkpoints.map((cp, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      cp.done
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>

                  <div className="space-y-0.5">
                    <div className={`text-xs font-bold ${cp.done ? 'text-slate-900' : 'text-slate-400'}`}>
                      {cp.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3 h-3 text-sky-600" />
                      <span>{cp.location}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {cp.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="text-center py-20 text-xs text-slate-500">Loading Tracking...</div>}>
          <TrackOrderContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
