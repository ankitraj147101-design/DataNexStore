'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Printer,
  X
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Order, OrderStatus } from '@/types';

const STATUS_ORDER: OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'PACKED',
  'SHIPPED',
  'OUT_FOR_DELIVERY',
  'DELIVERED'
];

export default function AdminOrdersPage() {
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const confirmOrderViaWhatsApp = useStore((state) => state.confirmOrderViaWhatsApp);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Tracking details modal
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState('Blue Dart Express');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleAdvanceStatus = (order: Order) => {
    const currentIndex = STATUS_ORDER.indexOf(order.status);
    if (currentIndex >= 0 && currentIndex < STATUS_ORDER.length - 1) {
      const nextStatus = STATUS_ORDER[currentIndex + 1];
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingModalOrder && trackingNumber) {
      updateOrderStatus(trackingModalOrder.id, 'SHIPPED', {
        courierName,
        trackingNumber,
        trackingUrl: 'https://www.bluedart.com'
      });
      setTrackingModalOrder(null);
      setTrackingNumber('');
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Fulfillment & Logistics
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Order Processing Lifecycle</span>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold border border-slate-200">
              {orders.length} Total Orders
            </span>
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order Number, Customer Name, Email, or AWB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 text-xs text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer w-full sm:w-auto font-medium"
        >
          <option value="ALL">All Statuses</option>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Amount & Payment</th>
                <th className="p-4">Lifecycle Status</th>
                <th className="p-4">Courier & AWB</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => {
                const currentIndex = STATUS_ORDER.indexOf(order.status);
                const nextStatus =
                  currentIndex >= 0 && currentIndex < STATUS_ORDER.length - 1
                    ? STATUS_ORDER[currentIndex + 1]
                    : null;

                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="font-mono font-bold text-sky-700">{order.orderNumber}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{order.customerName}</div>
                      <div className="text-[10px] text-slate-500">{order.customerEmail}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{order.customerPhone}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-900 font-bold">{order.items.length} Item(s)</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 max-w-xs">
                        {order.items.map((i) => i.productName).join(', ')}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-mono font-bold text-slate-950">
                        ₹{order.totalAmount.toLocaleString()}
                      </div>
                      <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold mt-0.5">
                        {order.payment.paymentMethod}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-mono ${
                          order.status === 'DELIVERED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : order.status === 'SHIPPED'
                            ? 'bg-sky-50 text-sky-800 border border-sky-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {order.trackingNumber ? (
                        <div>
                          <div className="text-slate-800 font-bold">{order.courierName}</div>
                          <div className="text-sky-700 font-mono text-[10px] font-semibold">{order.trackingNumber}</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setTrackingModalOrder(order);
                            setTrackingNumber(`BD-${Math.floor(100000000 + Math.random() * 900000000)}`);
                          }}
                          className="text-[10px] bg-slate-100 hover:bg-slate-200 text-sky-800 px-2.5 py-1 rounded-md border border-slate-200 font-mono font-bold"
                        >
                          + Add Tracking
                        </button>
                      )}
                    </td>

                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => confirmOrderViaWhatsApp(order.id, true)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shadow-xs font-mono"
                          title="Accept & Confirm Order via WhatsApp"
                        >
                          Accept (WhatsApp)
                        </button>
                      )}

                      {nextStatus && order.status !== 'PENDING' && (
                        <button
                          onClick={() => handleAdvanceStatus(order)}
                          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition shadow-xs"
                          title={`Advance to ${nextStatus}`}
                        >
                          Mark as {nextStatus}
                        </button>
                      )}

                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '') || '919911371218'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px] px-2 py-1.5 rounded-lg transition font-mono"
                        title="Chat on WhatsApp"
                      >
                        WhatsApp
                      </a>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-200 transition"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-black text-slate-900 font-mono">
                  Order: {selectedOrder.orderNumber}
                </h2>
                <div className="text-xs text-slate-500">
                  Customer: {selectedOrder.customerName} ({selectedOrder.customerEmail})
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Line Items
              </div>
              <div className="divide-y divide-slate-100 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-10 h-10 rounded-lg object-contain bg-white p-1 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          SKU: {item.sku} • Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-950">
                      ₹{item.totalPrice.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="text-slate-500 font-bold uppercase text-[10px] font-mono">
                Shipping Destination
              </div>
              <div className="font-bold text-slate-900">{selectedOrder.shippingAddress.fullName}</div>
              <div className="text-slate-700">{selectedOrder.shippingAddress.addressLine1}</div>
              <div className="text-slate-600">
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
              </div>
              <div className="text-slate-500">Phone: {selectedOrder.shippingAddress.phone}</div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
              </div>
              {selectedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>- ₹{selectedOrder.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-700">
                <span>Shipping</span>
                <span>₹{selectedOrder.shippingCharge}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Received</span>
                <span className="text-sky-700">₹{selectedOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* WhatsApp Control Bar */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  WhatsApp Verification Status: {selectedOrder.status}
                </div>
                <div className="text-[11px] text-emerald-800">
                  Customer Phone: <strong className="font-mono">{selectedOrder.customerPhone}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedOrder.status === 'PENDING' && (
                  <button
                    onClick={() => {
                      confirmOrderViaWhatsApp(selectedOrder.id, true);
                      setSelectedOrder({ ...selectedOrder, status: 'CONFIRMED', whatsappConfirmed: true });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs font-mono"
                  >
                    Accept Order (WhatsApp)
                  </button>
                )}

                <a
                  href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, '') || '919911371218'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition font-mono"
                >
                  Open WhatsApp Chat
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Tracking Modal */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Tracking & Dispatch</h3>
              <button onClick={() => setTrackingModalOrder(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTracking} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Courier Partner</label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                >
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="Delhivery Surface">Delhivery Surface</option>
                  <option value="DTDC Air Express">DTDC Air Express</option>
                  <option value="FedEx Express">FedEx Express</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">AWB Tracking Number</label>
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. BD-882914801"
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setTrackingModalOrder(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  Confirm & Mark Shipped
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
