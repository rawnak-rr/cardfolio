import Link from 'next/link';
import { thoughts } from '@/src/data';

export default function ThoughtsPage() {
  return (
    <main className="note-panel min-h-screen bg-black text-white">
      <div className="grid min-h-screen grid-cols-1 border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {thoughts.map((thought) => (
          <Link
            key={thought.slug}
            href={`/thoughts/${thought.slug}`}
            className="block aspect-square border-b border-r border-white/15 p-5 transition-colors hover:bg-white/[0.03] sm:p-6"
          >
            <div className="flex h-full flex-col gap-5">
              <div className="space-y-1">
                <h2 className="text-sm uppercase tracking-[0.14em] text-white/92">{thought.title}</h2>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{thought.date}</p>
              </div>

              <p className="text-sm leading-relaxed tracking-wide text-white/88">{thought.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
