'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, ShieldCheck, Heart, Leaf,
  Baby, Users, Wheat, Droplets, Zap, Brain, Bone, HeartPulse, Apple,
  ChefHat, Clock, Quote, PlayCircle, CheckCircle2, Sparkles, TrendingUp,
  Award, Package,
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { getBestSellers, getFeaturedProducts, reviews } from '@/data/products';
import { getWhatsAppChatUrl } from '@/utils/whatsapp';

const stats = [
  { value: '15+', label: 'Healthy Products' },
  { value: '20K+', label: 'Happy Families' },
  { value: '4.9\u2605', label: 'Customer Rating' },
];

const trustBadges = [
  { icon: Leaf, label: 'Natural' },
  { icon: Baby, label: 'Kid Friendly' },
  { icon: Heart, label: 'Family Trusted' },
  { icon: Zap, label: 'Rich Nutrition' },
];

const nutritionCategories = [
  { icon: Baby, name: 'Baby Nutrition', color: '#D79B3A' },
  { icon: Users, name: 'Kids Growth', color: '#7B3F21' },
  { icon: Heart, name: "Women's Health", color: '#C0625F' },
  { icon: Wheat, name: 'Health Mixes', color: '#2E7D32' },
  { icon: Droplets, name: 'Millet Nutrition', color: '#6B7F3A' },
  { icon: Apple, name: 'Daily Wellness', color: '#D79B3A' },
  { icon: Zap, name: 'Protein Blends', color: '#7B3F21' },
  { icon: ShieldCheck, name: 'Immunity Boosters', color: '#2E7D32' },
];

const whyChooseUs = [
  { icon: ChefHat, title: 'Traditional Recipes', desc: 'Time-tested recipes passed down through generations' },
  { icon: Leaf, title: '100% Natural', desc: 'No artificial preservatives or additives' },
  { icon: ShieldCheck, title: 'Family Trusted', desc: 'Loved by over 20,000+ families across India' },
  { icon: Zap, title: 'Rich Nutrition', desc: 'Packed with essential vitamins and minerals' },
  { icon: Award, title: 'Premium Quality', desc: 'Carefully sourced and processed ingredients' },
  { icon: Package, title: 'Fast Delivery', desc: 'Secure packaging and prompt doorstep delivery' },
];

const healthBenefits = [
  { icon: TrendingUp, title: 'Kids Growth', desc: 'Supports healthy growth and development with calcium-rich ingredients.', gradient: 'from-[#D79B3A]/20 to-[#7B3F21]/10' },
  { icon: Bone, title: 'Bone Strength', desc: 'Ragi and millet-based formulas for stronger bones and teeth.', gradient: 'from-[#7B3F21]/20 to-[#D79B3A]/10' },
  { icon: Brain, title: 'Brain Development', desc: 'Dry fruit blends rich in omega fatty acids for cognitive growth.', gradient: 'from-[#2E7D32]/20 to-[#D79B3A]/10' },
  { icon: Zap, title: 'Daily Energy', desc: 'Natural energy from traditional grains for an active lifestyle.', gradient: 'from-[#D79B3A]/20 to-[#2E7D32]/10' },
  { icon: ShieldCheck, title: 'Immunity', desc: "Herbal and millet blends that strengthen the body's defenses.", gradient: 'from-[#7B3F21]/20 to-[#2E7D32]/10' },
  { icon: HeartPulse, title: "Women's Wellness", desc: "Iron and calcium-rich mixes designed for women's health needs.", gradient: 'from-[#C0625F]/20 to-[#D79B3A]/10' },
];

