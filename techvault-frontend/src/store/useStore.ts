'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Product,
  CartItem,
  Coupon,
  Order,
  User,
  Category,
  Brand,
  Review,
  AdminDashboardStats,
  OrderStatus
} from '@/types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_ADMIN_STATS
} from '@/lib/data/mockData';

interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedBrands: string[];
  priceRange: [number, number];
  minRating: number | null;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  dynamicSpecs: Record<string, string[]>;
}

interface StoreState {
  // Catalog State
  products: Product[];
  categories: Category[];
  brands: Brand[];
  coupons: Coupon[];
  orders: Order[];
  reviews: Review[];
  adminStats: AdminDashboardStats;

  // Filters & Search
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (categorySlug: string | null) => void;
  toggleBrandFilter: (brandSlug: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number | null) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  setDynamicSpecFilter: (fieldKey: string, value: string) => void;
  resetFilters: () => void;

  // Cart State
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, variantId?: number, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleSaveForLater: (cartItemId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist State
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Compare State (Up to 4 products)
  compareList: number[];
  addToCompare: (productId: number) => boolean;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;

  // Recently Viewed State
  recentlyViewed: number[];
  addToRecentlyViewed: (productId: number) => void;

  // Auth User State
  currentUser: User | null;
  loginAs: (role: 'customer' | 'admin') => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<User>) => void;

