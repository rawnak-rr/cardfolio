import { CardFolio } from '@/app/components/cardFolio';
import { workItems } from '@/lib/data';
import { personJsonLd, routeMetadata, websiteJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: routeMetadata.home.title,
  description: routeMetadata.home.description,
  alternates: {
    canonical: routeMetadata.home.path,
  },
};

export default function Page() {
  const jsonLd = [websiteJsonLd(), personJsonLd()];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CardFolio workItems={workItems} />
    </>
  );
}
