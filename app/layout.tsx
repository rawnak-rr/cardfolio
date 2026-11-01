import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import {
  absoluteUrl,
  ogImageAlt,
  routeMetadata,
  seoKeywords,
  siteDescription,
  siteName,
  siteUrl,
} from '@/lib/seo';
import './globals.css';

const iosevka = localFont({
  src: [
    {
      path: './fonts/iosevka-400.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['SFMono-Regular', 'Menlo', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: routeMetadata.home.title,
    template: '%s',
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: 'rawnak', url: siteUrl }],
  creator: 'rawnak',
  publisher: 'rawnak',
  alternates: {
    canonical: routeMetadata.home.path,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: routeMetadata.home.path,
    siteName,
    title: routeMetadata.home.title,
    description: siteDescription,
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: routeMetadata.home.title,
    description: siteDescription,
    images: [absoluteUrl('/opengraph-image')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${iosevka.className} bg-black text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
