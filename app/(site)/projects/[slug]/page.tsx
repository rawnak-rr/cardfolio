import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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

const paragraphClass = 'text-pretty text-[0.95rem] leading-[1.85] text-body';
const headingClass = 'text-[0.7rem] text-muted';

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const writing = getPostsForProject(slug);

  return (
    <article>
      <p className="text-[0.7rem] text-muted">
        since {project.started} · {project.stack.join(', ')}
      </p>
      <h1 className="mt-3 text-[1.75rem] font-normal leading-[1.15] text-ink sm:text-[2rem]">
        {project.name}
      </h1>
      <p className="mt-4 text-[0.95rem] text-ink">{project.tagline}</p>

      <div className="mt-12 space-y-6">
        {project.about.map((paragraph) => (
          <p key={paragraph} className={paragraphClass}>
            {paragraph}
          </p>
        ))}
      </div>

      <section aria-labelledby="project-links" className="mt-14">
        <h2 id="project-links" className={headingClass}>
          links
        </h2>
        <ul className="mt-3 space-y-2 text-[0.95rem]">
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
