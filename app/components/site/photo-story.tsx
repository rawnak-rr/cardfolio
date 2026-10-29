import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PhotoNoteProps = Omit<ComponentPropsWithoutRef<'img'>, 'alt'> & {
  alt: string;
  children: ReactNode;
  side?: 'left' | 'right';
};

export function PhotoStory({ children }: { children: ReactNode }) {
  return <section className="my-10 grid gap-8 [&>section]:my-0">{children}</section>;
}

export function PhotoNote({ alt, children, side = 'left', ...imageProps }: PhotoNoteProps) {
  return (
    <section
      className={`my-10 grid gap-5 sm:items-center sm:gap-8 ${
        side === 'left'
          ? 'sm:grid-cols-[13rem_minmax(0,1fr)]'
          : 'sm:grid-cols-[minmax(0,1fr)_13rem]'
      }`}
    >
      <figure className={`m-0 overflow-hidden bg-surface ${side === 'right' ? 'sm:order-2' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imageProps}
          alt={alt}
          className="aspect-square h-auto w-full object-cover object-[center_45%]"
          decoding="async"
          loading="lazy"
        />
      </figure>
      <div className="text-[0.95rem] leading-[1.85] text-body [&>p]:m-0 [&>p]:text-pretty">
        {children}
      </div>
    </section>
  );
}

export function StorySummary({ children }: { children: ReactNode }) {
  return (
    <footer className="border-t border-rule pt-8 text-[0.95rem] leading-[1.85] text-body [&>p]:m-0 [&>p]:text-pretty">
      {children}
    </footer>
  );
}
