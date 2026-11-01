import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/site/page-header';
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
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content } = post;

  return (
    <article>
      <PageHeader
        meta={
          <>
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> ·{' '}
            {post.readingTime} min read
          </>
        }
        title={post.title}
      />

      <div className="mt-12 [&>:first-child]:!mt-0">
        <Content />
      </div>
    </article>
  );
}
