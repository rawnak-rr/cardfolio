import { HomeClient } from '@/app/components/homeClient';
import { workItems } from '@/src/data';
import { routeMetadata } from '@/src/seo';
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
  return <HomeClient workItems={workItems} initialPanel="thoughts" />;
}
