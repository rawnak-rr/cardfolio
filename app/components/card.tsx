"use client";

import type { KeyboardEvent, MouseEvent, PointerEvent, RefObject } from "react";
import { links, profile, workItems } from "@/lib/data";

const headingClass = "text-base font-bold uppercase text-black";
const labelClass = "text-sm uppercase text-black/50";
const linkClass = "dotted-link text-sm uppercase  text-black/50 px-1 py-0.5";
const buttonLinkClass = `${linkClass} border-0 cursor-pointer`;

const emphasized = new Set(profile.roleEmphasis.map((w) => w.toLowerCase()));

type CardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  cardContainerRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  canFlipCard: boolean;
  onCardToggle: (e: MouseEvent<HTMLDivElement>) => void;
  onCardKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onWorkClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onContactClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onThoughtsClick: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function Card({
  cardRef,
  cardContainerRef,
  isFlipped,
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
      className="w-[min(90vw,420px)] perspective-[1600px] relative z-10"
    >
      <div
        role="button"
        tabIndex={0}
        className="card-button"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onCardToggle}
        onKeyDown={onCardKeyDown}
        aria-label={isFlipped ? "Show front of card" : "Show back of card"}
        aria-disabled={!canFlipCard}
      >
        <div ref={cardRef} className="flip-card">
          <div className="card-face card-front">
            <div className="noise-overlay" />
            <div className="flex h-full flex-col justify-end">
              <div className="space-y-0.5 text-left">
                <h1 className={headingClass}>{profile.name}</h1>
                <p className={labelClass}>
                  {profile.role.split(" ").map((word, i) => (
                    <span key={i}>
                      {i > 0 && " "}
                      <span
                        className={
                          emphasized.has(word.toLowerCase())
                            ? "font-bold text-black/90"
                            : ""
                        }
                      >
                        {word.toUpperCase()}
                      </span>
                    </span>
                  ))}
                </p>
                <p className={labelClass}>
                  CompSci <span className="font-sans">@</span>
                  <span className="font-bold text-black/90">
                    {profile.study}
                  </span>
                </p>
              </div>
              <div className="absolute bottom-[clamp(1.75rem,4vw,2.5rem)] right-[clamp(1.75rem,4vw,2.5rem)] flex flex-col items-end space-y-0.5">
                <button
                  type="button"
                  className={buttonLinkClass}
                  onClick={onWorkClick}
                >
                  WORK
                </button>
                <button
                  type="button"
                  className={buttonLinkClass}
                  onClick={onContactClick}
                >
                  CONTACT
                </button>
              </div>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="noise-overlay" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-end">
                  <div className="space-y-2 pointer-events-none select-none">
                    {workItems.map((item) => (
                      <div key={item.company} className="space-y-0.5">
                        <h2 className={headingClass}>
                          {(item.shortCompany ?? item.company).toUpperCase()}
                        </h2>
                        <p className={labelClass}>
                          {(item.shortRole ?? item.role).toUpperCase()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end space-y-0.5">
                    <a
                      href={links.thoughts}
                      className={linkClass}
                      onClick={onThoughtsClick}
                    >
                      THOUGHTS
                    </a>
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
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
