"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent, RefObject } from "react";
import { links, profile } from "@/lib/data";

const headingClass = "text-sm text-black";
const labelClass = "text-sm text-black";
const linkClass = "dotted-link text-sm text-black px-1 py-0.5";

type CardProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  cardContainerRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  onCardToggle: (e: MouseEvent<HTMLDivElement>) => void;
  onCardKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  onPointerEnter: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
  /** The OPEN link: plays the card's exit before navigating into the site. */
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
  const [emailCopied, setEmailCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    };
  }, []);

  const handleCopyEmail = (e: MouseEvent<HTMLButtonElement>) => {
    // Keep the click from reaching the card, which would flip it.
    e.stopPropagation();
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setEmailCopied(false), 2000);
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
            <div className="flex h-full flex-col justify-end">
              <div className="space-y-0.5 text-left">
                <h1 className={headingClass}>{profile.name}</h1>
                <p className={labelClass}>{profile.role}</p>
                <p className={labelClass}>
                  compsci <span className="font-sans">@</span>
                  {profile.study}
                </p>
              </div>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="relative z-10 flex h-full items-end justify-between">
              <button
                type="button"
                className={`${linkClass} cursor-pointer bg-transparent`}
                onClick={handleCopyEmail}
              >
                {emailCopied ? "copied!" : profile.email}
              </button>
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
