'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { id: '1', src: '/images/product-placeholder.svg', category: 'Products', caption: 'SMP Banana Malt' },
  { id: '2', src: '/images/category-placeholder.svg', category: 'Customers', caption: 'Happy Families' },
  { id: '3', src: '/images/product-placeholder.svg', category: 'Products', caption: 'Traditional Health Mix' },
  { id: '4', src: '/images/category-placeholder.svg', category: 'Ingredients', caption: 'Natural Millets' },
  { id: '5', src: '/images/product-placeholder.svg', category: 'Products', caption: 'ABCD Premium Malt' },
  { id: '6', src: '/images/category-placeholder.svg', category: 'Customers', caption: 'Kids love it!' },
];

const categories = ['All', 'Products', 'Ingredients', 'Customers'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0E0E0F] pt-[4.5rem]">
      {/* Header */}
      <div className="bg-[#171717] py-16 lg:py-20 text-center border-b border-white/[0.06]">
        <div className="section-container">
          <h1 className="heading-serif text-4xl text-white sm:text-5xl">Our Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#7A7A7A]">
            A visual journey of our products, our ingredients, and the happy families who trust SMP Food Products.
          </p>
        </div>
      </div>

      <div className="section-container py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                activeCategory === cat
                  ? 'bg-[#D79B3A] text-[#0E0E0F]'
                  : 'bg-[#1E1E20] text-[#B8B8B8] hover:bg-[#262628] hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-[#1E1E20] border border-white/[0.06] break-inside-avoid"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] bg-[#262628] p-6 flex items-center justify-center">
                  <img src={image.src} alt={image.caption} className="w-full h-full object-contain opacity-80 transition-transform duration-700 group-hover:scale-110" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-100 transition-opacity duration-300 sm:p-6 md:opacity-0 md:group-hover:opacity-100">
                  <p className="text-base font-bold text-white transition-transform duration-300 md:translate-y-4 md:group-hover:translate-y-0 sm:text-lg">{image.caption}</p>
                  <p className="text-xs uppercase tracking-wider text-white/80 transition-transform delay-75 duration-300 md:translate-y-4 md:group-hover:translate-y-0 sm:text-sm">{image.category}</p>
                </div>
                
                <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-100 backdrop-blur-md transition-opacity md:right-4 md:top-4 md:opacity-0 md:group-hover:opacity-100">
                  <ZoomIn size={18} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-10 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.src} alt={selectedImage.caption} className="max-w-full max-h-[75vh] object-contain rounded-xl" />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedImage.caption}</h3>
                <p className="text-sm text-white/60 uppercase tracking-widest mt-2">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
