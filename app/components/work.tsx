'use client';

import { useState } from 'react';
import { Panel } from '@/app/components/panel';
import { workItems } from '@/lib/data';

type WorkProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Work({ isOpen, onClose }: WorkProps) {
  const [openCompany, setOpenCompany] = useState('');

  return (
    <Panel isOpen={isOpen} onClose={onClose} background='bg-[#050505]'>
      <div className='flex-1 space-y-4 overflow-y-auto pr-1'>
        {workItems.map((item) => {
          const isExpanded = item.company === openCompany;

          return (
            <section
              key={item.company}
              className='border-b border-white/10 pb-4 last:border-b-0'>
              <button
                type='button'
                className='w-full text-left'
                aria-expanded={isExpanded}
                onClick={() => setOpenCompany(isExpanded ? '' : item.company)}>
                <div className='flex items-baseline justify-between gap-4 text-sm'>
                  <div className='flex min-w-0 items-baseline gap-2 text-white/92'>
                    <span className='shrink-0 whitespace-nowrap text-xs text-white/42'>
                      {isExpanded ? '[-]' : '[+]'}
                    </span>
                    <span className='uppercase'>{item.company}</span>
                  </div>
                  <span className='shrink-0 text-xs text-white/42'>
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
    </Panel>
  );
}
