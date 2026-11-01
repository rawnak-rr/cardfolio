'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cardReturn } from '@/lib/card-return';
import type { PostSummary } from '@/lib/posts';

type SidebarProps = {
  posts: PostSummary[];
};

const ROW = '[data-tree-row]';

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.closest("input, textarea, select, [contenteditable='true']") !== null)
  );
}

export function Sidebar({ posts }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const [blogOpen, setBlogOpen] = useState(true);

  const currentSlug = pathname.startsWith('/blog/')
    ? pathname.slice('/blog/'.length)
    : null;
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  const ariaCurrent = (href: string) => (pathname === href ? 'page' : undefined);

  useEffect(() => {
    cardReturn.pending = true;
  }, []);

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
        router.push(`/blog/${next.slug}`);
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
      const isFolder = row.hasAttribute('aria-expanded');
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
          if (isFolder && !isOpen) setBlogOpen(true);
          else if (isFolder) rows[index + 1]?.focus();
          else row.click();
          break;
        case 'h':
          event.preventDefault();
          if (isFolder && isOpen) setBlogOpen(false);
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

  return (
    <nav ref={navRef} aria-label="Site" className="text-[0.8rem]">
      <Link href="/" data-tree-row className="tree-row !px-0 !text-ink">
        rawnak
      </Link>

      <ul className="tree">
        <li>
          <Link
            href="/summary"
            data-tree-row
            aria-current={ariaCurrent('/summary')}
            className="tree-row"
          >
            summary
          </Link>
        </li>
        <li>
          <button
            type="button"
            id="tree-blog-toggle"
            data-tree-row
            aria-expanded={blogOpen}
            aria-controls="tree-blog"
            onClick={() => setBlogOpen((open) => !open)}
            className="tree-row"
          >
            <span className="tree-label">blog</span>
            <span className="tree-chevron" aria-hidden="true">
              ▾
            </span>
          </button>

          <div
            id="tree-blog"
            className="tree-children"
            data-collapsed={!blogOpen}
            inert={!blogOpen}
          >
            <ul className="tree">
              {posts.map((post) => {
                const href = `/blog/${post.slug}`;
                return (
                  <li key={post.slug}>
                    <Link
                      href={href}
                      title={post.title}
                      data-tree-row
                      data-tree-parent="#tree-blog-toggle"
                      aria-current={ariaCurrent(href)}
                      className="tree-row"
                    >
                      <span className="tree-label">{post.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
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
