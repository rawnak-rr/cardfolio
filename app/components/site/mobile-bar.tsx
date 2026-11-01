'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { links } from '@/lib/data';
import type { FolderName, NavFolders } from '@/lib/nav';

const tabClass =
  'px-1 py-3 text-muted transition-colors aria-[current=page]:text-ink aria-[expanded=true]:text-ink';

export function MobileBar({ folders }: { folders: NavFolders }) {
  const pathname = usePathname();
  const [openFolder, setOpenFolder] = useState<FolderName | null>(null);

  useEffect(() => {
    setOpenFolder(null);
  }, [pathname]);

  const ariaCurrent = (active: boolean) => (active ? 'page' : undefined);

  const tab = (href: string, label: string) => (
    <Link href={href} aria-current={ariaCurrent(pathname === href)} className={tabClass}>
      [{label}]
    </Link>
  );

  const folderTab = (name: FolderName) => (
    <button
      type="button"
      aria-expanded={openFolder === name}
      aria-controls="mobile-folder-list"
      aria-current={ariaCurrent(pathname.startsWith(`/${name}/`))}
      onClick={() => setOpenFolder((open) => (open === name ? null : name))}
      className={`${tabClass} cursor-pointer`}
    >
      [{name}]
    </button>
  );

  return (
    <div className="md:hidden">
      {openFolder ? (
        <button
          type="button"
          aria-label={`Close ${openFolder} list`}
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setOpenFolder(null)}
        />
      ) : null}

      <nav
        aria-label="Site"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-black pb-[env(safe-area-inset-bottom)] text-[0.75rem]"
      >
        {openFolder ? (
          <ul
            id="mobile-folder-list"
            className="tree absolute inset-x-0 bottom-full border-t border-rule bg-black px-6 py-4"
          >
            {folders[openFolder].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={ariaCurrent(pathname === item.href)}
                  className="tree-row"
                >
                  <span className="tree-label">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex justify-center gap-1">
          {tab(links.summary, 'summary')}
          {folderTab('blog')}
          {folderTab('projects')}
          {tab('/', 'card')}
          {tab('/work', 'work')}
          {tab('/contact', 'contact')}
        </div>
      </nav>
    </div>
  );
}
