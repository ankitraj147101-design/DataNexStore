'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  Truck,
  Eye,
  Edit2,
  Plus,
  Package,
  Clock,
  CheckCircle2,
  Tag,
  Heart,
  MessageSquare,
  FileText,
  Lock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function DashboardPage() {
  const currentUser = useStore((state) => state.currentUser);
  const orders = useStore((state) => state.orders);
  const wishlist = useStore((state) => state.wishlist);
  const logout = useStore((state) => state.logout);
  const updateUserProfile = useStore((state) => state.updateUserProfile);

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'security' | 'coupons'>('orders');
  const [orderFilter, setOrderFilter] = useState<'ALL' | 'IN_TRANSIT' | 'DELIVERED'>('ALL');
  
  // Profile edit state
  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 9911371218');
  const [email, setEmail] = useState(currentUser?.email || 'customer@datanexstore.in');
  const [gstin, setGstin] = useState('29AABCT8829K1ZR');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Address modal state
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      tag: 'HOME (DEFAULT)',
      name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : 'Customer',
      phone: currentUser?.phone || '+91 9911371218',
      line1: 'Flat 402, Skyline Residency, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      isDefault: true
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    tag: 'HOME',
    name: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ firstName, lastName, phone, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.name && newAddress.line1) {
      setAddresses([
        ...addresses,
        {
          id: `addr-${Date.now()}`,
          tag: newAddress.tag,
          name: newAddress.name,
          phone: newAddress.phone || phone,
          line1: newAddress.line1,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
          isDefault: false
        }
      ]);
      setNewAddressModal(false);
      setNewAddress({ tag: 'HOME', name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'IN_TRANSIT') return o.status === 'SHIPPED' || o.status === 'OUT_FOR_DELIVERY';
    if (orderFilter === 'DELIVERED') return o.status === 'DELIVERED';
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 space-y-8">
        {/* Profile Hero Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-black text-3xl shadow-md shadow-sky-600/20">
                {currentUser?.firstName?.charAt(0) || 'C'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : 'Customer Account'}
                  </h1>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                    Verified Customer
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-3">
                  <span>{currentUser?.email || 'customer@datanexstore.in'}</span>
                  <span>•</span>
                  <span>WhatsApp: {currentUser?.phone || '+91 9911371218'}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Member since July 2026 • Priority Air Dispatch Tier
                </div>
              </div>
            </div>

            {/* Quick Action Concierge */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919911371218?text=Hello%20Datanexstore!%20I%20am%20reaching%20out%20from%20my%20Customer%20Account%20portal%20for%20order%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-2 shadow-xs font-mono"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Helpdesk</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Orders</div>
              <div className="text-xl font-black text-slate-900">{orders.length} Orders</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Active Air Shipments</div>
              <div className="text-xl font-black text-sky-600">
                {orders.filter(o => o.status === 'SHIPPED' || o.status === 'OUT_FOR_DELIVERY').length} In Transit
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Saved Wishlist</div>
              <div className="text-xl font-black text-rose-600">{wishlist.length} Products</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Available Coupons</div>
              <div className="text-xl font-black text-emerald-600">3 Promo Codes</div>
            </div>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="bg-white border border-slate-200 rounded-3xl p-3 space-y-1.5 shadow-xs">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
              Account Navigation
            </div>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition ${
                activeTab === 'orders'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <span>My Orders & Invoices</span>
              </div>
              <span className="bg-white text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border border-slate-200">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition ${
                activeTab === 'profile'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-indigo-600" />
              <span>Profile & Tax Details</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition ${
                activeTab === 'addresses'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Saved Delivery Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition ${
                activeTab === 'coupons'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Tag className="w-4 h-4 text-amber-600" />
              <span>Exclusive Promo Coupons</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition ${
                activeTab === 'security'
                  ? 'bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 text-purple-600" />
              <span>Security & Devices</span>
            </button>

            {/* Logout Option */}
            <div className="pt-3 border-t border-slate-100 mt-3">
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="w-full flex items-center gap-2.5 p-3 rounded-2xl text-xs font-bold transition text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* Main Active Tab Panel */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* TAB 1: ORDERS & INVOICES */}
            {activeTab === 'orders' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Order History & Tax Invoices
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Review all verified hardware purchases, download invoices, and track live Blue Dart air shipments.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-mono">
                    <button
                      onClick={() => setOrderFilter('ALL')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition ${
                        orderFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      All ({orders.length})
                    </button>
                    <button
                      onClick={() => setOrderFilter('IN_TRANSIT')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition ${
                        orderFilter === 'IN_TRANSIT' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      In Transit
                    </button>
                    <button
                      onClick={() => setOrderFilter('DELIVERED')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition ${
                        orderFilter === 'DELIVERED' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Delivered
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs hover:border-slate-300 transition"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <div className="text-[11px] text-slate-500 font-mono uppercase">Order Reference</div>
                          <div className="text-base font-black text-slate-900 font-mono flex items-center gap-2">
                            <span>#{order.orderNumber}</span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                order.status === 'DELIVERED'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-sky-50 text-sky-800 border border-sky-200'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="text-[11px] text-slate-500 font-mono uppercase">Order Placed Date</div>
                          <div className="text-xs font-bold text-slate-800 font-mono">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-14 h-14 object-contain rounded-xl bg-white p-1.5 border border-slate-200"
                              />
                              <div>
                                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                                  {item.productName}
                                </div>
                                {item.variantName && (
                                  <div className="text-[11px] text-slate-500 font-mono">
                                    Edition: <strong className="text-slate-800">{item.variantName}</strong>
                                  </div>
                                )}
                                <div className="text-[11px] text-slate-500 font-mono">
                                  Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            <div className="text-sm font-black text-slate-950 font-mono text-right">
                              ₹{item.totalPrice.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions & Tracking Bar */}
                      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-slate-600 font-mono">
                            Courier: <strong className="text-slate-900">{order.courierName || 'Blue Dart Express'}</strong> • AWB: <strong className="text-sky-700">{order.trackingNumber || 'BLUEDART-882941029'}</strong>
                          </div>
                          <div className="text-[11px] text-emerald-700 font-mono font-semibold">
                            ✓ Verified & Confirmed via WhatsApp Desk (+91 9911371218)
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/track-order?awb=${order.trackingNumber || order.orderNumber}`}
                            className="bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 font-mono"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Live Track</span>
                          </Link>

                          <a
                            href={`https://wa.me/919911371218?text=${encodeURIComponent(
                              `Hello Datanexstore! Please share invoice and live status for Order #${order.orderNumber}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 font-mono"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Help on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & IDENTITY */}
            {activeTab === 'profile' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Profile & Business Tax Settings
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Update your primary account details and GSTIN for official B2B invoice generation.
                  </p>
                </div>

                {savedSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Profile settings updated and saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">First Name *</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">Official WhatsApp Number *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1.5">Primary Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 text-xs text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">
                      Business GSTIN (Optional — for 18% Input Tax Credit Tax Invoice)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 29AABCT8829K1ZR"
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3.5 rounded-2xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition shadow-xs font-mono"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Manage home, studio, and workplace addresses for 1-click air courier checkout.
                    </p>
                  </div>

                  <button
                    onClick={() => setNewAddressModal(true)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-1.5 shadow-xs font-mono"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Address Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                            {addr.tag}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-900">{addr.name}</div>
                        <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {addr.line1}<br />
                          {addr.city}, {addr.state} - <strong className="font-mono">{addr.pincode}</strong>
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-2">
                          Contact: <strong className="text-slate-800">{addr.phone}</strong>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Insured Delivery Hub</span>
                        <button className="text-sky-600 hover:text-sky-700 font-bold">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Modal Form */}
                {newAddressModal && (
                  <div className="bg-white border border-sky-200 rounded-3xl p-6 space-y-4 shadow-lg animate-in fade-in duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-sm font-bold text-slate-900 font-mono uppercase">
                        Add New Delivery Address
                      </h3>
                      <button
                        onClick={() => setNewAddressModal(false)}
                        className="text-xs text-slate-400 hover:text-slate-700 font-mono"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Recipient Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">Phone Number *</label>
                          <input
                            type="text"
                            required
                            placeholder="+91 9911371218"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Street Address / Flat / Building *</label>
                        <input
                          type="text"
                          required
                          placeholder="Flat/House No, Building, Street, Landmark"
                          value={newAddress.line1}
                          onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                          className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">City *</label>
                          <input
                            type="text"
                            required
                            placeholder="Bengaluru"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">State *</label>
                          <input
                            type="text"
                            required
                            placeholder="Karnataka"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">PIN Code *</label>
                          <input
                            type="text"
                            required
                            placeholder="560103"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition font-mono"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: COUPONS & DISCOUNTS */}
            {activeTab === 'coupons' && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Exclusive Promotional Coupons
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Available vouchers and discounts linked to your verified account.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1 rounded-xl">
                        DATANEX500
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">ACTIVE</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">Flat ₹500 Savings</div>
                    <p className="text-xs text-slate-500">Applicable on cart orders above ₹4,999.</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono bg-indigo-50 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-xl">
                        DATANEX10
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">ACTIVE</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">10% Off Orders Above ₹2,000</div>
                    <p className="text-xs text-slate-500">Instant 10% discount across keyboards and accessories.</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black font-mono bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-xl">
                        DATANEXVIP
                      </span>
                      <span className="text-[10px] text-emerald-700 font-mono font-bold">ACTIVE</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">15% Component Upgrade</div>
                    <p className="text-xs text-slate-500">Save up to ₹3,500 on high-end NVMe SSDs & Processors.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SECURITY & DEVICES */}
            {activeTab === 'security' && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Account Security & Session Management
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    End-to-end 256-bit encryption safeguards your account identity and order logs.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">WhatsApp 2-Factor Authentication</div>
                        <div className="text-[11px] text-slate-500">Linked to Phone: +91 9911371218</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 font-mono">ACTIVE</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-200">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Encrypted Cloud Storage</div>
                        <div className="text-[11px] text-slate-500">AES-256 Bit In-Transit Protection</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 font-mono">ENCRYPTED</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
