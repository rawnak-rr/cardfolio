import { HomeClient } from '@/app/components/homeClient';
import { workItems } from '@/src/data';
import { routeMetadata } from '@/src/seo';
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
  return <HomeClient workItems={workItems} initialPanel="work" />;
}
