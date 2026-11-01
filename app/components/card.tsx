"use client";

import type { KeyboardEvent, MouseEvent, PointerEvent, RefObject } from "react";
import { useCopyEmail } from "@/app/components/use-copy-email";
import { links, profile } from "@/lib/data";

const textClass = "text-base text-black";
const linkClass = "dotted-link text-base text-black px-1 py-0.5";

type CardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  cardContainerRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  onCardToggle: (e: MouseEvent<HTMLDivElement>) => void;
  onCardKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  onLeaveClick: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function Card({
  cardRef,
  cardContainerRef,
  isFlipped,
  onCardToggle,
  onCardKeyDown,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onLeaveClick,
}: CardProps) {
  const email = useCopyEmail();

  const handleCopyEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    email.copy();
  };

  return (
    <div ref={cardContainerRef} className="w-[min(90vw,420px)] relative z-10">
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
      >
        <div ref={cardRef} className="flip-card">
          <div className="card-face card-front">
            <div className="grid h-full grid-cols-[1fr_auto] items-end gap-2">
              <div className="space-y-0.5 text-left">
                <h1 className={textClass}>{profile.name}</h1>
                <p className={textClass}>{profile.role}</p>
              </div>
              <p className={`${textClass} max-w-36 text-right`}>
                compsci <span className="font-sans">@</span>
                {profile.study}
              </p>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="relative z-10 flex h-full items-end justify-between">
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  className={`${linkClass} cursor-pointer`}
                  onClick={handleCopyEmail}
                >
                  {email.copied ? "copied!" : profile.email}
                </button>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                  onClick={(e) => e.stopPropagation()}
                >
                  github.com/rawnak-rr
                </a>
              </div>
              <a href={links.summary} className={linkClass} onClick={onLeaveClick}>
                open →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
