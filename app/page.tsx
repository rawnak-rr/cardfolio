import { CardFolio } from '@/app/components/cardFolio';
import { pageMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata('home');

export default function Page() {
  const jsonLd = [websiteJsonLd(), personJsonLd()];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CardFolio />
    </>
  );
}
