'use client';

import { useState } from 'react';
import { BackButton } from '@/app/components/backButton';
import type { WorkItem } from '@/src/data';

type WorkProps = {
  isOpen: boolean;
  items: WorkItem[];
  onClose: () => void;
};

export function Work({ isOpen, items, onClose }: WorkProps) {
  const [openCompany, setOpenCompany] = useState(items[0]?.company ?? '');

  return (
    <div
      className={`z-50 fixed inset-0 flex items-center justify-center bg-[#050505] text-white transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}>
      <div className='flex h-[min(78vh,36rem)] w-[min(92vw,34rem)] flex-col overflow-hidden px-5 py-5 sm:px-6 sm:py-6'>
        <div className='flex-1 space-y-4 overflow-y-auto pr-1'>
          {items.map((item) => {
            const isExpanded = item.company === openCompany;

            return (
              <section
                key={item.company}
                className='border-b border-white/10 pb-4 last:border-b-0'>
                <button
                  type='button'
                  className='w-full text-left'
                  onClick={() =>
                    setOpenCompany(isExpanded ? '' : item.company)
                  }>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-2 text-sm leading-none text-white/92'>
                      <span className='text-white/42'>
                        {isExpanded ? '[-]' : '[+]'}
                      </span>
                      <span className='uppercase'>{item.company}</span>
                    </div>
                    <span className='shrink-0 pt-0.5 text-xs text-white/42'>
                      {item.date}
                    </span>
                  </div>
                  <p className='mt-1.5 pl-7 text-xs uppercase tracking-[0.08em] text-white/42 sm:pl-8'>
                    {item.role}
                  </p>
                </button>

                {isExpanded ? (
                  <p className='mt-3 pl-7 text-sm leading-relaxed text-white/62 sm:pl-8'>
                    {item.summary}
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>

        <div className='pt-5'>
          <BackButton onClick={onClose} tone='light' />
        </div>
      </div>
    </div>
  );
}
