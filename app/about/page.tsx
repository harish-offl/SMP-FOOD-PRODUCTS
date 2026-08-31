'use client';

import { motion } from 'framer-motion';
import { Heart, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#171717] py-14 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D79B3A]/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="section-container relative z-10 text-center max-w-4xl">
          <p className="section-label mb-4">Our Story</p>
          <h1 className="heading-serif text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Rooted in Tradition. <br/>Made for Healthier Families.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#B8B8B8] sm:mt-6 sm:text-lg">
            SMP Food Products was founded with a simple vision: to bring back the wholesome, traditional nutrition that our ancestors thrived on, making it convenient and accessible for modern households.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-container py-14 sm:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="aspect-[4/3] rounded-3xl bg-[#1E1E20] overflow-hidden relative border border-white/[0.06]">
              <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A" alt="SMP Family" className="w-full h-full object-cover opacity-80" />
            </div>
          </motion.div>
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#7B3F21]/20 flex items-center justify-center text-[#D79B3A]">
                  <Heart size={20} />
                </div>
                <h2 className="heading-serif text-3xl text-white">Our Mission</h2>
              </div>
              <p className="text-[#B8B8B8] leading-relaxed">
                To make trusted traditional nutrition easy, accessible, and enjoyable for every family. We believe that returning to our roots and embracing natural ingredients is the key to lasting wellness.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#2E7D32]/20 flex items-center justify-center text-[#2E7D32]">
                  <Leaf size={20} />
                </div>
                <h2 className="heading-serif text-3xl text-white">Our Vision</h2>
              </div>
              <p className="text-[#B8B8B8] leading-relaxed">
                To become a trusted household food brand known for quality, authenticity, and family wellness across India. We aim to replace artificial supplements with natural, grain-based nourishment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="border-y border-white/[0.06] bg-[#171717] py-14 sm:py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">How It's Made</p>
            <h2 className="heading-serif text-3xl sm:text-4xl text-white mt-4">The SMP Manufacturing Process</h2>
            <p className="mt-4 text-[#7A7A7A]">Every packet that leaves our facility goes through rigorous quality checks while preserving traditional preparation methods.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {[
              { title: '1. Sourcing', desc: 'Carefully selecting the finest grains, millets, and dry fruits directly from trusted farmers.' },
              { title: '2. Cleaning', desc: 'Thorough cleaning and washing processes to ensure absolute hygiene and purity.' },
              { title: '3. Processing', desc: 'Traditional roasting and sprouting methods to enhance natural nutritional values.' },
              { title: '4. Packaging', desc: 'Hygienic, automated packaging that seals in the freshness and extends shelf life.' }
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-3xl border border-white/[0.06] bg-[#1E1E20] p-6 text-center sm:p-8">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#D79B3A] text-[#0E0E0F] flex items-center justify-center text-xl font-bold mb-6">
                  {i + 1}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-[#B8B8B8] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-container py-14 sm:py-20 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#171717] p-5 sm:rounded-[3rem] sm:p-12 lg:p-20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D79B3A] via-transparent to-transparent"></div>
          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] text-center">
            <div className="p-4">
              <h4 className="text-4xl lg:text-5xl font-bold text-[#D79B3A] mb-2">15+</h4>
              <p className="text-[#B8B8B8] font-medium">Nutritious Products</p>
            </div>
            <div className="p-4">
              <h4 className="text-4xl lg:text-5xl font-bold text-[#D79B3A] mb-2">5k+</h4>
              <p className="text-[#B8B8B8] font-medium">Happy Families</p>
            </div>
            <div className="p-4">
              <h4 className="text-4xl lg:text-5xl font-bold text-[#D79B3A] mb-2">100%</h4>
              <p className="text-[#B8B8B8] font-medium">Natural Ingredients</p>
            </div>
            <div className="p-4">
              <h4 className="text-4xl lg:text-5xl font-bold text-[#D79B3A] mb-2">24h</h4>
              <p className="text-[#B8B8B8] font-medium">Dispatch Time</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
