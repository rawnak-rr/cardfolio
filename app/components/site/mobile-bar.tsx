'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { PostSummary } from '@/lib/posts';

type MobileBarProps = {
  posts: PostSummary[];
};

const tabClass =
  'px-1.5 py-3 text-muted transition-colors aria-[current=page]:text-ink aria-[expanded=true]:text-ink';

export function MobileBar({ posts }: MobileBarProps) {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);

  useEffect(() => {
    setBlogOpen(false);
  }, [pathname]);

  const ariaCurrent = (active: boolean) => (active ? 'page' : undefined);

  const tab = (href: string, label: string) => (
    <Link href={href} aria-current={ariaCurrent(pathname === href)} className={tabClass}>
      [{label}]
    </Link>
  );

  return (
    <div className="md:hidden">
      {blogOpen ? (
        <button
          type="button"
          aria-label="Close blog list"
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setBlogOpen(false)}
        />
      ) : null}

      <nav
        aria-label="Site"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-black pb-[env(safe-area-inset-bottom)] text-[0.75rem]"
      >
        {blogOpen ? (
          <ul
            id="mobile-blog-list"
            className="tree absolute inset-x-0 bottom-full border-t border-rule bg-black px-6 py-4"
          >
            {posts.map((post) => {
              const href = `/blog/${post.slug}`;
              return (
                <li key={post.slug}>
                  <Link
                    href={href}
                    aria-current={ariaCurrent(pathname === href)}
                    className="tree-row"
                  >
                    <span className="tree-label">{post.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="flex justify-center gap-1">
          {tab('/summary', 'summary')}
          <button
            type="button"
            aria-expanded={blogOpen}
            aria-controls="mobile-blog-list"
            aria-current={ariaCurrent(pathname.startsWith('/blog/'))}
            onClick={() => setBlogOpen((open) => !open)}
            className={`${tabClass} cursor-pointer`}
          >
            [blog]
          </button>
          {tab('/', 'card')}
          {tab('/work', 'work')}
          {tab('/contact', 'contact')}
        </div>
      </nav>
    </div>
  );
}
