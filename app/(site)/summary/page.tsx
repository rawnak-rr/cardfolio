import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'rawnak',
  description: 'What rawnak is up to these days.',
  alternates: { canonical: '/summary' },
};

export default function SummaryPage() {
  return (
    <section aria-labelledby="summary-title" className="space-y-6">
      <h1 id="summary-title" className="sr-only">
        summary
      </h1>
      <p className="body-text">
        i&apos;m rawnak, a fullstack developer studying computer science at UNSW.
      </p>
      <p className="body-text">
        most of my time these days goes into redback racing, UNSW&apos;s formula SAE team.
        i work on vehicle analytics, building the telemetry site our engineers use to
        compare car setups, dig through data logs and watch live data at track days and
        races.
      </p>
      <p className="body-text">
        before that i built a big part of leibniz education&apos;s learning platform, and
        turFinder, an app for finding pickup soccer games near you. more on those under{' '}
        <Link href="/work" className="article-link">
          work
        </Link>
        .
      </p>
      <p className="body-text">
        when i&apos;m not building things i write here about music, memory and cold nights
        at the track.
      </p>
    </section>
  );
}
