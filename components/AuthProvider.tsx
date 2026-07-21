'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, type ReactNode } from 'react';

const AuthConfigurationContext = createContext(false);

export function AuthProvider({
  children,
  googleAuthConfigured,
}: {
  children: ReactNode;
  googleAuthConfigured: boolean;
}) {
  return (
    <AuthConfigurationContext.Provider value={googleAuthConfigured}>
      <SessionProvider>{children}</SessionProvider>
    </AuthConfigurationContext.Provider>
  );
}

export function useAuthConfiguration() {
  return useContext(AuthConfigurationContext);
}
