import localFont from 'next/font/local';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { StoreProvider } from './lib/provider/StoreProvider';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import styles from './layout.module.scss';
import './globals.scss';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { getRegions } from './lib/api/data';

const GTEestiProText = localFont({
  src: [
    {
      path: '../../public/fonts/GTEestiProText/GT-Eesti-Pro-Text-Light.woff2',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/GTEestiProText/GT-Eesti-Pro-Text-Regular.woff2',
      weight: '400',
      style: 'regular',
    } /* ,
    {
      path: '../../public/fonts/GTEestiProText/gteestiprotext_bold.otf',
      weight: '700',
      style: 'text_bold',
    }, */,
  ],
  variable: '--gteestiprotext',
});

const GTEestiProDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/GTEestiProDisplay/GTEestiProDisplay-Light.woff',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/GT-Eesti-Pro-Display-Regular.woff2',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/GT-Eesti-Pro-Display-Medium.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/GT-Eesti-Pro-Display-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  variable: '--gteestiprodisplay',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Лучшая Работа, поиск  вакансий',
    default: 'Лучшая Работа, найди и работай в кайф!',
  },
  icons: {
    icon: [{ url: '/icon.svg' }], // new URL('/icon.svg', 'https://example.com')
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }, { url: '/icon.svg', sizes: '180x180', type: 'image/svg' }],
  },
  description: `Сайт, который помогает найти лучшую работу! Создавайте резюме и откликайтесь на вакансии.`,
  metadataBase: new URL('https://job-next.vercel.app'),
  keywords: ['работа', 'работа мечты', 'лучшая работа', 'самая лучшая работа в моей жизни'],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Лучшая работа',
    description: 'Лучшая Работа, найди и работай в кайф!',
    url: 'https://job-next.vercel.app',
    siteName: 'работа мечты',
    // authors: ['Seb', 'Josh'],
    images: [
      {
        url: 'https://job-next.vercel.app/opengraph-image-min.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://job-next.vercel.app/opengraph-image.jpg', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Камалов Эльдар',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const regions = await getRegions();
  const session = await auth();
  return (
    <html lang='ru'>
      <head>
        <ColorSchemeScript />
        <meta name='robots' content='all' />
      </head>
      <body className={`${GTEestiProDisplay.className} ${GTEestiProText.variable} `}>
        <StoreProvider>
          <MantineProvider>
            <Notifications limit={5} />
            <SessionProvider session={session}>
              <Header regions={regions} />
            </SessionProvider>
            <main className={styles.container}>
              <SessionProvider session={session}>{children}</SessionProvider>
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer regions={regions} />
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
