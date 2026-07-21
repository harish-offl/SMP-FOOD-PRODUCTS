'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/shop-by-videos', label: 'Recipes' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const categories = [
  { href: '/products?category=kids-nutrition', label: 'Kids Nutrition' },
  { href: '/products?category=family-nutrition', label: 'Family Nutrition' },
  { href: '/products?category=traditional-malt', label: 'Traditional Malt' },
  { href: '/products?category=millet-products', label: 'Millet Products' },
  { href: '/products?category=instant-mixes', label: 'Instant Mixes' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0E0E0F]">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#7B3F21]/20 to-[#D79B3A]/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="section-container flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#171717]/60 px-5 py-6 backdrop-blur-sm sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-white">
              Stay updated with SMP
            </p>
            <p className="mt-1 text-sm text-smp-secondary">
              Get recipe ideas, new arrivals, and seasonal offers.
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-smp-muted outline-none focus:border-[#7B3F21]/50 focus:bg-white/[0.06] transition-all"
            />
            <button
              type="submit"
              className="min-h-12 w-full shrink-0 rounded-xl bg-[#7B3F21] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9A5A3A] sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container grid gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/smp-logo.png"
              alt="SMP Food Products logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white">
                SMP Food Products
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-smp-muted">
                Grown by Nature
              </p>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-7 text-smp-secondary">
            Premium South Indian natural food products crafted for family
            wellness, breakfast rituals, and everyday nourishment.
          </p>
          <div className="mt-4 flex gap-3">
            {[
              { label: 'F', name: 'Facebook' },
              { label: 'I', name: 'Instagram' },
              { label: 'Y', name: 'YouTube' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-xs font-semibold text-smp-secondary transition hover:bg-[#7B3F21] hover:text-white hover:border-[#7B3F21]"
                aria-label={social.name}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-smp-secondary transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Categories
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-smp-secondary transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-white">
            Contact Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-smp-secondary">
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="mt-0.5 shrink-0 text-[#7B3F21]" />
              <div>
                <p>+91 78459 34370</p>
                <p className="text-xs text-smp-muted">
                  Mon-Sat, 9 AM - 6 PM
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0 text-[#7B3F21]" />
              <a
                href="mailto:annamalaiharish54@gmail.com"
                className="hover:text-white transition"
              >
                annamalaiharish54@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[#7B3F21]" />
              <span>Tamil Nadu, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="section-container flex flex-col items-center gap-3 py-5 text-xs text-smp-muted sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} SMP Food Products. All rights
            reserved.
          </p>
          <p>
            Designed & Developed by{' '}
            <a
              href="mailto:annamalaiharish@gmail.com"
              className="font-semibold text-[#7B3F21] hover:text-[#9A5A3A] transition"
            >
              Annamalai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
