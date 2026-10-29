import type { Metadata } from 'next';
import { Work } from '@/app/components/work';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('work');

export default function WorkPage() {
  return (
    <section aria-labelledby="work-title">
      <h1 id="work-title" className="mb-8 text-[0.7rem] font-normal text-muted">
        work
      </h1>
      <Work />
    </section>
  );
}
