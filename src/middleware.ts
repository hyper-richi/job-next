import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  /* const isAuthenticated = !!req.auth;
  console.log('isAuthenticated: ', isAuthenticated);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  console.log('nextUrl: ', nextUrl);
  console.log('isPublicRoute: ', isPublicRoute); */

  // if (isPublicRoute && isAuthenticated) return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

  // if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
