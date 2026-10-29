declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    description: string;
    publishedAt: string;
    readingTime: number;
  };

  const MDXContent: ComponentType;
  export default MDXContent;
}
