import { HomeClient } from '@/app/components/homeClient';
import { workItems } from '@/src/data';
import { personJsonLd, routeMetadata, websiteJsonLd } from '@/src/seo';
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
      <HomeClient workItems={workItems} />
    </>
  );
}
