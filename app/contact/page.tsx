import { CardFolio } from '@/app/components/cardFolio';
import { workItems } from '@/lib/data';
import { routeMetadata } from '@/lib/seo';
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
  return <CardFolio workItems={workItems} initialPanel="contact" />;
}
