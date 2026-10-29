'use client';

import { useState } from 'react';
import { workItems } from '@/lib/data';

export function Work() {
  const [openCompany, setOpenCompany] = useState(workItems[0]?.company ?? '');

  return (
    <div className="space-y-8">
      {workItems.map((item) => {
        const isExpanded = item.company === openCompany;
        const summaryId = `work-${item.company.replace(/\W+/g, '-').toLowerCase()}`;

        return (
          <section key={item.company}>
            <button
              type="button"
              className="grid w-full cursor-pointer grid-cols-[1rem_minmax(0,1fr)_auto] gap-x-3 gap-y-1 text-left"
              aria-expanded={isExpanded}
              aria-controls={summaryId}
              onClick={() => setOpenCompany(isExpanded ? '' : item.company)}
            >
              <span className="text-muted">{isExpanded ? '–' : '+'}</span>
              <span className="text-[0.95rem] text-ink">{item.company}</span>
              <span className="text-[0.7rem] text-muted">{item.date}</span>
              <span />
              <span className="text-[0.8rem] text-muted">{item.role}</span>
            </button>

            <div
              id={summaryId}
              className="tree-children"
              data-collapsed={!isExpanded}
              inert={!isExpanded}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="mb-0 ml-7 mt-4 text-[0.95rem] leading-[1.85] text-body">
                  {item.summary}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
