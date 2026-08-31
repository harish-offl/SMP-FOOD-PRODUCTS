'use client';

import Link from 'next/link';
import { ShoppingBag, Star, ImageOff } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsapp';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const defaultVariant = product.variants?.[0];
  const price = defaultVariant ? defaultVariant.salePrice : product.salePrice;
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
    <div className="flex h-full flex-col rounded-3xl border border-white/[0.06] bg-[#1E1E20] transition-colors hover:border-white/10">
      <Link
        href={`/products/${product.slug}`}
        className="relative block h-48 w-full overflow-hidden sm:h-56"
      >
        {product.newArrival && (
          <span className="badge absolute left-3 top-3 z-10 rounded-full bg-[#2E7D32] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            New
          </span>
        )}

        {product.images[0] && !imgError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-full w-full rounded-t-3xl object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-t-3xl bg-[#1E1E20]">
            <ImageOff size={32} className="text-[#7A7A7A]" />
            <span className="text-xl font-bold text-[#7A7A7A]">
              {initials}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 rounded-b-3xl p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-semibold uppercase tracking-widest text-[#7A7A7A]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[#D79B3A]">
            <Star size={12} className="fill-current" />
            <span className="text-xs font-semibold text-white">
              {product.rating}
            </span>
          </div>
        </div>

        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-bold text-white hover:text-[#D79B3A] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#B8B8B8]">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#B8B8B8]">
              {weight}
            </span>
            <span className="text-lg font-bold text-white">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#7B3F21] px-4 text-xs font-semibold text-white transition hover:bg-[#9A5A3A]"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          <a
            href={generateSingleProductWhatsAppUrl(
              product.name,
              weight,
              price
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-[#B8B8B8] transition hover:bg-[#2E7D32] hover:text-white hover:border-[#2E7D32]"
            aria-label="Order on WhatsApp"
          >
            <WhatsAppIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
