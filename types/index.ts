// ========================
// SMP Food Products — Type Definitions
// ========================

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  categorySlug: string;
  basePrice: number;
  salePrice: number;
  discount: number;
  sku: string;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  variants: ProductVariant[];
  ingredients: string;
  benefits: string[];
  preparationMethod: string;
  nutritionData: NutritionEntry[];
  ageGroup: string;
  shelfLife: string;
  storageInstructions: string;
  allergyInfo: string;
  weight: string;
  manufacturerDetails: string;
  fssaiNumber: string;
  countryOfOrigin: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  packSize: number;
  price: number;
  salePrice: number;
  stock: number;
  sku: string;
}

export interface NutritionEntry {
  nutrient: string;
  value: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant | null, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export interface Review {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  verified: boolean;
  date: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  houseNumber: string;
  street: string;
  landmark?: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string;
  paymentMethod: 'cod' | 'upi' | 'bank_transfer' | 'whatsapp';
}

export interface TeamMember {
  name: string;
  role: string;
  contribution: string;
  phone: string;
  email: string;
  creditEmail?: string;
  batch: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}
