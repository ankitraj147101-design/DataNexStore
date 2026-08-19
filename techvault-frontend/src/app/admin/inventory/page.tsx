'use client';

import React, { useState } from 'react';
import {
  Warehouse,
  AlertTriangle,
  Check,
  Search,
  ArrowUpRight,
  TrendingDown,
  Edit2
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AdminInventoryPage() {
  const products = useStore((state) => state.products);
  const updateStock = useStore((state) => state.updateStock);

  const [search, setSearch] = useState('');
  const [editingStockId, setEditingStockId] = useState<number | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const lowStockItems = products.filter((p) => p.stock <= 5);
  const outOfStockItems = products.filter((p) => p.stock === 0);

  const handleSaveStock = (productId: number, variantId?: number) => {
    updateStock(productId, variantId, tempStockValue);
    setEditingStockId(null);
  };

  const filtered = products.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Warehouse & Fulfillment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Inventory Management</span>
          </h1>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            Total In-Stock Units
          </div>
          <div className="text-2xl font-black text-slate-950 font-mono">
            {products.reduce((sum, p) => sum + p.stock, 0)} Units
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">Across all active catalog variants</div>
        </div>

        <div className="bg-white border border-amber-200 rounded-3xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Low Stock Alerts (≤ 5)</span>
          </div>
          <div className="text-2xl font-black text-amber-800 font-mono">
            {lowStockItems.length} SKUs
          </div>
          <div className="text-[11px] text-slate-500">Reorder recommended from distributor</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-xs">
          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">
            Out of Stock Items
          </div>
          <div className="text-2xl font-black text-slate-950 font-mono">
            {outOfStockItems.length} SKUs
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">Ready for replenishment</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by Hardware name or SKU..."
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
                <th className="p-4">Hardware SKU</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Edition / Variant</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <React.Fragment key={p.id}>
                  {p.variants.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-4">
                        <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-sky-700 font-mono font-medium">{v.sku}</div>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">{p.brand.name}</td>

                      <td className="p-4 font-mono text-slate-700">{v.variantName}</td>

                      <td className="p-4">
                        {editingStockId === v.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(Number(e.target.value))}
                              className="w-20 bg-white text-slate-900 font-mono p-1 rounded border border-sky-500 text-xs"
                            />
                            <button
                              onClick={() => handleSaveStock(p.id, v.id)}
                              className="bg-sky-600 text-white p-1 rounded font-bold"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="font-mono font-bold text-sm text-slate-950">
                            {v.stock} units
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase font-mono ${
                            v.stock <= 5
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {v.stock <= 5 ? 'LOW STOCK' : 'OPTIMAL'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            setEditingStockId(v.id);
                            setTempStockValue(v.stock);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] px-3 py-1.5 rounded-lg border border-slate-200 transition"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
