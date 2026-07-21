'use client';

import { LogIn, LogOut, User } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useAuthConfiguration } from '@/components/AuthProvider';

interface GoogleAuthButtonProps {
  variant?: 'icon' | 'full';
  onComplete?: () => void;
}

export function GoogleAuthButton({
  variant = 'icon',
  onComplete,
}: GoogleAuthButtonProps) {
  const { data: session, status } = useSession();
  const googleAuthConfigured = useAuthConfiguration();
  const user = session?.user;

  const handleSignIn = async () => {
    onComplete?.();
    await signIn('google', { redirectTo: '/' });
  };

  const handleSignOut = async () => {
    onComplete?.();
    await signOut({ redirectTo: '/' });
  };

  if (status === 'loading') {
    return (
      <div
        className={
          variant === 'icon'
            ? 'h-10 w-10 animate-pulse rounded-full bg-white/[0.06]'
            : 'h-12 w-full animate-pulse rounded-xl bg-white/[0.06]'
        }
        aria-label="Loading account"
      />
    );
  }

  if (!googleAuthConfigured) {
    if (variant === 'full') {
      return (
        <button
          type="button"
          disabled
          className="flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-smp-muted"
          title="Add Google OAuth credentials to .env.local to enable login"
        >
          <GoogleMark />
          Google login needs configuration
        </button>
      );
    }

    return (
      <button
        type="button"
        disabled
        className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-smp-muted opacity-60"
        aria-label="Google login needs configuration"
        title="Add Google OAuth credentials to .env.local"
      >
        <LogIn size={18} />
      </button>
    );
  }

  if (variant === 'full') {
    if (user) {
      return (
        <button
          type="button"
          onClick={handleSignOut}
          className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-left transition hover:bg-white/[0.08]"
        >
          {user.image ? (
            <img
              src={user.image}
              alt=""
              referrerPolicy="no-referrer"
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7B3F21] text-white">
              <User size={17} />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">
              {user.name || 'Google account'}
            </span>
            <span className="block truncate text-xs text-smp-muted">
              {user.email || 'Signed in'}
            </span>
          </span>
          <LogOut size={17} className="shrink-0 text-smp-muted" />
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleSignIn}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white px-4 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#F5E9D8]"
      >
        <GoogleMark />
        Continue with Google
      </button>
    );
  }

  if (user) {
    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#D79B3A]/40 bg-white/[0.04] transition hover:border-[#D79B3A]"
        aria-label={`Sign out ${user.name || user.email || 'Google account'}`}
        title="Sign out"
      >
        {user.image ? (
          <img
            src={user.image}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        ) : (
          <User size={18} className="text-white" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04] text-smp-secondary transition hover:bg-white/[0.08] hover:text-white"
      aria-label="Sign in with Google"
      title="Sign in with Google"
    >
      <LogIn size={18} />
    </button>
  );
}

export function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.32 2.98-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.54c-.9.6-2.05.97-3.38.97-2.61 0-4.82-1.76-5.61-4.13H3.05v2.62A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.87A6.02 6.02 0 0 1 6.07 12c0-.65.11-1.28.32-1.87V7.51H3.05A10 10 0 0 0 2 12c0 1.61.39 3.14 1.05 4.49l3.34-2.62Z" />
      <path fill="#EA4335" d="M12 6c1.47 0 2.8.51 3.84 1.51l2.88-2.88A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.95 5.51l3.34 2.62C7.18 7.76 9.39 6 12 6Z" />
    </svg>
  );
}
