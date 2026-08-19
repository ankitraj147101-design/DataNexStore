// TechVault Complete Types Definition

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role: 'ROLE_CUSTOMER' | 'ROLE_ADMIN' | 'ROLE_SUPER_ADMIN';
  token?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: 'HOME' | 'WORK' | 'OTHER';
  isDefault?: boolean;
}

export interface CategorySpecField {
  id: number;
  fieldName: string;
  fieldKey: string;
  fieldType: 'text' | 'number' | 'boolean' | 'select' | 'multiselect';
  unit?: string;
  options?: string[];
  isFilterable: boolean;
  isRequired?: boolean;
  sortOrder: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentId?: number | null;
  sortOrder: number;
  isActive: boolean;
  specFields?: CategorySpecField[];
  productCount?: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  isActive: boolean;
}

export interface ProductVariant {
  id: number;
  productId: number;
  variantName: string;
  sku: string;
  price: number;
  mrpPrice: number;
  attributes: Record<string, string>;
  imageUrl?: string;
  isDefault: boolean;
  stock: number;
}

export interface ProductSpecification {
  fieldKey: string;
  fieldName: string;
  fieldValue: string;
  groupName?: string;
}

export interface ProductImage {
  id: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
  likesCount?: number;
  images?: string[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  brand: Brand;
  category: Category;
  shortDescription: string;
  description: string;
  basePrice: number;
  mrpPrice: number;
  discountPercentage: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isDealOfTheDay?: boolean;
  isNewArrival?: boolean;
  isActive: boolean;
  warrantyInfo: string;
  returnPolicyDays?: number;
  ratingAverage: number;
  ratingCount: number;
  soldCount: number;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  stock: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item uuid or composite
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  savedForLater?: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  expiryDate: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUND_REQUESTED'
  | 'REFUNDED'
  | 'RETURNED';

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  variantName?: string;
  sku: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface PaymentDetails {
  id: string;
  paymentMethod: 'WHATSAPP_PAYMENT' | 'WHATSAPP_CONFIRMATION' | 'RAZORPAY' | 'COD' | 'UPI' | 'CARD';
  amount: number;
  currency: string;
  status: 'INITIATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingCharge: number;
  taxAmount: number;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  payment: PaymentDetails;
  courierName?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  whatsappConfirmed?: boolean;
  whatsappConfirmedAt?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  revenueHistory: { date: string; revenue: number; orders: number }[];
  categorySales: { category: string; value: number; count: number }[];
  topSellingProducts: { id: number; name: string; soldCount: number; revenue: number }[];
}

export interface CustomerRecord {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  pincode?: string;
  addressLine?: string;
  ordersCount: number;
  totalSpent: number;
  status: 'ACTIVE' | 'VIP' | 'NEW';
  joined: string;
}


