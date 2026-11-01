import type { ReactNode } from 'react';
import { MobileBar } from '@/app/components/site/mobile-bar';
import { Sidebar } from '@/app/components/site/sidebar';
import { getNavFolders } from '@/lib/nav';

export default function SiteLayout({ children }: { children: ReactNode }) {
  const folders = getNavFolders();

  return (
    <div className="min-h-dvh bg-black text-ink md:grid md:grid-cols-[21rem_minmax(0,1fr)]">
      <aside className="hidden md:sticky md:top-0 md:block md:h-dvh md:overflow-y-auto md:px-8 md:py-14">
        <Sidebar folders={folders} />
      </aside>
      <main className="min-w-0 px-6 pb-24 pt-12 md:pt-24">
        <div className="mx-auto w-full max-w-[38rem]">{children}</div>
      </main>
      <MobileBar folders={folders} />
    </div>
  );
}
