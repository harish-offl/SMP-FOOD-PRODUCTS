'use client';

import Link from 'next/link';
import { ShoppingBag, Phone, Star, Eye, Package } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant ? defaultVariant.salePrice : product.salePrice;
  const originalPrice = defaultVariant
    ? defaultVariant.price
    : product.basePrice;
  const weight = defaultVariant ? defaultVariant.weight : product.weight;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, defaultVariant || null, 1);
  };

  const initials = product.name
    .replace('SMP ', '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="product-card group flex min-h-[420px] min-w-0 flex-col overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#1E1E20] to-[#262628]"
      >
        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="badge bg-[#7B3F21] text-white">
              -{product.discount}%
            </span>
          )}
          {product.bestseller && (
            <span className="badge bg-[#D79B3A] text-black">Best Seller</span>
          )}
          {product.newArrival && (
            <span className="badge bg-[#2E7D32] text-white">New</span>
          )}
        </div>

        {/* Quick View */}
        <div className="absolute right-3 top-3 z-20 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-white/[0.06] bg-[#171717]/80 text-smp-secondary opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Eye size={14} />
        </div>

        {/* Image / Fallback */}
        {product.images[0] && !imgError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#7B3F21]/10 to-[#D79B3A]/5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#7B3F21]/15">
              <Package size={36} className="text-[#D79B3A]/60" />
            </div>
            <span className="text-3xl font-bold text-[#D79B3A]/30">
              {initials}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center justify-between gap-1">
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-smp-muted">
            {product.category}
          </span>
          <div className="flex shrink-0 items-center gap-0.5 text-[#D79B3A]">
            <Star size={11} className="fill-current" />
            <span className="text-[11px] font-semibold text-white">
              {product.rating}
            </span>
          </div>
        </div>

        <Link href={`/products/${product.slug}`} className="block min-w-0">
          <h3 className="line-clamp-1 text-[15px] font-bold text-white transition-colors hover:text-[#D79B3A]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 min-h-[32px] text-xs leading-5 text-smp-secondary">
          {product.shortDescription}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-smp-secondary">
            {weight}
          </span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="text-lg font-bold text-white">
            {formatPrice(price)}
          </span>
          {originalPrice > price && (
            <span className="text-xs text-smp-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#7B3F21] text-xs font-semibold text-white transition hover:bg-[#9A5A3A]"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
          <a
            href={generateSingleProductWhatsAppUrl(
              product.name,
              weight,
              price
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-[#2E7D32] hover:text-white hover:border-[#2E7D32]"
            aria-label="Order on WhatsApp"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
