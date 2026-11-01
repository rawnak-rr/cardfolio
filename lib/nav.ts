import { getPostSummaries } from '@/lib/posts';
import { projects } from '@/lib/projects';

export type FolderName = 'blog' | 'projects';

export type NavItem = { href: string; title: string };

export type NavFolders = Record<FolderName, NavItem[]>;

export function getNavFolders(): NavFolders {
  return {
    blog: getPostSummaries().map((post) => ({ href: `/blog/${post.slug}`, title: post.title })),
    projects: projects.map((project) => ({
      href: `/projects/${project.slug}`,
      title: project.name,
    })),
  };
}
