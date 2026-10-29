import type { MDXComponents } from 'mdx/types';
import { ArticleFigure, ArticleImage } from '@/app/components/site/article-image';
import { PhotoNote, PhotoStory, StorySummary } from '@/app/components/site/photo-story';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-14 text-[1.25rem] leading-tight text-ink">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 text-base leading-tight text-ink">{children}</h3>,
    p: ({ children }) => (
      <p className="mt-6 text-pretty text-[0.95rem] leading-[1.85] text-body">{children}</p>
    ),
    a: ({ children, href }) => (
      <a className="article-link" href={href}>
        {children}
      </a>
    ),
    em: ({ children }) => <em className="text-ink">{children}</em>,
    strong: ({ children }) => <strong className="font-normal text-ink">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="mx-0 my-10 border-l border-rule pl-5 text-ink [&>p]:mt-0 [&>p]:text-ink">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-5 text-[0.95rem] leading-[1.75] text-body">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-[0.95rem] leading-[1.75] text-body">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="bg-surface px-1.5 py-0.5 text-[0.85em] text-ink">{children}</code>
    ),
    img: ({ alt = '', ...props }) => <ArticleImage alt={alt} {...props} />,
    Figure: ArticleFigure,
    PhotoNote,
    PhotoStory,
    StorySummary,
    ...components,
  };
}
