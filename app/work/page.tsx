import { CardFolio } from '@/app/components/cardFolio';
import { workItems } from '@/lib/data';
import { routeMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: routeMetadata.work.title,
  description: routeMetadata.work.description,
  alternates: {
    canonical: routeMetadata.work.path,
  },
  openGraph: {
    title: routeMetadata.work.title,
    description: routeMetadata.work.description,
    url: routeMetadata.work.path,
  },
  twitter: {
    title: routeMetadata.work.title,
    description: routeMetadata.work.description,
  },
};

export default function WorkPage() {
  return <CardFolio workItems={workItems} initialPanel="work" />;
}
