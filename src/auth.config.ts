import { logout } from '@/lib/actions';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/protected', '/favorites'];
      const isProtected = paths.some((path) => {
        return nextUrl.pathname.startsWith(path);
      });
      console.log('nextUrl.origin: ', nextUrl.origin);

      if (isProtected && !isLoggedIn) {
        console.log('isProtected && !isLoggedIn: ', isProtected && !isLoggedIn);
        const redirectUrl = new URL('/api/auth/signin', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        // return Response.redirect(redirectUrl);
      }

      return true;
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
