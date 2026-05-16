import type { MetadataRoute } from 'next';
import { siteDescription, siteName } from '@/src/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} portfolio`,
    short_name: siteName,
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff6f00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
