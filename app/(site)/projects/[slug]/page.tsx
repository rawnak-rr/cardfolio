import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHeader } from '@/app/components/site/page-header';
import { formatPostDate, getPostsForProject } from '@/lib/posts';
import { getProject, projects } from '@/lib/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return {
    title: `${project.name} | rawnak`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

const headingClass = 'text-[0.7rem] text-muted';

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const writing = getPostsForProject(slug);

  return (
    <article>
      <PageHeader meta={project.stack.join(', ')} title={project.name} />
      <p className="mt-4 text-[0.95rem] text-ink">{project.tagline}</p>

      <div className="mt-12 space-y-6">
        {project.about.map((paragraph) => (
          <p key={paragraph} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <section aria-label="project links" className="mt-14">
        <ul className="space-y-2 text-[0.95rem]">
          {project.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="article-link text-body">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {writing.length > 0 ? (
        <section aria-labelledby="project-writing" className="mt-14">
          <h2 id="project-writing" className={headingClass}>
            writing
          </h2>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {writing.map((post) => (
              <li key={post.slug} className="flex items-baseline justify-between gap-6">
                <Link href={`/blog/${post.slug}`} className="article-link text-body">
                  {post.title}
                </Link>
                <time dateTime={post.publishedAt} className="shrink-0 text-[0.7rem] text-muted">
                  {formatPostDate(post.publishedAt)}
                </time>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
