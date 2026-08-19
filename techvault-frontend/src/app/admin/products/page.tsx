'use client';

import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Sliders
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product, ProductVariant, ProductSpecification, Category } from '@/types';

export default function AdminProductsPage() {
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const brands = useStore((state) => state.brands);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Create / Edit Product
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategoryId, setFormCategoryId] = useState<number>(categories[0]?.id || 1);
  const [formBrandId, setFormBrandId] = useState<number>(brands[0]?.id || 1);
  const [formBasePrice, setFormBasePrice] = useState<number>(9999);
  const [formMrpPrice, setFormMrpPrice] = useState<number>(12999);
  const [formStock, setFormStock] = useState<number>(20);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formWarranty, setFormWarranty] = useState('1 Year Brand Warranty');

  // Dynamic Specs Form State
  const [dynamicSpecsState, setDynamicSpecsState] = useState<Record<string, string>>({});

  const selectedCategoryObj = categories.find((c) => c.id === formCategoryId) || categories[0];

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`DNX-SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormCategoryId(categories[0]?.id || 1);
    setFormBrandId(brands[0]?.id || 1);
    setFormBasePrice(9999);
    setFormMrpPrice(12999);
    setFormStock(25);
    setFormShortDesc('');
    setFormDesc('');
    setFormImageUrl('https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80');
    setFormWarranty('1 Year Brand Warranty');
    setDynamicSpecsState({});
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSku(product.sku);
    setFormCategoryId(product.category.id);
    setFormBrandId(product.brand.id);
    setFormBasePrice(product.basePrice);
    setFormMrpPrice(product.mrpPrice);
    setFormStock(product.stock);
    setFormShortDesc(product.shortDescription || '');
    setFormDesc(product.description || '');
    setFormImageUrl(product.images[0]?.imageUrl || '');
    setFormWarranty(product.warrantyInfo || '1 Year Brand Warranty');

    const specsMap: Record<string, string> = {};
    product.specifications.forEach((s) => {
      specsMap[s.fieldKey] = s.fieldValue;
    });
    setDynamicSpecsState(specsMap);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = categories.find((c) => c.id === Number(formCategoryId)) || categories[0];
    const brand = brands.find((b) => b.id === Number(formBrandId)) || brands[0];
    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const discountPercentage = Math.round(((formMrpPrice - formBasePrice) / formMrpPrice) * 100);

    // Prepare dynamic specifications array from category template
    const specifications: ProductSpecification[] = (category.specFields || []).map((field) => ({
      fieldKey: field.fieldKey,
      fieldName: field.fieldName,
      fieldValue: dynamicSpecsState[field.fieldKey] || 'N/A',
      groupName: 'General Specifications'
    }));

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        sku: formSku,
        category,
        brand,
        basePrice: Number(formBasePrice),
        mrpPrice: Number(formMrpPrice),
        discountPercentage,
        stock: Number(formStock),
        shortDescription: formShortDesc,
        description: formDesc,
        warrantyInfo: formWarranty,
        specifications: specifications.length > 0 ? specifications : editingProduct.specifications,
        images: [{ id: 1, imageUrl: formImageUrl, isPrimary: true, sortOrder: 1 }]
      });
    } else {
      const defaultVariant: ProductVariant = {
        id: Date.now(),
        productId: 0,
        variantName: 'Standard Edition',
        sku: formSku,
        price: Number(formBasePrice),
        mrpPrice: Number(formMrpPrice),
        attributes: {},
        isDefault: true,
        stock: Number(formStock)
      };

      addProduct({
        name: formName,
        slug,
        sku: formSku,
        brand,
        category,
        shortDescription: formShortDesc,
        description: formDesc,
        basePrice: Number(formBasePrice),
        mrpPrice: Number(formMrpPrice),
        discountPercentage,
        isFeatured: true,
        isTrending: true,
        isBestSeller: false,
        isDealOfTheDay: false,
        isNewArrival: true,
        isActive: true,
        warrantyInfo: formWarranty,
        stock: Number(formStock),
        images: [{ id: 1, imageUrl: formImageUrl, isPrimary: true, sortOrder: 1 }],
        variants: [defaultVariant],
        specifications
      });
    }

    setModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategoryFilter !== 'ALL' && p.category.slug !== selectedCategoryFilter) {
      return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
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
            Hardware Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Product Management</span>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold border border-slate-200">
              {products.length} Products
            </span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-sm shadow-sky-600/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Product Name, Brand or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="bg-slate-50 text-xs text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer w-full sm:w-auto font-medium"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Category & Brand</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Selling Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]?.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-contain bg-slate-50 p-1 border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-sky-700 font-mono font-medium">
                          {product.variants.length} Variant(s)
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-800">{product.category.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">{product.brand.name}</div>
                  </td>

                  <td className="p-4 font-mono text-slate-600">{product.sku}</td>

                  <td className="p-4 font-mono font-bold text-slate-950">
                    ₹{product.basePrice.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        product.stock <= 5
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>

                  <td className="p-4 font-mono font-bold text-amber-600">
                    ★ {product.ratingAverage.toFixed(1)}
                  </td>

                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-sky-700 hover:bg-slate-200 transition"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {editingProduct ? `Edit Hardware: ${editingProduct.name}` : 'Add New Hardware Product'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Keychron Q1 Pro Wireless Mechanical Keyboard"
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Category</label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(Number(e.target.value))}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Brand</label>
                  <select
                    value={formBrandId}
                    onChange={(e) => setFormBrandId(Number(e.target.value))}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formMrpPrice}
                    onChange={(e) => setFormMrpPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Warranty Period</label>
                  <input
                    type="text"
                    value={formWarranty}
                    onChange={(e) => setFormWarranty(e.target.value)}
                    placeholder="e.g. 2 Years Limited Hardware Warranty"
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {/* Dynamic Category Specifications Section */}
              {selectedCategoryObj.specFields && selectedCategoryObj.specFields.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Dynamic Category Specifications ({selectedCategoryObj.name})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCategoryObj.specFields.map((field) => (
                      <div key={field.id} className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 block">
                          {field.fieldName} {field.unit ? `(${field.unit})` : ''}
                        </label>
                        {field.fieldType === 'select' && field.options ? (
                          <select
                            value={dynamicSpecsState[field.fieldKey] || field.options[0]}
                            onChange={(e) =>
                              setDynamicSpecsState({
                                ...dynamicSpecsState,
                                [field.fieldKey]: e.target.value
                              })
                            }
                            className="w-full bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none"
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={dynamicSpecsState[field.fieldKey] || ''}
                            onChange={(e) =>
                              setDynamicSpecsState({
                                ...dynamicSpecsState,
                                [field.fieldKey]: e.target.value
                              })
                            }
                            placeholder={`e.g. ${field.fieldName}`}
                            className="w-full bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Short Feature Summary</label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Key highlight specs..."
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
