import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import {
  absoluteUrl,
  routeMetadata,
  seoKeywords,
  siteDescription,
  siteName,
  siteUrl,
} from '@/lib/seo';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
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
        alt: 'rawnak fullstack developer portfolio card',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} ${spaceMono.variable} bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
