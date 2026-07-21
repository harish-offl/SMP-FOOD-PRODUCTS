'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/CartContext';
import { formatPrice } from '@/data/products';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getDeliveryCharge, getTotal } = useCart();

  const subtotal = getSubtotal();
  const deliveryCharge = getDeliveryCharge();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
        <div className="section-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1E1E20] text-[#7A7A7A]">
            <ShoppingBag size={48} />
          </div>
          <h1 className="heading-serif mt-8 text-3xl text-white">Your cart is empty</h1>
          <p className="mt-4 text-[#B8B8B8]">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link href="/products" className="btn-primary mt-8">
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      <div className="section-container py-12 lg:py-16">
        <h1 className="heading-serif text-4xl text-white">Shopping Cart</h1>
        <p className="mt-2 text-[#B8B8B8]">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr,400px]">
          {/* Cart Items */}
          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => {
                const price = item.variant ? item.variant.salePrice : item.product.salePrice;
                const weight = item.variant ? item.variant.weight : item.product.weight;
                const uniqueId = `${item.product.id}-${item.variant?.id || 'base'}`;

                return (
                  <motion.div
                    key={uniqueId}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="flex flex-col gap-4 rounded-2xl bg-[#1E1E20] border border-white/[0.06] p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                  >
                    {/* Product Image */}
                    <Link href={`/products/${item.product.slug}`} className="shrink-0 rounded-xl bg-[#262628] p-2">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/products/${item.product.slug}`} className="text-lg font-bold text-white hover:text-[#D79B3A]">
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-[#7A7A7A]">Variant: {weight}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">{formatPrice(price * item.quantity)}</p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-[#7A7A7A]">{formatPrice(price)} each</p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-lg border border-white/[0.06] bg-[#262628] p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                            className="flex h-8 w-8 items-center justify-center rounded bg-[#1E1E20] text-[#B8B8B8] transition hover:bg-[#262628] hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="flex w-10 items-center justify-center text-sm font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                            className="flex h-8 w-8 items-center justify-center rounded bg-[#1E1E20] text-[#B8B8B8] transition hover:bg-[#262628] hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id, item.variant?.id)}
                          className="flex items-center gap-1.5 text-sm font-medium text-red-500 transition hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-28 rounded-3xl bg-[#1E1E20] border border-white/[0.06] p-6 sm:p-8">
              <h2 className="heading-serif text-2xl text-white">Order Summary</h2>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between text-[#B8B8B8]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#B8B8B8]">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-white">
                    {deliveryCharge === 0 ? <span className="text-[#2E7D32]">FREE</span> : formatPrice(deliveryCharge)}
                  </span>
                </div>
                <div className="my-4 border-t border-white/[0.06]"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-[#D79B3A]">{formatPrice(total)}</span>
                </div>
              </div>

              {deliveryCharge > 0 && (
                <div className="mt-4 rounded-xl bg-[#D79B3A]/10 p-3 text-xs text-[#D79B3A]">
                  Add items worth {formatPrice(500 - subtotal)} more for FREE delivery.
                </div>
              )}

              <Link
                href="/checkout"
                className="btn-green mt-8 w-full !py-4 !text-base text-center inline-block shadow-md hover:shadow-lg"
              >
                Proceed to Checkout <ArrowRight size={18} className="inline ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
