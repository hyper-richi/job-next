import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth }) {
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
  pages: {
    error: '/error',
    signIn: '/login',
    signOut: '/',
  },
} satisfies NextAuthConfig;
