import { CardFolio } from '@/app/components/cardFolio';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata('contact');

export default function ContactPage() {
  return <CardFolio initialPanel="contact" />;
}
