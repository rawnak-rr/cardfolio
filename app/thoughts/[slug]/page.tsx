import { notFound } from 'next/navigation';
import { BackButton } from '@/app/components/backButton';
import { thoughts } from '@/src/data';

type ThoughtPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const { slug } = await params;
  const thought = thoughts.find((entry) => entry.slug === slug);

  if (!thought) {
    notFound();
  }

  return (
    <main className="note-panel min-h-screen bg-black text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="max-w-md px-2 flex flex-col gap-8">
          <div className="space-y-1">
            <h1 className="text-sm uppercase tracking-[0.14em] text-white/92">{thought.title}</h1>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">{thought.date}</p>
          </div>
          <p className="text-sm leading-relaxed tracking-wide text-white/88">{thought.content}</p>
          <BackButton href="/thoughts" />
        </div>
      </div>
    </main>
  );
}
