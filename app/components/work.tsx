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
                key={`${item.company}-${item.date}`}
                className='border-b border-white/10 pb-4 last:border-b-0'>
                <button
                  type='button'
                  className='flex w-full items-start justify-between gap-4 text-left'
                  onClick={() =>
                    setOpenCompany(isExpanded ? '' : item.company)
                  }>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-2 leading-none text-white/92'>
                      <span className='text-white/42'>
                        {isExpanded ? '[-]' : '[+]'}
                      </span>
                      <span className='uppercase'>{item.company}</span>
                    </div>
                    {isExpanded ? (
                      <p className='mt-1.5 text-[0.64rem] uppercase tracking-[0.08em] text-white/42'>
                        {item.role}
                      </p>
                    ) : null}
                  </div>
                  <span className='shrink-0 pt-0.5 text-right text-[clamp(0.72rem,1.1vw,0.88rem)] text-white/55'>
                    {item.date}
                  </span>
                </button>

                {isExpanded ? (
                  <div className='mt-3 space-y-2 pl-7 sm:pl-8'>
                    <p className='text-[0.64rem] uppercase tracking-[0.08em] text-white/42'>
                      {item.location}
                    </p>
                    <ul className='space-y-2 text-[0.75rem] leading-5.5 text-white/72 sm:text-[0.8rem]'>
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className='flex gap-3'>
                          <span className='text-[#8faeff]'>$</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        <div className='pt-5'>
          <BackButton
            onClick={onClose}
            tone='light'
          />
        </div>
      </div>
    </div>
  );
}
