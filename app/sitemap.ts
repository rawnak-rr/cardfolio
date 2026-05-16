import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/src/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
