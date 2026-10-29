import type { ComponentType } from 'react';

import RodeoTrap, { frontmatter as rodeoTrapMeta } from '@/content/posts/rodeo-trap.mdx';
import ShortSpanMemory, {
  frontmatter as shortSpanMemoryMeta,
} from '@/content/posts/short-span-memory.mdx';
import TrackDayAtRedbackRacing, {
  frontmatter as trackDayAtRedbackRacingMeta,
} from '@/content/posts/track-day-at-redback-racing.mdx';

export type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: number;
};

export type Post = PostFrontmatter & {
  slug: string;
  Content: ComponentType;
};

export type PostSummary = Omit<Post, 'Content'>;

const postRegistry: Post[] = [
  { slug: 'rodeo-trap', ...rodeoTrapMeta, Content: RodeoTrap },
  { slug: 'short-span-memory', ...shortSpanMemoryMeta, Content: ShortSpanMemory },
  {
    slug: 'track-day-at-redback-racing',
    ...trackDayAtRedbackRacingMeta,
    Content: TrackDayAtRedbackRacing,
  },
];

/** Newest first. */
export function getAllPosts(): Post[] {
  return postRegistry.toSorted(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPost(slug: string): Post | undefined {
  return postRegistry.find((post) => post.slug === slug);
}

/** The serialisable part of a post, for passing to client components. */
export function getPostSummaries(): PostSummary[] {
  return getAllPosts().map(({ Content: _, ...summary }) => summary);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
