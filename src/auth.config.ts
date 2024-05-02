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

    async jwt({ token, account, user, trigger, session }) {
      /*  if (account && account.type === 'credentials') {
        token.user = user;
      } */
      if (user) {
        token.user = user;
      }
      if (trigger === 'update' && session) {
        token = { ...token, user: session };
        return token;
      }
      return token;
    },
    async session({ session, token, trigger, newSession }: any) {
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
