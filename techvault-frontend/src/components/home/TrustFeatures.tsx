'use client';

import React from 'react';
import {
  Truck,
  ShieldCheck,
  MessageSquare,
  CreditCard,
  Headphones,
  CheckCircle2
} from 'lucide-react';

export default function TrustFeatures() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        
        <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Express Dispatch</div>
            <div className="text-[11px] text-slate-500">Same-day processing</div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">100% Genuine Sealed</div>
            <div className="text-[11px] text-slate-500">Factory Certified Unit</div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Live WhatsApp Desk</div>
            <div className="text-[11px] text-slate-500">+91 9911371218</div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">No-Cost EMI Available</div>
            <div className="text-[11px] text-slate-500">All major bank cards</div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Expert Tech Desk</div>
            <div className="text-[11px] text-slate-500">Free system advice</div>
          </div>
        </div>

      </div>
    </div>
  );
}
