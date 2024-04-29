import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

const pathsProtected = ['/profile', '/favorites'];

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthorized = !!req.auth;

  const isProtected = pathsProtected.some((path) => {
    return nextUrl.pathname.startsWith(path);
  });

  if (!isAuthorized && isProtected) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
  return null;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
