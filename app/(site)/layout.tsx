import type { ReactNode } from 'react';
import { MobileBar } from '@/app/components/site/mobile-bar';
import { Sidebar } from '@/app/components/site/sidebar';
import { getPostSummaries } from '@/lib/posts';
import { projects } from '@/lib/projects';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const posts = getPostSummaries();

  return (
    <div className="min-h-dvh bg-black text-ink md:grid md:grid-cols-[21rem_minmax(0,1fr)]">
      <aside className="hidden md:sticky md:top-0 md:block md:h-dvh md:overflow-y-auto md:px-8 md:py-14">
        <Sidebar posts={posts} projects={projects} />
      </aside>
      <main className="min-w-0 px-6 pb-24 pt-12 md:pt-24">
        <div className="mx-auto w-full max-w-[38rem]">{children}</div>
      </main>
      <MobileBar posts={posts} projects={projects} />
    </div>
  );
}
