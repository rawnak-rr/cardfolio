import type { ReactNode } from 'react';

export function PageHeader({ meta, title }: { meta: ReactNode; title: string }) {
  return (
    <>
      <p className="text-[0.7rem] text-muted">{meta}</p>
      <h1 className="mt-3 text-[1.75rem] font-normal leading-[1.15] text-ink sm:text-[2rem]">
        {title}
      </h1>
    </>
  );
}
