import { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-2xl border border-neutral-200 bg-white/70 p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] last:pb-16 sm:p-6 md:p-7 dark:border-neutral-800 dark:bg-neutral-900/70">
      {title && (
        <h2 className="mb-4 text-2xl font-[var(--font-display)] font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
