'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products, categories, searchProducts } from '@/data/products';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  let displayedProducts = searchQuery ? searchProducts(searchQuery) : products;

  if (activeCategory !== 'all' && !searchQuery) {
    if (activeCategory === 'best-sellers') {
      displayedProducts = displayedProducts.filter(p => p.bestseller);
    } else if (activeCategory === 'new-arrivals') {
      displayedProducts = displayedProducts.filter(p => p.newArrival);
    } else {
      displayedProducts = displayedProducts.filter(p => p.categorySlug === activeCategory);
    }
  }

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      <div className="bg-[#171717] border-b border-white/[0.06] py-12 lg:py-16">
        <div className="section-container text-center">
          <h1 className="hero-title text-4xl sm:text-5xl">Our Products</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#B8B8B8]">
            Explore our complete range of natural, traditional nutrition products crafted carefully for your family&apos;s daily wellness.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7A7A]" size={18} />
            <input
              type="text"
              placeholder="Search products, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/[0.06] bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white placeholder:text-[#7A7A7A] transition focus:border-[#D79B3A] focus:outline-none focus:ring-1 focus:ring-[#D79B3A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] sm:w-auto lg:hidden"
          >
            <Filter size={16} />
            Categories
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px,1fr] xl:grid-cols-[280px,1fr]">
          <aside className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="sticky top-28 rounded-3xl bg-[#1E1E20] p-6 border border-white/[0.06]">
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => { setActiveCategory('all'); setIsFilterOpen(false); }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                      activeCategory === 'all' && !searchQuery
                        ? 'bg-[#7B3F21] text-white font-semibold shadow-md'
                        : 'text-[#B8B8B8] hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    All Products
                    <span className={`text-xs ${activeCategory === 'all' && !searchQuery ? 'text-white/80' : 'text-[#7A7A7A]'}`}>
                      {products.length}
                    </span>
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => { setActiveCategory(cat.slug); setSearchQuery(''); setIsFilterOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                        activeCategory === cat.slug && !searchQuery
                          ? 'bg-[#7B3F21] text-white font-semibold shadow-md'
                          : 'text-[#B8B8B8] hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {cat.name}
                      <span className={`text-xs ${activeCategory === cat.slug && !searchQuery ? 'text-white/80' : 'text-[#7A7A7A]'}`}>
                        {cat.productCount}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div>
            {displayedProducts.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence>
                  {displayedProducts.map(product => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.06] bg-[#1E1E20] py-20 text-center">
                <Search size={40} className="text-[#7A7A7A]" />
                <h3 className="mt-4 text-lg font-bold text-white">No products found</h3>
                <p className="mt-2 text-sm text-[#7A7A7A]">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="btn-secondary mt-6"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