  // Order Placement
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: number, status: OrderStatus, trackingInfo?: { courierName?: string; trackingNumber?: string; trackingUrl?: string }) => void;
  confirmOrderViaWhatsApp: (orderId: number, accepted: boolean) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'likesCount' | 'isApproved'>) => void;
  toggleReviewLike: (reviewId: number) => void;

  // Admin Catalog Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'ratingAverage' | 'ratingCount' | 'soldCount'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, category: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  updateCoupon: (id: number, coupon: Partial<Coupon>) => void;
  deleteCoupon: (id: number) => void;
  updateStock: (productId: number, variantId: number | undefined, newStock: number) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  selectedCategory: null,
  selectedBrands: [],
  priceRange: [0, 150000],
  minRating: null,
  inStockOnly: false,
  sortBy: 'featured',
  dynamicSpecs: {}
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Master Data
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      brands: INITIAL_BRANDS,
      coupons: INITIAL_COUPONS,
      orders: INITIAL_ORDERS,
      reviews: INITIAL_REVIEWS,
      adminStats: INITIAL_ADMIN_STATS,

      // Filter State
      filters: DEFAULT_FILTERS,
      setSearchQuery: (query) =>
        set((state) => ({ filters: { ...state.filters, searchQuery: query } })),
      setSelectedCategory: (categorySlug) =>
        set((state) => ({
          filters: { ...state.filters, selectedCategory: categorySlug, dynamicSpecs: {} }
        })),
      toggleBrandFilter: (brandSlug) =>
        set((state) => {
          const current = state.filters.selectedBrands;
          const next = current.includes(brandSlug)
            ? current.filter((b) => b !== brandSlug)
            : [...current, brandSlug];
          return { filters: { ...state.filters, selectedBrands: next } };
        }),
      setPriceRange: (range) =>
        set((state) => ({ filters: { ...state.filters, priceRange: range } })),
      setMinRating: (rating) =>
        set((state) => ({ filters: { ...state.filters, minRating: rating } })),
      setInStockOnly: (inStock) =>
        set((state) => ({ filters: { ...state.filters, inStockOnly: inStock } })),
      setSortBy: (sort) =>
        set((state) => ({ filters: { ...state.filters, sortBy: sort } })),
      setDynamicSpecFilter: (fieldKey, value) =>
        set((state) => {
          const currentValues = state.filters.dynamicSpecs[fieldKey] || [];
          const nextValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
          return {
            filters: {
              ...state.filters,
              dynamicSpecs: {
                ...state.filters.dynamicSpecs,
                [fieldKey]: nextValues
              }
            }
          };
        }),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      // Cart
      cart: [],
      appliedCoupon: null,
      addToCart: (product, variantId, quantity = 1) => {
        const variant = variantId
          ? product.variants.find((v) => v.id === variantId)
          : product.variants.find((v) => v.isDefault) || product.variants[0];

        const unitPrice = variant ? variant.price : product.basePrice;
        const itemId = `${product.id}-${variant?.id || 'default'}`;

        set((state) => {
          const existing = state.cart.find((item) => item.id === itemId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      totalPrice: (item.quantity + quantity) * item.unitPrice
                    }
                  : item
              )
            };
          }

          const newItem: CartItem = {
            id: itemId,
            product,
            selectedVariant: variant,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity,
            savedForLater: false
          };

          return { cart: [...state.cart, newItem] };
        });
      },
      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId)
        })),
      updateCartQuantity: (cartItemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((item) => item.id !== cartItemId) };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === cartItemId
                ? { ...item, quantity, totalPrice: quantity * item.unitPrice }
                : item
            )
          };
        }),
      toggleSaveForLater: (cartItemId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId
              ? { ...item, savedForLater: !item.savedForLater }
              : item
          )
        })),
      applyCoupon: (code) => {
        const coupon = get().coupons.find(
          (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
        );
        if (!coupon) {
          return { success: false, message: 'Invalid or expired coupon code' };
        }
        const subtotal = get().getCartSubtotal();
        if (subtotal < coupon.minOrderValue) {
          return {
            success: false,
            message: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString()} required for this coupon`
          };
        }
        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
      },
      removeCoupon: () => set({ appliedCoupon: null }),
      clearCart: () => set({ cart: [], appliedCoupon: null }),
      getCartSubtotal: () => {
        return get()
          .cart.filter((i) => !i.savedForLater)
          .reduce((sum, item) => sum + item.totalPrice, 0);
      },
      getCartDiscount: () => {
        const subtotal = get().getCartSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;
        if (coupon.discountType === 'FIXED') {
          return Math.min(coupon.discountValue, subtotal);
        } else {
          const discount = (subtotal * coupon.discountValue) / 100;
          return coupon.maxDiscountAmount
            ? Math.min(discount, coupon.maxDiscountAmount)
            : discount;
        }
      },
      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const discount = get().getCartDiscount();
        return Math.max(0, subtotal - discount);
      },
      getCartCount: () => {
        return get()
          .cart.filter((i) => !i.savedForLater)
          .reduce((sum, item) => sum + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) =>
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId]
          };
        }),
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // Compare
      compareList: [],
      addToCompare: (productId) => {
        const current = get().compareList;
        if (current.includes(productId)) return true;
        if (current.length >= 4) return false;
        set({ compareList: [...current, productId] });
        return true;
      },
      removeFromCompare: (productId) =>
        set((state) => ({
          compareList: state.compareList.filter((id) => id !== productId)
        })),
      clearCompare: () => set({ compareList: [] }),

      // Recently Viewed
      recentlyViewed: [1, 2, 3],
      addToRecentlyViewed: (productId) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== productId);
          return { recentlyViewed: [productId, ...filtered].slice(0, 8) };
        }),

      // Auth
      currentUser: null,
      loginAs: (role) => {
        if (role === 'admin') {
          set({
            currentUser: {
              id: 1,
              email: 'admin@datanexstore.in',
              firstName: 'Store Admin',
              lastName: 'Desk',
              role: 'ROLE_ADMIN'
            }
          });
        } else {
          set({
            currentUser: {
              id: 2,
              email: 'customer@datanexstore.in',
              firstName: 'Customer',
              lastName: '',
              phone: '+91 9911371218',
              role: 'ROLE_CUSTOMER'
            }
          });
        }
      },
      logout: () => set({ currentUser: null }),
      updateUserProfile: (profile) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...profile }
            : {
                id: Date.now(),
                email: profile.email || 'customer@datanexstore.in',
                firstName: profile.firstName || 'Customer',
                lastName: profile.lastName || '',
                phone: profile.phone || '',
                role: 'ROLE_CUSTOMER',
                ...profile
              }
        })),

      // Order Placement
      createOrder: (orderData) => {
        const newId = Date.now();
        const randomDigits = Math.floor(10000 + Math.random() * 90000);
        const orderNumber = `DNX-2026-${randomDigits}`;
        const newOrder: Order = {
          ...orderData,
          id: newId,
          orderNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          cart: [],
          appliedCoupon: null,
          adminStats: {
            ...state.adminStats,
            totalRevenue: state.adminStats.totalRevenue + newOrder.totalAmount,
            todayRevenue: state.adminStats.todayRevenue + newOrder.totalAmount,
            totalOrders: state.adminStats.totalOrders + 1,
            pendingOrders: state.adminStats.pendingOrders + 1
          }
        }));

        return newOrder;
      },
      updateOrderStatus: (orderId, status, trackingInfo) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status,
                  ...(trackingInfo || {}),
                  updatedAt: new Date().toISOString()
                }
              : o
          )
        })),
      confirmOrderViaWhatsApp: (orderId, accepted) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  status: accepted ? ('CONFIRMED' as const) : ('CANCELLED' as const),
                  whatsappConfirmed: accepted,
                  whatsappConfirmedAt: accepted ? new Date().toISOString() : undefined,
                  payment: {
                    ...o.payment,
                    status: accepted ? ('SUCCESS' as const) : ('FAILED' as const),
                    paidAt: accepted ? new Date().toISOString() : undefined
                  },
                  updatedAt: new Date().toISOString()
                }
              : o
          )
        })),

      // Reviews
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          likesCount: 0,
          isApproved: true
        };
        set((state) => ({ reviews: [newReview, ...state.reviews] }));
      },
      toggleReviewLike: (reviewId) =>
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId ? { ...r, likesCount: (r.likesCount || 0) + 1 } : r
          )
        })),

      // Admin Management
      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          ratingAverage: 5.0,
          ratingCount: 1,
          soldCount: 0
        };
        set((state) => ({
          products: [newProduct, ...state.products],
          adminStats: {
            ...state.adminStats,
            totalProducts: state.adminStats.totalProducts + 1
          }
        }));
      },
      updateProduct: (id, productData) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...productData } : p
          )
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          adminStats: {
            ...state.adminStats,
            totalProducts: Math.max(0, state.adminStats.totalProducts - 1)
          }
        })),
      addCategory: (catData) => {
        const newCategory: Category = {
          ...catData,
          id: Date.now(),
          productCount: 0
        };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },
      updateCategory: (id, catData) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...catData } : c
          )
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id)
        })),
      addCoupon: (couponData) => {
        const newCoupon: Coupon = { ...couponData, id: Date.now() };
        set((state) => ({ coupons: [...state.coupons, newCoupon] }));
      },
      updateCoupon: (id, couponData) =>
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, ...couponData } : c
          )
        })),
      deleteCoupon: (id) =>
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id)
        })),
      updateStock: (productId, variantId, newStock) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId) return p;
            if (variantId) {
              const updatedVariants = p.variants.map((v) =>
                v.id === variantId ? { ...v, stock: newStock } : v
              );
              const totalStock = updatedVariants.reduce((sum, v) => sum + v.stock, 0);
              return { ...p, variants: updatedVariants, stock: totalStock };
            }
            return { ...p, stock: newStock };
          })
        }))
    }),
    {
      name: 'datanexstore-storage',
      partialize: (state) => ({
        cart: state.cart,
        appliedCoupon: state.appliedCoupon,
        wishlist: state.wishlist,
        compareList: state.compareList,
        recentlyViewed: state.recentlyViewed,
        currentUser: state.currentUser,
        orders: state.orders
      })
    }
  )
);
