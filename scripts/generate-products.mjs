import fs from 'fs';
import path from 'path';

const csvPath = 'C:\\Users\\Annamalai\\Downloads\\smp_food_products_english (2).csv';
const outputPath = 'C:\\Users\\Annamalai\\Desktop\\PROJECT FOLDER\\SMP-FOOD-PRODUCTS\\data\\products.ts';

const csv = fs.readFileSync(csvPath, 'utf8');
const lines = csv.split('\n').filter((line) => line.trim());

const products = [];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateId(index) {
  return `p${String(index).padStart(3, '0')}`;
}

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = line.split(',');
  const name = (cols[0] || '').trim();
  if (!name) continue;

  const price100g = cols[1] ? Number(cols[1].trim()) : null;
  const price250g = cols[2] ? Number(cols[2].trim()) : null;
  const price500g = cols[3] ? Number(cols[3].trim()) : null;
  const itemCode = (cols[4] || '').trim();
  const basePrice = cols[5] ? Number(cols[5].trim()) : 0;
  const unit = (cols[6] || '').trim();

  const slug = slugify(name);
  const id = generateId(i);
  const sku = itemCode || slug.replace(/-/g, '_').toUpperCase();

  const variants = [];
  if (price100g && price100g > 0) {
    variants.push({
      id: `${id}-100g`,
      name: 'Standard Pack',
      weight: '100g',
      packSize: 1,
      price: price100g,
      salePrice: price100g,
      stock: 100,
      sku: `${sku}-100G`,
    });
  }
  if (price250g && price250g > 0) {
    variants.push({
      id: `${id}-250g`,
      name: 'Standard Pack',
      weight: '250g',
      packSize: 1,
      price: price250g,
      salePrice: price250g,
      stock: 100,
      sku: `${sku}-250G`,
    });
  }
  if (price500g && price500g > 0) {
    variants.push({
      id: `${id}-500g`,
      name: 'Standard Pack',
      weight: '500g',
      packSize: 1,
      price: price500g,
      salePrice: price500g,
      stock: 100,
      sku: `${sku}-500G`,
    });
  }

  if (variants.length === 0 && basePrice > 0) {
    variants.push({
      id: `${id}-1`,
      name: 'Standard Pack',
      weight: unit || '1 pc',
      packSize: 1,
      price: basePrice,
      salePrice: basePrice,
      stock: 100,
      sku: sku,
    });
  }

  products.push({
    id,
    name,
    slug,
    shortDescription: `${name} - premium quality product from SMP Food Products.`,
    fullDescription: `${name} is a high-quality product from SMP Food Products, sourced and processed with care to ensure the best taste and nutrition.`,
    category: 'All Products',
    categorySlug: 'all',
    basePrice: variants[0]?.price || basePrice || 0,
    salePrice: variants[0]?.salePrice || basePrice || 0,
    discount: 0,
    sku,
    stock: 100,
    featured: false,
    bestseller: false,
    newArrival: false,
    rating: 4.5,
    reviewCount: 0,
    images: ['/images/product-placeholder.svg'],
    videoUrl: '',
    variants,
    ingredients: '',
    benefits: ['Premium quality', 'Natural ingredients', 'Fresh and pure'],
    preparationMethod: 'Consume as per requirement.',
    nutritionData: [],
    ageGroup: 'All ages',
    shelfLife: '12 months',
    storageInstructions: 'Store in a cool, dry place.',
    allergyInfo: '',
    weight: variants[0]?.weight || unit || '1 pc',
    manufacturerDetails: 'SMP Food Products, Tamil Nadu, India',
    fssaiNumber: '',
    countryOfOrigin: 'India',
  });
}

const categoriesArray = [
  {
    id: 'c1',
    name: 'All Products',
    slug: 'all',
    description: 'Complete range of SMP Food Products.',
    image: '/images/category-placeholder.svg',
    productCount: products.length,
  },
];

const reviews = [];

function formatPrice(price) {
  return `₹${Number(price).toLocaleString('en-IN')}`;
}

function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

function getProductsByCategory(categorySlug) {
  if (categorySlug === 'best-sellers') return products.filter((p) => p.bestseller);
  if (categorySlug === 'new-arrivals') return products.filter((p) => p.newArrival);
  return products.filter((p) => p.categorySlug === categorySlug);
}

function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

function getBestSellers() {
  return products.filter((p) => p.bestseller);
}

function getNewArrivals() {
  return products.filter((p) => p.newArrival);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q)
  );
}

const content = `import { Product, Review, Category } from '@/types';

// ========================
// SMP Food Products — Complete Product Catalogue
// ========================

export const products: Product[] = ${JSON.stringify(products, null, 2)};

// ========================
// Categories
// ========================
export const categories: Category[] = ${JSON.stringify(categoriesArray, null, 2)};

// ========================
// Customer Reviews
// ========================
export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)};

// ========================
// Helper Functions
// ========================
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'best-sellers') return products.filter(p => p.bestseller);
  if (categorySlug === 'new-arrivals') return products.filter(p => p.newArrival);
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.newArrival);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.ingredients.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return \`₹\${price.toLocaleString('en-IN')}\`;
}
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated ${products.length} products`);
console.log(`Output: ${outputPath}`);
