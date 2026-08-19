'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  ShoppingBag,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Download,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Crown,
  ChevronRight,
  X,
  Clock,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useStore } from '@/store/useStore';

interface CustomerProfile {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  pincode?: string;
  addressLine?: string;
  ordersCount: number;
  totalSpent: number;
  status: 'ACTIVE' | 'VIP' | 'NEW';
  joined: string;
  orders: {
    orderNumber: string;
    totalAmount: number;
    status: string;
    date: string;
    itemsCount: number;
  }[];
}

const DEFAULT_DEMO_CUSTOMERS: CustomerProfile[] = [
  {
    id: 1,
    name: 'Aakash Verma',
    email: 'aakash.verma@datanexstore.in',
    phone: '+91 9123456789',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    addressLine: 'Indiranagar 100ft Road',
    ordersCount: 2,
    totalSpent: 44993,
    status: 'ACTIVE',
    joined: '2026-06-15',
    orders: [
      { orderNumber: 'DNX-98214', totalAmount: 24999, status: 'DELIVERED', date: '2026-07-10', itemsCount: 1 },
      { orderNumber: 'DNX-98102', totalAmount: 19994, status: 'DELIVERED', date: '2026-06-15', itemsCount: 2 }
    ]
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 9876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    addressLine: 'Bandra West, Hill Road',
    ordersCount: 4,
    totalSpent: 89490,
    status: 'VIP',
    joined: '2026-05-20',
    orders: [
      { orderNumber: 'DNX-99014', totalAmount: 34990, status: 'PROCESSING', date: '2026-08-18', itemsCount: 1 },
      { orderNumber: 'DNX-98540', totalAmount: 28500, status: 'DELIVERED', date: '2026-07-22', itemsCount: 2 },
      { orderNumber: 'DNX-98210', totalAmount: 26000, status: 'DELIVERED', date: '2026-06-04', itemsCount: 1 }
    ]
  },
  {
    id: 3,
    name: 'Vikramaditya Nair',
    email: 'vikram.nair@outlook.com',
    phone: '+91 9811223344',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    addressLine: 'Hitec City, Madhapur',
    ordersCount: 1,
    totalSpent: 16999,
    status: 'ACTIVE',
    joined: '2026-07-02',
    orders: [
      { orderNumber: 'DNX-98319', totalAmount: 16999, status: 'DELIVERED', date: '2026-07-02', itemsCount: 1 }
    ]
  },
  {
    id: 4,
    name: 'Pooja Iyer',
    email: 'pooja.iyer@gmail.com',
    phone: '+91 9900112233',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600028',
    addressLine: 'R.A. Puram, 4th Main Road',
    ordersCount: 3,
    totalSpent: 54990,
    status: 'VIP',
    joined: '2026-06-28',
    orders: [
      { orderNumber: 'DNX-98920', totalAmount: 22990, status: 'DELIVERED', date: '2026-08-11', itemsCount: 1 },
      { orderNumber: 'DNX-98610', totalAmount: 32000, status: 'DELIVERED', date: '2026-07-15', itemsCount: 2 }
    ]
  }
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'ALL' | 'VIP' | 'ACTIVE' | 'NEW'>('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  const storeOrders = useStore((state) => state.orders);
  const registeredCustomers = useStore((state) => state.registeredCustomers);

  // Combine registered accounts with live placed orders in the store
  const allCustomers = useMemo(() => {
    const customerMap = new Map<string, CustomerProfile>();

    // 1. Seed with registered accounts from store
    (registeredCustomers || []).forEach((c) => {
      customerMap.set(c.email.toLowerCase(), {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        city: c.city || 'New Delhi',
        state: c.state || 'Delhi',
        pincode: c.pincode || '110001',
        addressLine: c.addressLine || 'Registered Account',
        ordersCount: c.ordersCount || 0,
        totalSpent: c.totalSpent || 0,
        status: c.status || 'NEW',
        joined: c.joined || new Date().toISOString().split('T')[0],
        orders: []
      });
    });

    // 2. Merge live order profiles
    storeOrders.forEach((o) => {
      const email = o.customerEmail?.toLowerCase() || `guest_${o.orderNumber.toLowerCase()}@datanex.in`;
      const existing = customerMap.get(email);

      const orderItem = {
        orderNumber: o.orderNumber,
        totalAmount: o.totalAmount,
        status: o.status,
        date: new Date(o.createdAt).toISOString().split('T')[0],
        itemsCount: o.items.length
      };

      if (existing) {
        if (!existing.orders.some((eo) => eo.orderNumber === o.orderNumber)) {
          existing.orders.push(orderItem);
          existing.ordersCount = existing.orders.length;
          existing.totalSpent += o.totalAmount;
          if (existing.totalSpent >= 50000) {
            existing.status = 'VIP';
          } else if (existing.ordersCount > 0) {
            existing.status = 'ACTIVE';
          }
        }
      } else {
        const total = o.totalAmount;
        customerMap.set(email, {
          id: `cust_${o.id}`,
          name: o.customerName || 'Store Customer',
          email: o.customerEmail || email,
          phone: o.customerPhone || '+91 9911371218',
          city: o.shippingAddress?.city || 'New Delhi',
          state: o.shippingAddress?.state || 'Delhi',
          pincode: o.shippingAddress?.pincode || '110001',
          addressLine: o.shippingAddress?.addressLine1 || 'Store Delivery Address',
          ordersCount: 1,
          totalSpent: total,
          status: total >= 50000 ? 'VIP' : 'NEW',
          joined: new Date(o.createdAt).toISOString().split('T')[0],
          orders: [orderItem]
        });
      }
    });

    return Array.from(customerMap.values());
  }, [registeredCustomers, storeOrders]);

  // Filtered customer list
  const filteredCustomers = allCustomers.filter((c) => {
    if (tierFilter !== 'ALL' && c.status !== tierFilter) {
      return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Metrics
  const totalLTV = allCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const vipCount = allCustomers.filter((c) => c.status === 'VIP').length;
  const avgSpend = allCustomers.length > 0 ? Math.round(totalLTV / allCustomers.length) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Customer ID', 'Name', 'Email', 'Phone', 'City', 'State', 'Orders Count', 'Total Spent (INR)', 'Status', 'Joined Date'];
    const rows = filteredCustomers.map((c) => [
      c.id,
      `"${c.name}"`,
      c.email,
      `"${c.phone}"`,
      `"${c.city}"`,
      `"${c.state}"`,
      c.ordersCount,
      c.totalSpent,
      c.status,
      c.joined
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DataNex_Customer_Database_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Accounts & Client CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 font-mono">
            <span>Customer Database</span>
            <span className="text-xs bg-sky-50 text-sky-700 font-mono px-3 py-1 rounded-full font-bold border border-sky-200">
              {allCustomers.length} Total Patrons
            </span>
          </h1>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-2 font-mono shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>Export Customer Directory (.CSV)</span>
        </button>
      </div>

      {/* 4 CRM Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase">
            <span>Total Accounts</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {allCustomers.length}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            100% KYC & Phone Verified
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase">
            <span>Combined Lifetime Value</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono">
            ₹{totalLTV.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Cumulative GMV Spend
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase">
            <span>Average Spend / User</span>
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            ₹{avgSpend.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Across All Categories
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-mono font-bold uppercase">
            <span>VIP Patron Base</span>
            <Crown className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">
            {vipCount} Clients
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Spend Over ₹50,000+
          </div>
        </div>
      </div>

      {/* Main Customer List Table & Search */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs space-y-0">
        
        {/* Search & Tier Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, email, phone or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:bg-white focus:border-sky-600 focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs font-mono text-slate-500 font-bold shrink-0">Filter Tier:</span>
            {(['ALL', 'VIP', 'ACTIVE', 'NEW'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition shrink-0 cursor-pointer ${
                  tierFilter === tier
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Tier Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  <td className="p-4">
                    <div className="font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-sky-400 font-black text-xs flex items-center justify-center font-mono shadow-2xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Client #{c.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-slate-800 font-medium">{c.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{c.phone}</div>
                  </td>

                  <td className="p-4 text-slate-700 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{c.city}, {c.state}</span>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-800">
                    {c.ordersCount} Orders
                  </td>

                  <td className="p-4 font-mono font-black text-emerald-700">
                    ₹{c.totalSpent.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold font-mono inline-flex items-center gap-1 ${
                        c.status === 'VIP'
                          ? 'bg-amber-50 text-amber-900 border border-amber-300'
                          : c.status === 'NEW'
                          ? 'bg-sky-50 text-sky-900 border border-sky-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {c.status === 'VIP' && <Crown className="w-3 h-3 text-amber-600" />}
                      <span>{c.status}</span>
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      {/* WhatsApp Direct Chat */}
                      <a
                        href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                        title={`Chat on WhatsApp (${c.phone})`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>

                      {/* Direct Mail */}
                      <a
                        href={`mailto:${c.email}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                        title={`Send Email to ${c.email}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>

                      {/* View Profile */}
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Customer Detail Modal / Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-sky-400 font-black text-lg flex items-center justify-center font-mono shadow-md">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 font-mono">
                      {selectedCustomer.name}
                    </h2>
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md uppercase">
                      {selectedCustomer.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Registered Client Since {selectedCustomer.joined}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedCustomer.name)},%20greeting%20from%20DataNexStore%20team.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs font-mono flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Message on WhatsApp ({selectedCustomer.phone})</span>
              </a>

              <a
                href={`mailto:${selectedCustomer.email}`}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs font-mono flex items-center justify-center gap-2 transition"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>Send Corporate Email</span>
              </a>
            </div>

            {/* Address & Spending Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl font-mono text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Primary Shipping Address</span>
                <div className="text-slate-900 font-bold">{selectedCustomer.addressLine || 'Store Delivery'}</div>
                <div className="text-slate-600">{selectedCustomer.city}, {selectedCustomer.state} - {selectedCustomer.pincode}</div>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-slate-400 font-bold text-[10px] uppercase">Total Lifetime Spending</span>
                <div className="text-xl font-black text-emerald-700">₹{selectedCustomer.totalSpent.toLocaleString()}</div>
                <div className="text-slate-500">{selectedCustomer.ordersCount} Total Orders Fulfilled</div>
              </div>
            </div>

            {/* Order History Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 font-mono flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <span>Order History ({selectedCustomer.orders.length})</span>
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedCustomer.orders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{ord.orderNumber}</span>
                      <span className="text-slate-400 ml-2">({ord.itemsCount} Items • {ord.date})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-black text-slate-900">₹{ord.totalAmount.toLocaleString()}</span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-2xl transition font-mono"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
