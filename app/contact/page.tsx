import { HomeClient } from '@/app/components/homeClient';
import { workItems } from '@/src/data';
import { routeMetadata } from '@/src/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: routeMetadata.contact.title,
  description: routeMetadata.contact.description,
  alternates: {
    canonical: routeMetadata.contact.path,
  },
  openGraph: {
    title: routeMetadata.contact.title,
    description: routeMetadata.contact.description,
    url: routeMetadata.contact.path,
  },
  twitter: {
    title: routeMetadata.contact.title,
    description: routeMetadata.contact.description,
  },
};

export default function ContactPage() {
  return <HomeClient workItems={workItems} initialPanel="contact" />;
}
