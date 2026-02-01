// User Role Types
export type UserRole = 'admin' | 'vendor' | 'customer' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  emailVerified: boolean;
}

// Vendor Types
export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  storeNameEn?: string;
  storeSlug: string;
  storeDescription?: string;
  storeDescriptionEn?: string;
  storeLogo?: string;
  storeBanner?: string;
  address: Address;
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  rating: number;
  reviewCount: number;
  totalSales: number;
  productsCount: number;
  status: 'pending' | 'approved' | 'suspended' | 'rejected';
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Product {
  id: string;
  vendorId: string;
  name: string;
  nameEn?: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  shortDescription?: string;
  shortDescriptionEn?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku: string;
  barcode?: string;
  inventory: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorders: boolean;
  status: 'draft' | 'active' | 'archived';
  categoryId: string;
  tags: string[];
  images: ProductImage[];
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];
  rating: number;
  reviewCount: number;
  salesCount: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  options: {
    name: string;
    value: string;
  }[];
  image?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  nameEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'authorized' 
  | 'paid' 
  | 'partially_refunded' 
  | 'refunded' 
  | 'failed';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  vendorId: string;
  name: string;
  sku: string;
  image?: string;
  quantity: number;
  price: number;
  total: number;
  vendorCommission: number;
}

// Address Type
export interface Address {
  id?: string;
  label?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
  maxQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  itemCount: number;
}

// Payment Types
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: 'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'cash_on_delivery' | 'bank_transfer';
  transactionId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  titleEn?: string;
  comment: string;
  commentEn?: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
}

// Notification Types
export type NotificationType = 'order' | 'product' | 'vendor' | 'system' | 'promotion';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

// Analytics Types
export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  conversionRate: number;
  period: 'day' | 'week' | 'month' | 'year';
  dateRange: {
    start: Date;
    end: Date;
  };
  chartData: {
    labels: string[];
    revenue: number[];
    orders: number[];
  };
}

export interface VendorAnalytics {
  vendorId: string;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageRating: number;
  commissionPaid: number;
  commissionPending: number;
  topProducts: {
    productId: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter Types
export interface ProductFilter {
  category?: string;
  vendor?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating';
  search?: string;
  tags?: string[];
}

export interface OrderFilter {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  vendorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

// Settings Types
export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  shippingSettings: {
    freeShippingThreshold?: number;
    defaultShippingRate: number;
    enableInternationalShipping: boolean;
  };
  commissionSettings: {
    defaultCommissionRate: number;
    minimumPayoutAmount: number;
    payoutSchedule: 'weekly' | 'biweekly' | 'monthly';
  };
  paymentGateways: {
    stripe: {
      enabled: boolean;
      testMode: boolean;
    };
    paypal: {
      enabled: boolean;
      testMode: boolean;
    };
    cashOnDelivery: {
      enabled: boolean;
    };
  };
}
