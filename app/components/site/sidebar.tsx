'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cardReturn } from '@/lib/card-return';
import { links } from '@/lib/data';
import type { FolderName, NavFolders } from '@/lib/nav';

const ROW = '[data-tree-row]';

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.closest("input, textarea, select, [contenteditable='true']") !== null)
  );
}

export function Sidebar({ folders }: { folders: NavFolders }) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [openFolders, setOpenFolders] = useState<Record<FolderName, boolean>>({
    blog: true,
    projects: true,
  });


  const posts = folders.blog;
  const currentIndex = posts.findIndex((post) => post.href === pathname);

  const ariaCurrent = (href: string) => (pathname === href ? 'page' : undefined);

  useEffect(() => {
    cardReturn.pending = true;
  }, []);

  function setFolderOpen(name: FolderName, open: boolean) {
    setOpenFolders((current) => ({ ...current, [name]: open }));
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      const nav = navRef.current;
      if (!nav) return;

      const rows = Array.from(nav.querySelectorAll<HTMLElement>(ROW)).filter(
        (row) => !row.closest('[inert]'),
      );
      const index = rows.indexOf(document.activeElement as HTMLElement);

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        if (currentIndex === -1) return;
        event.preventDefault();
        const step = event.key === 'ArrowRight' ? 1 : -1;
        const next = posts[(currentIndex + step + posts.length) % posts.length];
        router.push(next.href);
        return;
      }

      if (index === -1) {
        if (event.key === 'j' || event.key === 'k') {
          event.preventDefault();
          (rows.find((row) => row.getAttribute('aria-current') === 'page') ?? rows[0])?.focus();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          router.push('/');
        }
        return;
      }

      const row = rows[index];
      const folder = row.dataset.folder as FolderName | undefined;
      const isOpen = row.getAttribute('aria-expanded') === 'true';

      switch (event.key) {
        case 'j':
        case 'ArrowDown':
          event.preventDefault();
          rows[Math.min(index + 1, rows.length - 1)].focus();
          break;
        case 'k':
        case 'ArrowUp':
          event.preventDefault();
          rows[Math.max(index - 1, 0)].focus();
          break;
        case 'l':
          event.preventDefault();
          if (folder && !isOpen) setFolderOpen(folder, true);
          else if (folder) rows[index + 1]?.focus();
          else row.click();
          break;
        case 'h':
          event.preventDefault();
          if (folder && isOpen) setFolderOpen(folder, false);
          else if (row.dataset.treeParent) {
            nav.querySelector<HTMLElement>(row.dataset.treeParent)?.focus();
          }
          break;
        case 'Escape':
          event.preventDefault();
          row.blur();
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, posts, router]);

  const renderFolder = (name: FolderName) => {
    const open = openFolders[name];
    return (
      <li>
        <button
          type="button"
          id={`tree-${name}-toggle`}
          data-tree-row
          data-folder={name}
          aria-expanded={open}
          aria-controls={`tree-${name}`}
          onClick={() => setFolderOpen(name, !open)}
          className="tree-row"
        >
          <span className="tree-label">{name}</span>
          <span className="tree-chevron" aria-hidden="true">
            ▾
          </span>
        </button>

        <div id={`tree-${name}`} className="tree-children" data-collapsed={!open} inert={!open}>
          <ul className="tree">
            {folders[name].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title}
                  data-tree-row
                  data-tree-parent={`#tree-${name}-toggle`}
                  aria-current={ariaCurrent(item.href)}
                  className="tree-row"
                >
                  <span className="tree-label">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <nav ref={navRef} aria-label="Site" className="text-[0.8rem]">
      <Link href="/" data-tree-row className="tree-row !px-0 !text-ink">
        rawnak
      </Link>

      <ul className="tree">
        <li>
          <Link
            href={links.summary}
            data-tree-row
            aria-current={ariaCurrent(links.summary)}
            className="tree-row"
          >
            summary
          </Link>
        </li>
        {renderFolder('blog')}
        {renderFolder('projects')}
        <li>
          <Link href="/work" data-tree-row aria-current={ariaCurrent('/work')} className="tree-row">
            work
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            data-tree-row
            aria-current={ariaCurrent('/contact')}
            className="tree-row"
          >
            contact
          </Link>
        </li>
      </ul>

      <p className="mt-10 hidden text-[0.7rem] leading-[1.9] text-muted md:block">
        j k move · h l fold · ↵ open
        <br />
        ← → posts · esc card
      </p>
    </nav>
  );
}
