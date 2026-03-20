'use client';

import Link from 'next/link';
import type { KeyboardEvent, PointerEvent, RefObject } from 'react';

type CardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  cardContainerRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  profileName: string;
  profileRole: string;
  currentStudyTitle: string;
  canFlipCard: boolean;
  onCardToggle: () => void;
  onCardKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onResumeClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onContactClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Card({
  cardRef,
  cardContainerRef,
  isFlipped,
  profileName,
  profileRole,
  currentStudyTitle,
  canFlipCard,
  onCardToggle,
  onCardKeyDown,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onResumeClick,
  onContactClick,
}: CardProps) {
  return (
    <div ref={cardContainerRef} className="w-[min(90vw,420px)] [perspective:1600px] relative z-10">
      <div
        role="button"
        tabIndex={0}
        className="card-button"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onCardToggle}
        onKeyDown={onCardKeyDown}
        aria-label={isFlipped ? 'Show front of card' : 'Show back of card'}
        aria-disabled={!canFlipCard}
      >
        <div ref={cardRef} className="flip-card">
          <div className="noise-overlay" />

          <div className="card-face card-front">
            <div className="flex h-full flex-col justify-end">
              <div className="space-y-0.5 text-left">
                <h1 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                  {profileName.toUpperCase()}
                </h1>
                <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                  {profileRole.toUpperCase()}.
                </p>
                <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                  {currentStudyTitle}.
                </p>
              </div>
              <div className="absolute bottom-[clamp(1.75rem,4vw,2.5rem)] right-[clamp(1.75rem,4vw,2.5rem)] flex flex-col items-end space-y-0.5">
                <button
                  type="button"
                  className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                  onClick={onResumeClick}
                >
                  RESUME
                </button>
                <button
                  type="button"
                  className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                  onClick={onContactClick}
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="space-y-2 text-left">
                <div className="space-y-0.5">
                  <h2 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                    LEIBNIZ EDUCATION
                  </h2>
                  <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                    SOFTWARE ENGINEER.
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <h2 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                      TURFINDER*
                    </h2>
                    <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                      FOUNDER.
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-0.5">
                    <Link
                      href="/thoughts"
                      className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      THOUGHTS
                    </Link>
                    <a
                      href="https://github.com/rawnak-rr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GITHUB
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
