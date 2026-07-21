'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Phone,
  Plus,
  Minus,
  Heart,
  CheckCircle2,
} from 'lucide-react';
import {
  getProductBySlug,
  getProductsByCategory,
  formatPrice,
} from '@/data/products';
import { useCart } from '@/store/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsapp';
import { ProductCard } from '@/components/ProductCard';
import type { Product, ProductVariant } from '@/types';

export default function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'details' | 'ingredients' | 'nutrition' | 'preparation'
  >('details');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setQuantity(1);
      const related = getProductsByCategory(product.categorySlug)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);

  if (!product) return notFound();

  const price = selectedVariant ? selectedVariant.salePrice : product.salePrice;
  const originalPrice = selectedVariant
    ? selectedVariant.price
    : product.basePrice;

  const handleAddToCart = () => {
    addItem(product, selectedVariant || null, quantity);
  };

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[5.5rem]">
      <div className="border-b border-white/[0.06] bg-[#171717] py-4">
        <div className="section-container flex text-sm text-[#7A7A7A]">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <span className="mx-2 text-white/20">/</span>
          <a href="/products" className="hover:text-white transition">
            Products
          </a>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-white font-medium">{product.name}</span>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-8">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
              {product.discount > 0 && (
                <div className="absolute left-6 top-6 badge bg-[#7B3F21] text-white text-sm px-4 py-1.5">
                  -{product.discount}% OFF
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className="h-24 w-24 overflow-hidden rounded-xl border-2 border-white/[0.06] bg-[#1E1E20] p-2"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="text-[#D79B3A] font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-white/20">|</span>
              <div className="flex items-center text-[#D79B3A]">
                <Star size={14} className="fill-current" />
                <span className="ml-1 font-bold text-white">
                  {product.rating}
                </span>
                <span className="ml-1 text-[#7A7A7A]">
                  ({product.reviewCount} Reviews)
                </span>
              </div>
            </div>

            <h1 className="section-title">{product.name}</h1>

            <div className="mt-6 flex items-end gap-3 border-b border-white/[0.06] pb-6">
              <span className="text-4xl font-bold text-white">
                {formatPrice(price)}
              </span>
              {originalPrice > price && (
                <span className="mb-1 text-xl text-[#7A7A7A] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="mb-2 text-sm text-[#7A7A7A]">
                inclusive of all taxes
              </span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-[#B8B8B8]">
              {product.shortDescription}
            </p>

            {product.variants.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-white">
                  Select Pack Size:
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`rounded-xl border-2 px-5 py-3 text-sm font-semibold transition ${
                        selectedVariant?.id === variant.id
                          ? 'border-[#7B3F21] bg-[#7B3F21]/10 text-[#D79B3A]'
                          : 'border-white/[0.06] bg-[#1E1E20] text-[#B8B8B8] hover:border-white/[0.12]'
                      }`}
                    >
                      {variant.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <div className="flex h-14 items-center justify-between rounded-xl border border-white/[0.06] bg-[#1E1E20] p-2 sm:w-36">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-[#B8B8B8] transition hover:bg-white/[0.08]"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] text-[#B8B8B8] transition hover:bg-white/[0.08]"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary h-14 flex-1 !text-base"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>

            <a
              href={generateSingleProductWhatsAppUrl(
                product.name,
                selectedVariant?.weight || product.weight,
                price,
                quantity
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green mt-4 h-14 w-full !text-base"
            >
              <Phone size={20} />
              Buy Instantly via WhatsApp
            </a>

            <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#D79B3A]" size={24} />
                <span className="text-sm font-semibold text-white">
                  100% Natural
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-[#2E7D32]" size={24} />
                <span className="text-sm font-semibold text-white">
                  No Preservatives
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="text-[#D79B3A]" size={24} />
                <span className="text-sm font-semibold text-white">
                  Pan India Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="flex gap-8 border-b border-white/[0.06] overflow-x-auto">
            {(
              ['details', 'ingredients', 'nutrition', 'preparation'] as const
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-bold capitalize transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-[#7B3F21] text-[#D79B3A]'
                    : 'text-[#7A7A7A] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl py-4">
            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <p className="text-lg leading-relaxed text-[#B8B8B8]">
                  {product.fullDescription}
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-bold text-white">Key Benefits</h4>
                    <ul className="mt-3 space-y-2">
                      {product.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[#B8B8B8]"
                        >
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 text-[#2E7D32] shrink-0"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Product Info</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#B8B8B8]">
                      <li>
                        <span className="font-semibold text-white">
                          Age Group:
                        </span>{' '}
                        {product.ageGroup}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Shelf Life:
                        </span>{' '}
                        {product.shelfLife}
                      </li>
                      <li>
                        <span className="font-semibold text-white">
                          Storage:
                        </span>{' '}
                        {product.storageInstructions}
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  What goes into this?
                </h4>
                <p className="text-lg text-[#B8B8B8] leading-relaxed p-6 bg-[#1E1E20] rounded-2xl border border-white/[0.06]">
                  {product.ingredients}
                </p>
                {product.allergyInfo && (
                  <div className="mt-6 p-4 bg-[#D79B3A]/10 border border-[#D79B3A]/20 rounded-xl text-[#D79B3A] text-sm">
                    <span className="font-bold">Allergy Warning:{' '}</span>
                    {product.allergyInfo}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h4 className="text-xl font-bold text-white mb-4">
                  Nutritional Facts
                </h4>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1E1E20]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#262628]">
                      <tr>
                        <th className="px-6 py-4 font-bold text-white">
                          Nutrient
                        </th>
                        <th className="px-6 py-4 font-bold text-white">
                          Value
                        </th>
                        <th className="px-6 py-4 font-bold text-white">
                          Unit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {product.nutritionData.map((data, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-medium text-white">
                            {data.nutrient}
                          </td>
                          <td className="px-6 py-4 text-[#B8B8B8]">
                            {data.value}
                          </td>
                          <td className="px-6 py-4 text-[#7A7A7A]">
                            {data.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'preparation' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h4 className="text-xl font-bold text-white mb-6">
                  How to prepare
                </h4>
                <div className="space-y-4">
                  {product.preparationMethod.split('\n').map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 bg-[#1E1E20] rounded-xl border border-white/[0.06]"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7B3F21] text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <p className="mt-1 text-[#B8B8B8]">
                        {step.replace(/^\d+\.\s*/, '')}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="section-title">You May Also Like</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
