import localFont from 'next/font/local';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import styles from './layout.module.scss';
import '@mantine/core/styles.css';
import './globals.css';
import '@mantine/notifications/styles.css';
import { getRegions } from './lib/api/data';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { StoreProvider } from './lib/provider/StoreProvider';
import { Notifications } from '@mantine/notifications';

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
    template: '%s | Работа в России, поиск  вакансий',
    default: 'Работа в России, поиск  вакансий',
  },
  icons: {
    icon: [{ url: '/icon.svg' }, new URL('/icon.svg', 'https://example.com')],
    shortcut: ['/icon.svg'],
    apple: [{ url: '/icon.svg' }, { url: '/icon.svg', sizes: '180x180', type: 'image/svg' }],
  },
  description: `Сайт, который помогает найти работу в России! Создавайте резюме и откликайтесь на вакансии.`,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: regions } = await getRegions();

  return (
    <html lang='ru'>
      <head>
        <ColorSchemeScript />
        <meta name='robots' content='all' />
      </head>
      <body className={`${GTEestiProDisplay.className} ${GTEestiProText.variable} `}>
        <StoreProvider>
          <MantineProvider>
            <Notifications />
            <Header regions={regions} />
            <main className={styles.container}>
              {children}
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
