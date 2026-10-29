import Link from 'next/link';
import type { Metadata } from 'next';
import { formatPostDate, getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Thoughts | rawnak',
  description: 'A digital trail of my work and life.',
  alternates: { canonical: '/thoughts' },
};

export default function ThoughtsPage() {
  return (
    <section aria-labelledby="thoughts-title">
      <h1 id="thoughts-title" className="text-[0.7rem] font-normal text-muted">
        thoughts
      </h1>
      <ul className="mt-6">
        {getAllPosts().map((post) => (
          <li key={post.slug} className="border-b border-rule">
            <Link
              href={`/thoughts/${post.slug}`}
              className="flex items-baseline justify-between gap-6 py-4 text-[0.95rem] text-body transition-colors hover:text-ink"
            >
              <span>{post.title}</span>
              <time dateTime={post.publishedAt} className="shrink-0 text-[0.7rem] text-muted">
                {formatPostDate(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
