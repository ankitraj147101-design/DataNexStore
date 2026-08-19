'use client';

import React, { useState } from 'react';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  Check,
  X,
  Search,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/product/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProductsPage() {
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const brands = useStore((state) => state.brands);
  const filters = useStore((state) => state.filters);

  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const toggleBrandFilter = useStore((state) => state.toggleBrandFilter);
  const setPriceRange = useStore((state) => state.setPriceRange);
  const setMinRating = useStore((state) => state.setMinRating);
  const setInStockOnly = useStore((state) => state.setInStockOnly);
  const setSortBy = useStore((state) => state.setSortBy);
  const setDynamicSpecFilter = useStore((state) => state.setDynamicSpecFilter);
  const resetFilters = useStore((state) => state.resetFilters);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Category details for dynamic spec fields
  const activeCategory = categories.find((c) => c.slug === filters.selectedCategory);

  // Filtering Logic
  const filteredProducts = products
    .filter((p) => {
      // Category filter
      if (filters.selectedCategory && p.category.slug !== filters.selectedCategory) {
        return false;
      }
      // Brand filter
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(p.brand.slug)
      ) {
        return false;
      }
      // Price range
      if (
        p.basePrice < filters.priceRange[0] ||
        p.basePrice > filters.priceRange[1]
      ) {
        return false;
      }
      // Rating filter
      if (filters.minRating && p.ratingAverage < filters.minRating) {
        return false;
      }
      // In-stock only
      if (filters.inStockOnly && p.stock <= 0) {
        return false;
      }
      // Dynamic specs filter
      for (const [key, values] of Object.entries(filters.dynamicSpecs)) {
        if (values && values.length > 0) {
          const spec = p.specifications.find((s) => s.fieldKey === key);
          if (!spec || !values.some((v) => spec.fieldValue.toLowerCase().includes(v.toLowerCase()))) {
            return false;
          }
        }
      }
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.name.toLowerCase().includes(q);
        const matchCategory = p.category.name.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchCategory && !matchSku) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (filters.sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (filters.sortBy === 'rating') return b.ratingAverage - a.ratingAverage;
      if (filters.sortBy === 'newest') return b.id - a.id;
      return 0; // featured default
    });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-6 pb-24 sm:pb-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
              <span>DATANEXSTORE MASTER CATALOG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>{activeCategory ? activeCategory.name : 'All Electronics Hardware & Peripherals'}</span>
              <span className="text-xs bg-sky-50 text-sky-800 border border-sky-200 font-mono px-3 py-0.5 rounded-full font-bold">
                {filteredProducts.length} Products in Stock
              </span>
            </h1>
          </div>

          {/* View Toggles & Sort */}
          <div className="flex items-center gap-3">
            {/* View Mode Buttons */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-slate-100 text-sky-700'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list'
                    ? 'bg-slate-100 text-sky-700'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white text-xs font-bold text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden bg-sky-600 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Filter Sidebar */}
          <aside
            className={`lg:block ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
                : 'hidden'
            } lg:relative lg:bg-transparent lg:p-0 space-y-6`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 lg:hidden">
                <span className="text-base font-bold text-slate-900">Filter Hardware</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  Filters & Specs
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Category
                </span>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition font-medium ${
                      filters.selectedCategory === null
                        ? 'bg-sky-50 text-sky-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                        filters.selectedCategory === cat.slug
                          ? 'bg-sky-50 text-sky-800 font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">
                        {cat.productCount || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Brand
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {brands.map((brand) => {
                    const isChecked = filters.selectedBrands.includes(brand.slug);
                    return (
                      <label
                        key={brand.id}
                        className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBrandFilter(brand.slug)}
                          className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                        />
                        <span>{brand.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 uppercase tracking-wider">Price Cap</span>
                  <span className="font-mono font-bold text-sky-700">
                    ₹{filters.priceRange[1].toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={150000}
                  step={1000}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([filters.priceRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Rating Filter */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Customer Rating
                </span>
                <div className="flex items-center gap-1.5">
                  {[4, 3, 2].map((stars) => (
                    <button
                      key={stars}
                      onClick={() =>
                        setMinRating(filters.minRating === stars ? null : stars)
                      }
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-bold flex items-center gap-1 transition ${
                        filters.minRating === stars
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{stars}★+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              {/* Dynamic Category Specifications Filter */}
              {activeCategory && activeCategory.specFields && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold">
                    {activeCategory.name} Technical Specs
                  </div>

                  {activeCategory.specFields
                    .filter((field) => field.isFilterable && field.options)
                    .map((field) => (
                      <div key={field.id} className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 block">
                          {field.fieldName}
                        </span>
                        <div className="space-y-1">
                          {field.options?.map((opt) => {
                            const isSelected = (
                              filters.dynamicSpecs[field.fieldKey] || []
                            ).includes(opt);
                            return (
                              <label
                                key={opt}
                                className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    setDynamicSpecFilter(field.fieldKey, opt)
                                  }
                                  className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 cursor-pointer"
                                />
                                <span className="line-clamp-1">{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
                <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">No hardware matching current filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your price range, clearing brand selections, or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
