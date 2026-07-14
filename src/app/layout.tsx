import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal Bakery & Cafe - Premium Baked Goods & Coffee',
  description: 'Experience luxury baking at Royal Bakery & Cafe. Fresh cakes, pastries, and premium coffee. Open 24/7 in Kichha, Uttarakhand.',
  keywords: 'bakery, cafe, cakes, pastries, coffee, Kichha, Uttarakhand',
  metadataBase: new URL('https://royalbakery.com'),
  openGraph: {
    title: 'Royal Bakery & Cafe',
    description: 'Premium baked goods and artisan coffee',
    url: 'https://royalbakery.com',
    siteName: 'Royal Bakery & Cafe',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558636508-e0db3814a69f?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Bakery & Cafe',
    description: 'Premium baked goods and artisan coffee',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1410" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
