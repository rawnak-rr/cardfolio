'use client';

import type { KeyboardEvent, PointerEvent, RefObject } from 'react';

const headingClass =
  'text-base font-bold uppercase tracking-[0.08em] text-black/90';
const labelClass = 'text-sm uppercase tracking-[0.08em] text-black/50';
const linkClass =
  'dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer px-1 py-0.5';

type CardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  cardContainerRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  profileName: string;
  profileRole: string;
  currentStudyTitle: string;
  canFlipCard: boolean;
  onCardToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCardKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onWorkClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onContactClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onThoughtsClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  onWorkClick,
  onContactClick,
  onThoughtsClick,
}: CardProps) {
  return (
    <div
      ref={cardContainerRef}
      className='w-[min(90vw,420px)] perspective-[1600px] relative z-10'>
      <div
        role='button'
        tabIndex={0}
        className='card-button'
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onCardToggle}
        onKeyDown={onCardKeyDown}
        aria-label={isFlipped ? 'Show front of card' : 'Show back of card'}
        aria-disabled={!canFlipCard}>
        <div
          ref={cardRef}
          className='flip-card'>
          <div className='card-face card-front'>
            <div className='noise-overlay' />
            <div className='flex h-full flex-col justify-end'>
              <div className='space-y-0.5 text-left'>
                <h1 className={headingClass}>{profileName}</h1>
                <p className={labelClass}>
                  {profileRole.split(' ').map((word, i) => (
                    <span key={i}>
                      {i > 0 && ' '}
                      <span
                        className={
                          ['fullstack', 'unsw'].includes(word.toLowerCase())
                            ? 'font-bold text-black/90'
                            : ''
                        }>
                        {word.toUpperCase()}
                      </span>
                    </span>
                  ))}
                </p>
                <p className={labelClass}>
                  CompSci <span className='font-sans'>@</span>
                  <span className='font-bold text-black/90'>
                    {currentStudyTitle}
                  </span>
                </p>
              </div>
              <div className='absolute bottom-[clamp(1.75rem,4vw,2.5rem)] right-[clamp(1.75rem,4vw,2.5rem)] flex flex-col items-end space-y-0.5'>
                <button
                  type='button'
                  className={linkClass}
                  onClick={onWorkClick}>
                  WORK
                </button>
                <button
                  type='button'
                  className={linkClass}
                  onClick={onContactClick}>
                  CONTACT
                </button>
              </div>
            </div>
          </div>

          <div className='card-face card-back'>
            <div className='noise-overlay' />
            <div className='relative z-10 flex h-full flex-col justify-end'>
              <div className='space-y-2 text-left'>
                <div className='flex justify-between items-end'>
                  <div className='space-y-2 pointer-events-none select-none'>
                    <div className='space-y-0.5'>
                      <h2 className={headingClass}>
                        UNSW REDBACK RACING (Formula SAE)
                      </h2>
                      <p className={labelClass}>SOFTWARE ENGINEER</p>
                    </div>
                    <div className='space-y-0.5'>
                      <h2 className={headingClass}>LEIBNIZ EDUCATION</h2>
                      <p className={labelClass}>SOFTWARE ENGINEER</p>
                    </div>
                    <div className='space-y-0.5'>
                      <h2 className={headingClass}>TURFINDER</h2>
                      <p className={labelClass}>FOUNDER</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-end space-y-0.5'>
                    <button
                      type='button'
                      className={linkClass}
                      onClick={onThoughtsClick}>
                      THOUGHTS
                    </button>
                    <a
                      href='https://github.com/rawnak-rr'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='dotted-link text-sm uppercase tracking-[0.08em] text-black/50 px-1 py-0.5'
                      onClick={(e) => e.stopPropagation()}>
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
