import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const googleAuthConfigured = Boolean(
  process.env.AUTH_SECRET &&
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_SECRET
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret:
    process.env.AUTH_SECRET ||
    'google-auth-is-disabled-until-environment-variables-are-configured',
  providers: googleAuthConfigured
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
    : [],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
