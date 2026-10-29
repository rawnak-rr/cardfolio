import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Sidebar } from '@/app/components/site/sidebar';
import { getPostSummaries } from '@/lib/posts';

const iosevka = localFont({
  src: '../../node_modules/@fontsource/iosevka/files/iosevka-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['SFMono-Regular', 'Menlo', 'monospace'],
});

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${iosevka.className} min-h-dvh bg-black text-ink md:grid md:grid-cols-[21rem_minmax(0,1fr)]`}
    >
      <aside className="border-b border-rule px-6 py-8 md:sticky md:top-0 md:h-dvh md:overflow-y-auto md:border-b-0 md:px-8 md:py-14">
        <Sidebar posts={getPostSummaries()} />
      </aside>
      <main className="min-w-0 px-6 pb-24 pt-12 md:pt-24">
        <div className="mx-auto w-full max-w-[38rem]">{children}</div>
      </main>
    </div>
  );
}
