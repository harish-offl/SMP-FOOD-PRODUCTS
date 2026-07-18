'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0E0E0F] px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/[0.06] bg-[#1E1E20] p-12 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-[#7A7A7A]">Page not found</p>
        <h1 className="mt-4 text-6xl font-semibold text-white">404</h1>
        <p className="mt-6 text-lg leading-8 text-[#B8B8B8]">Sorry, the page you are looking for does not exist. Return to the home page or explore our shop.</p>
        <div className="mt-10 inline-flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full bg-[#D79B3A] px-7 py-4 text-sm font-semibold text-[#0E0E0F] transition hover:bg-[#D79B3A]/80">Home</Link>
          <Link href="/shop" className="rounded-full border border-[#D79B3A] px-7 py-4 text-sm font-semibold text-[#D79B3A] transition hover:bg-[#D79B3A]/10">Shop</Link>
        </div>
      </div>
    </main>
  );
}