const recipes = [
  { title: 'Banana Malt Shake', time: '5 min', score: 95, gradient: 'from-[#D79B3A]/30 to-[#7B3F21]/20' },
  { title: 'Kids Breakfast Porridge', time: '10 min', score: 92, gradient: 'from-[#7B3F21]/30 to-[#D79B3A]/20' },
  { title: 'Traditional Ragi Malt', time: '8 min', score: 98, gradient: 'from-[#2E7D32]/30 to-[#D79B3A]/20' },
  { title: 'Millet Energy Drink', time: '5 min', score: 90, gradient: 'from-[#D79B3A]/30 to-[#2E7D32]/20' },
  { title: 'Family Health Porridge', time: '12 min', score: 96, gradient: 'from-[#7B3F21]/30 to-[#2E7D32]/20' },
  { title: 'Dry Fruit Smoothie', time: '5 min', score: 94, gradient: 'from-[#D79B3A]/30 to-[#C0625F]/20' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
};

export default function HomePage() {
  const bestSellers = getBestSellers().slice(0, 6);
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0E0E0F] pb-16 pt-[4.5rem]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#7B3F21]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-[#D79B3A]/8 blur-[100px]" />

        <div className="mx-auto w-full max-w-[1200px] relative z-10 grid items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-xl">
            <p className="section-label mb-4">TRADITIONAL NUTRITION</p>
            <h1 className="hero-title">
              Traditional Nutrition for{' '}
              <span className="bg-gradient-to-r from-[#D79B3A] to-[#7B3F21] bg-clip-text text-transparent">
                Every Generation
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-smp-secondary sm:text-lg">
              Premium banana malt, millet blends, health mixes, and traditional
              nutrition products made with natural ingredients for healthier families.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-smp-secondary">
                  <badge.icon size={13} className="text-[#D79B3A]" />
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-primary !px-7 !py-3 !text-sm">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link href="/shop-by-videos" className="btn-secondary !px-7 !py-3 !text-sm">
                <PlayCircle size={18} /> Watch Story
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg font-bold text-white sm:text-xl">{stat.value}</p>
                  <p className="text-[11px] text-smp-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative mx-auto w-full max-w-sm lg:ml-auto">
            <div className="relative aspect-square w-full rounded-full border border-white/[0.06] bg-gradient-to-br from-[#1E1E20] to-[#171717] p-6 shadow-glow">
              <div className="h-full w-full rounded-full bg-[#0E0E0F] overflow-hidden flex items-center justify-center">
                <img src="/images/smp-logo.png" alt="SMP Food Products logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute inset-0 rounded-full border border-[#7B3F21]/20 animate-glow-pulse" />
            </div>

            {[
              { name: 'Banana Malt', pos: 'top-2 -right-2 sm:-right-6', delay: 0.6 },
              { name: 'ABCD Malt', pos: 'bottom-16 -left-4 sm:-left-8', delay: 0.8 },
              { name: 'Health Mix', pos: '-bottom-2 right-4 sm:right-0', delay: 1.0 },
            ].map((item) => (
              <motion.div key={item.name} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: item.delay }}
                className={`absolute ${item.pos} rounded-xl border border-white/[0.06] bg-[#171717]/90 px-3 py-2 shadow-card backdrop-blur-sm`}>
                <p className="text-xs font-semibold text-white">{item.name}</p>
                <div className="mt-0.5 flex text-[#D79B3A]">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={10} className="fill-current" />)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ NUTRITION CATEGORIES ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-12">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="text-center">
            <p className="section-label justify-center">Nutrition Categories</p>
            <h2 className="section-title mt-2">Explore by Category</h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nutritionCategories.map((cat, i) => (
              <motion.div key={cat.name} {...fadeUp} transition={{ delay: i * 0.06 }} className="min-w-0">
                <Link href={`/products?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-5 transition-all hover:border-white/[0.12] hover:bg-[#262628]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ background: `${cat.color}18` }}>
                    <cat.icon size={22} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-xs font-semibold text-white text-center sm:text-sm">{cat.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED PRODUCTS ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Featured Products</p>
              <h2 className="section-title mt-2">Curated for You</h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-sm font-semibold text-[#D79B3A] hover:text-[#7B3F21] transition-colors shrink-0">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 overflow-hidden">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product, index) => (
                <motion.div key={product.id} {...fadeUp} transition={{ delay: index * 0.08 }} className="min-w-0">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PROMO BANNER ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#1E1E20] to-[#262628] px-6 py-10 sm:px-12 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(215,155,58,0.08),transparent_70%)]" />
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D79B3A]">Special Offer</p>
              <h2 className="section-title mt-3">Get 15% Off Your First Combo!</h2>
              <p className="mt-3 text-sm text-smp-secondary">
                Use code WELCOME15 at checkout.
              </p>
              <div className="mt-6">
                <a href={getWhatsAppChatUrl()} target="_blank" rel="noopener noreferrer" className="btn-green !py-3 !text-sm">
                  Order Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="relative z-10 flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-[#D79B3A]/30">
              <div className="text-center">
                <span className="block text-3xl font-bold text-white">15%</span>
                <span className="block text-xs font-semibold uppercase tracking-widest text-[#D79B3A]">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BEST SELLERS ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="section-label">Best Sellers</p>
              <h2 className="section-title mt-2">Most Loved Products</h2>
            </div>
            <Link href="/products?category=best-sellers" className="group flex items-center gap-2 text-sm font-semibold text-[#D79B3A] hover:text-[#7B3F21] transition-colors shrink-0">
              View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 overflow-hidden">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bestSellers.map((product, index) => (
                <motion.div key={product.id} {...fadeUp} transition={{ delay: index * 0.08 }} className="min-w-0">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ WHY CHOOSE SMP ═══════ */}
      <section className="mt-14 border-y border-white/[0.06] bg-[#171717]">
        <div className="px-5 sm:px-8 lg:px-12 py-14">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="text-center">
              <p className="section-label justify-center">Why Choose SMP</p>
              <h2 className="section-title mt-2">Trusted by Thousands</h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item, i) => (
                <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-5 transition-all hover:border-[#7B3F21]/30 hover:bg-[#262628]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B3F21]/15 text-[#D79B3A] transition-transform group-hover:scale-110">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-5 text-smp-secondary">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HEALTH BENEFITS ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="text-center">
            <p className="section-label justify-center">Health Benefits</p>
            <h2 className="section-title mt-2">Nourish Every Aspect</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {healthBenefits.map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * 0.06 }}
                className="group rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-6 transition-all hover:border-white/[0.12] hover:bg-[#262628]">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient}`}>
                  <item.icon size={22} className="text-[#D79B3A]" />
                </div>
                <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-5 text-smp-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RECIPES ═══════ */}
      <section className="mt-14 border-y border-white/[0.06] bg-[#171717]">
        <div className="px-5 sm:px-8 lg:px-12 py-14">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">Recipes & Ideas</p>
                <h2 className="section-title mt-2">Healthy Ways to Enjoy</h2>
              </div>
              <Link href="/shop-by-videos" className="group flex items-center gap-2 text-sm font-semibold text-[#D79B3A] hover:text-[#7B3F21] transition-colors shrink-0">
                View All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, i) => (
                <motion.div key={recipe.title} {...fadeUp} transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-5 transition-all hover:border-white/[0.12] hover:bg-[#262628]">
                  <div className={`flex h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br ${recipe.gradient}`}>
                    <ChefHat size={32} className="text-white/30 group-hover:text-[#D79B3A]/50 transition-colors" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">{recipe.title}</h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-smp-secondary">
                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><Sparkles size={12} className="text-[#D79B3A]" /> {recipe.score}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CUSTOMER REVIEWS ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="text-center">
            <p className="section-label justify-center">Customer Reviews</p>
            <h2 className="section-title mt-2">Loved By Thousands</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div key={review.id} {...fadeUp} transition={{ delay: i * 0.06 }}
                className="relative rounded-2xl border border-white/[0.06] bg-[#1E1E20] p-6">
                <Quote className="absolute right-5 top-5 text-white/5" size={36} />
                <div className="flex text-[#D79B3A] mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="text-smp-secondary leading-relaxed text-sm">&ldquo;{review.comment}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7B3F21]/20 text-xs font-bold text-[#D79B3A]">
                    {review.customerName[0]}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{review.customerName}</h4>
                    <p className="text-[11px] text-smp-muted truncate">{review.location}</p>
                  </div>
                  {review.verified && <CheckCircle2 size={14} className="ml-auto shrink-0 text-[#2E7D32]" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="px-5 sm:px-8 lg:px-12 mt-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#7B3F21] to-[#4A2512] px-6 py-12 text-center sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(215,155,58,0.15),transparent_70%)]" />
            <div className="relative z-10">
              <Package size={40} className="mx-auto text-[#D79B3A]" />
              <h2 className="section-title mt-5">Ready to Experience Premium Nutrition?</h2>
              <p className="mt-3 text-sm text-white/70 max-w-lg mx-auto">
                Join thousands of families who trust SMP Food Products for their daily nutrition.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="btn-primary !bg-white !text-[#7B3F21] !px-7 !py-3 !text-sm">
                  Shop Now <ArrowRight size={16} />
                </Link>
                <a href={getWhatsAppChatUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-white/20 !px-7 !py-3 !text-sm">
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
