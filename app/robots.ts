import type { MetadataRoute } from 'next';
import { routeUrl } from '@/src/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: routeUrl('/sitemap.xml'),
  };
}
