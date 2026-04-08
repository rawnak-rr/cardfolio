'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Card } from '@/app/components/card';
import { Contact } from '@/app/components/contact';
import { Thoughts } from '@/app/components/thoughts';
import { Work } from '@/app/components/work';
import { profile, studies } from '@/src/data';
import { noteContent } from '@/src/noteContent';
import type { WorkItem } from '@/src/work';

type Panel = 'thoughts' | 'contact' | 'work' | null;

type HomeClientProps = {
  workItems: WorkItem[];
};

export function HomeClient({ workItems }: HomeClientProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const isMousePointer = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const currentStudy = studies.find((s) => s.current) ?? studies[0];
  const canFlipCard = activePanel === null;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1600,
      transformOrigin: '50% 50%',
    });
    return () => {
      gsap.killTweensOf(el);
      timelineRef.current?.kill();
    };
  }, []);

  const animateFlip = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: rotationState.current.base + rotationState.current.tiltY,
      duration: 1.1,
      ease: 'power4.inOut',
      overwrite: 'auto',
    });
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    isMousePointer.current = e.pointerType === 'mouse';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isMousePointer.current || !cardRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    const tiltY = (x - 0.5) * 10;
    const tiltX = (0.5 - y) * 6;
    rotationState.current.tiltX = tiltX;
    rotationState.current.tiltY = tiltY;
    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: rotationState.current.base + tiltY,
      duration: 0.24,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handlePointerLeave = () => {
    isMousePointer.current = false;
    if (!cardRef.current) return;
    rotationState.current.tiltX = 0;
    rotationState.current.tiltY = 0;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: rotationState.current.base,
      duration: 0.42,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const openPanel = (panel: Panel) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardContainerRef.current || !cardRef.current) return;

    timelineRef.current?.kill();
    const tl = gsap.timeline({ onComplete: () => setActivePanel(panel) });
    timelineRef.current = tl;

    tl.to(cardRef.current, {
      rotateX: 0,
      rotateY: rotationState.current.base,
      rotateZ: 90,
      duration: 0.6,
      ease: 'power3.inOut',
    }).to(
      cardContainerRef.current,
      {
        y: '-250%',
        duration: 0.6,
        ease: 'power2.in',
      },
      '-=0.1',
    );
  };

  const handleClosePanel = () => {
    if (!cardContainerRef.current || !cardRef.current) return;

    setActivePanel(null);

    timelineRef.current?.kill();
    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(cardContainerRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'power2.out',
    }).to(
      cardRef.current,
      {
        rotateZ: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '-=0.1',
    );
  };

  const handleCardToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canFlipCard) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const direction = x < 0.5 ? -1 : 1;
    rotationState.current.base += 180 * direction;
    setIsFlipped((f) => !f);
    animateFlip();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (!canFlipCard) return;
    rotationState.current.base += 180;
    setIsFlipped((f) => !f);
    animateFlip();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-mono gap-6 px-6 py-12 overflow-hidden">
      <Card
        cardRef={cardRef}
        cardContainerRef={cardContainerRef}
        isFlipped={isFlipped}
        profileName={profile.name}
        profileRole={profile.role}
        currentStudyTitle={currentStudy?.title ?? 'UNSW'}
        canFlipCard={canFlipCard}
        onCardToggle={handleCardToggle}
        onCardKeyDown={handleCardKeyDown}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onWorkClick={openPanel('work')}
        onContactClick={openPanel('contact')}
        onThoughtsClick={openPanel('thoughts')}
      />
      <Thoughts isOpen={activePanel === 'thoughts'} content={noteContent} onClose={handleClosePanel} />
      <Contact isOpen={activePanel === 'contact'} onClose={handleClosePanel} />
      <Work isOpen={activePanel === 'work'} items={workItems} onClose={handleClosePanel} />
    </main>
  );
}
