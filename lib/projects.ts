export type Project = {
  slug: string;
  name: string;
  tagline: string;
  started: string;
  stack: string[];
  links: { label: string; href: string }[];
  about: string[];
};

export const projects: Project[] = [
  {
    slug: 'metis',
    name: 'metis',
    tagline: 'a local-first knowledge system for AI assistants.',
    started: 'Aug 2026',
    stack: ['typescript', 'node', 'mcp'],
    links: [{ label: 'github.com/rawnak-rr/metis', href: 'https://github.com/rawnak-rr/metis' }],
    about: [
      'metis gives any assistant that speaks MCP (like claude) a persistent workspace built from your own sources. you drop in markdown, pdfs, latex, csv or json, and the assistant turns them into an obsidian wiki of concept pages that it writes and keeps up to date.',
      'the raw sources are never touched. every factual line in the wiki has to cite the exact lines of the source it came from, and metis checks those citations against checksummed copies, so nothing in the wiki is made up.',
      "the point is keeping long sessions grounded without blowing the context window. instead of pasting whole documents in, the assistant pulls back one compact concept page, or a few verified excerpts, for as few tokens as possible.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
