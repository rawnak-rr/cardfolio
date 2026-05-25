import { CardFolio } from '@/app/components/cardFolio';
import { workItems } from '@/lib/data';
import { routeMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: routeMetadata.thoughts.title,
  description: routeMetadata.thoughts.description,
  alternates: {
    canonical: routeMetadata.thoughts.path,
  },
  openGraph: {
    title: routeMetadata.thoughts.title,
    description: routeMetadata.thoughts.description,
    url: routeMetadata.thoughts.path,
  },
  twitter: {
    title: routeMetadata.thoughts.title,
    description: routeMetadata.thoughts.description,
  },
};

export default function ThoughtsPage() {
  return <CardFolio workItems={workItems} initialPanel="thoughts" />;
}
