'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const videos = [
  {
    id: 'v1',
    title: 'How to prepare SMP Banana Malt perfectly',
    duration: '01:45',
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    category: 'Preparation',
    productSlug: 'banana-malt',
    productName: 'SMP Banana Malt',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'v2',
    title: 'Health Mix - The Traditional South Indian Breakfast',
    duration: '02:15',
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    category: 'Recipe',
    productSlug: 'health-mix',
    productName: 'SMP Health Mix',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'v3',
    title: 'Why Kids Love Our ABCD Malt',
    duration: '00:59',
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    category: 'Testimonial',
    productSlug: 'abcd-malt',
    productName: 'SMP ABCD Malt',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'v4',
    title: 'Behind the Scenes: Roasting Millets',
    duration: '03:10',
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    category: 'Manufacturing',
    productSlug: 'millet-health-mix',
    productName: 'Millet Health Mix',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'v5',
    title: 'Daily Nutrition Combo Unboxing',
    duration: '01:20',
    thumbnail: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20300%22%20width%3D%22400%22%20height%3D%22300%22%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22300%22%20fill%3D%22%231E1E20%22%2F%3E%0A%20%20%3Crect%20x%3D%2240%22%20y%3D%2240%22%20width%3D%22320%22%20height%3D%22220%22%20rx%3D%2224%22%20fill%3D%22%232A2A2D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22200%22%20cy%3D%22120%22%20r%3D%2236%22%20fill%3D%22%237B3F21%22%20opacity%3D%220.35%22%2F%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22132%22%20text-anchor%3D%22middle%22%20fill%3D%22%23D79B3A%22%20font-size%3D%2228%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22700%22%3ESMP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22200%22%20y%3D%22165%22%20text-anchor%3D%22middle%22%20fill%3D%22%23B8B8B8%22%20font-size%3D%2214%22%20font-family%3D%22Arial%2Csans-serif%22%3EFood%20Products%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    category: 'Product Focus',
    productSlug: 'daily-nutrition-combo',
    productName: 'Daily Nutrition Combo',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const categories = ['All', 'Preparation', 'Recipe', 'Testimonial', 'Manufacturing', 'Product Focus'];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-[#171717] py-12 text-center sm:py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D79B3A] via-transparent to-transparent"></div>
        <div className="section-container relative z-10">
          <h1 className="heading-serif text-4xl text-white sm:text-5xl">Shop By Videos</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#7A7A7A]">
            Watch our preparation guides, recipes, and behind-the-scenes manufacturing to know exactly what goes into your family's food.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === cat
                  ? 'bg-[#D79B3A] text-[#0E0E0F]'
                  : 'bg-[#1E1E20] text-[#B8B8B8] hover:bg-[#262628] hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-3xl bg-[#1E1E20] border border-white/[0.06] flex flex-col"
              >
                {/* Thumbnail Area */}
                <div 
                  className="relative aspect-video cursor-pointer bg-[#262628] overflow-hidden"
                  onClick={() => setActiveVideo(video)}
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-[#D79B3A] uppercase tracking-wider mb-2">{video.category}</span>
                  <h3 className="font-bold text-white leading-snug line-clamp-2">{video.title}</h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.06]">
                    <span className="text-sm text-[#7A7A7A]">{video.productName}</span>
                    <Link href={`/products/${video.productSlug}`} className="flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32] hover:text-[#2E7D32] transition">
                      <ShoppingBag size={14} /> Shop
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-4"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
              onClick={() => setActiveVideo(null)}
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl bg-[#0E0E0F] rounded-2xl overflow-hidden shadow-2xl border border-white/[0.06]"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video w-full bg-black">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`${activeVideo.videoUrl}?autoplay=1`} 
                  title={activeVideo.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] bg-[#1E1E20] p-4 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
                  <p className="text-sm text-[#7A7A7A] mt-1">Featured: {activeVideo.productName}</p>
                </div>
                <Link href={`/products/${activeVideo.productSlug}`} className="btn-primary shrink-0" onClick={() => setActiveVideo(null)}>
                  <ShoppingBag size={18} /> Shop This Product
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
