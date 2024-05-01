import type { NextAuthConfig, Session } from 'next-auth';

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
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token.user;
      // session.authToken = token.user.token;
      return session;
    },
  },
  providers: [],
  pages: {
    signIn: '/login',
    signOut: '/',
  },
} satisfies NextAuthConfig;
