import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatPostDate, getAllPosts, getPost } from '@/lib/posts';

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  return {
    title: `${post.title} | rawnak`,
    description: post.description,
    alternates: { canonical: `/thoughts/${post.slug}` },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;
  const posts = getAllPosts();
  const index = posts.findIndex((entry) => entry.slug === slug);
  const previous = posts[(index - 1 + posts.length) % posts.length];
  const next = posts[(index + 1) % posts.length];

  return (
    <article>
      <p className="text-[0.7rem] text-muted">
        <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> ·{' '}
        {post.readingTime} min read
      </p>
      <h1 className="mt-3 text-[1.75rem] font-normal leading-[1.15] text-ink sm:text-[2rem]">
        {post.title}
      </h1>

      <div className="mt-12 [&>:first-child]:!mt-0">
        <Content />
      </div>

      {posts.length > 1 ? (
        <nav
          aria-label="More thoughts"
          className="mt-20 flex justify-between gap-6 border-t border-rule pt-5 text-[0.75rem] text-muted"
        >
          <Link href={`/thoughts/${previous.slug}`} className="transition-colors hover:text-ink">
            ← {previous.title}
          </Link>
          <Link
            href={`/thoughts/${next.slug}`}
            className="text-right transition-colors hover:text-ink"
          >
            {next.title} →
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
