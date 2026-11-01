import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import path from 'path';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
    ],
  },
});

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
