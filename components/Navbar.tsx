'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, Phone, Heart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/CartContext';
import { getWhatsAppChatUrl } from '@/utils/whatsapp';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/shop-by-videos', label: 'Recipes' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/developers', label: 'Developer' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="section-container">
        <motion.nav
          animate={{ height: isScrolled ? 56 : 64 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#171717]/80 px-3 shadow-nav backdrop-blur-xl sm:rounded-full sm:px-4 ${
            isScrolled ? 'shadow-lg' : ''
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7B3F21] to-[#9A5A3A] text-sm font-bold text-white shadow-glow">
              S
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold tracking-wide text-white leading-tight">
                SMP Food Products
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-smp-muted">
                Grown by Nature
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[13px] font-medium text-smp-secondary transition hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Search products"
            >
              <Search size={18} />
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-white/[0.08] hover:text-white"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </button>
            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-white/[0.08] hover:text-white"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#2E7D32] px-1 text-[10px] font-bold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
            <a
              href={getWhatsAppChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green !min-h-10 !px-4 !py-2.5 !rounded-full !text-sm"
            >
              <Phone size={14} /> Order Now
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#2E7D32] px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-white/[0.08]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-white/[0.06] bg-[#171717] px-6 py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#7B3F21] to-[#9A5A3A] text-sm font-bold text-white">
                    S
                  </div>
                  <span className="text-sm font-semibold text-white">
                    SMP Food Products
                  </span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center rounded-xl px-4 py-3 text-[15px] font-medium text-smp-secondary transition hover:bg-white/[0.06] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                <Link
                  href="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full !justify-start"
                >
                  <ShoppingBag size={16} /> View Cart{' '}
                  {itemCount > 0 && `(${itemCount})`}
                </Link>
                <a
                  href={getWhatsAppChatUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green w-full"
                >
                  <Phone size={16} /> Order on WhatsApp
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
