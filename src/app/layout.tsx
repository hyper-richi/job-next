import localFont from 'next/font/local';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import styles from './layout.module.scss';
import '@mantine/core/styles.css';
import './globals.css';
import { getRegions } from './lib/data';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { WebVitals } from '../components/WebVitals/WebVitals';

const GTEestiProText = localFont({
  src: [
    {
      path: '../../public/fonts/GTEestiProText/gteestiprotext_regular.otf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../../public/fonts/GTEestiProText/gteestiprotext_medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/GTEestiProText/gteestiprotext_bold.otf',
      weight: '700',
      style: 'text_bold',
    },
  ],
  variable: '--gteestiprotext',
});

const GTEestiProDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/GTEestiProDisplay/gteestiprodisplay_light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/gteestiprodisplay_regular.otf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/gteestiprodisplay_medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/GTEestiProDisplay/gteestiprodisplay_bold.otf',
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
        <MantineProvider>
          <Header regions={regions} />
          <main className={styles.container}>
            {children}
            <Analytics />
            <SpeedInsights />
            <WebVitals />
          </main>
          <Footer regions={regions} />
        </MantineProvider>
      </body>
    </html>
  );
}
