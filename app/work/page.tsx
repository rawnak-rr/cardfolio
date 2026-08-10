import { CardFolio } from '@/app/components/cardFolio';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata('work');

export default function WorkPage() {
  return <CardFolio initialPanel="work" />;
}
