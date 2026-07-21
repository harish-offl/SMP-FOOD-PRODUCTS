'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0E0E0F] px-4 pb-16 pt-28">
      <section className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#1E1E20] p-6 text-center shadow-card sm:p-10">
        <img
          src="/images/smp-logo.png"
          alt="SMP Food Products logo"
          className="mx-auto h-20 w-20 rounded-full object-cover shadow-glow"
        />
        <p className="section-label mt-6 justify-center">Customer account</p>
        <h1 className="mt-3 text-3xl font-bold text-white">
          {session?.user ? 'You are signed in' : 'Welcome to SMP'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-smp-secondary">
          {session?.user
            ? 'Use the account button below whenever you want to sign out.'
            : 'Sign in securely with Google to access your SMP customer account.'}
        </p>
        <div className="mt-8">
          <GoogleAuthButton variant="full" />
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex text-sm font-semibold text-[#D79B3A] transition hover:text-white"
        >
          Return to the store
        </Link>
      </section>
    </main>
  );
}
