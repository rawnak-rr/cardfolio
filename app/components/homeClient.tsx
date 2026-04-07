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

type HomeClientProps = {
  workItems: WorkItem[];
};

export function HomeClient({ workItems }: HomeClientProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const isMousePointer = useRef(false);

  const currentStudy = studies.find((s) => s.current) ?? studies[0];
  const canFlipCard = !showThoughts && !showContact && !showWork;

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.set(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1600,
      transformOrigin: '50% 50%',
    });
    return () => {
      if (cardRef.current) gsap.killTweensOf(cardRef.current);
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

  const openPanel = (onComplete: () => void) => {
    if (!cardContainerRef.current || !cardRef.current) return;

    const tl = gsap.timeline({ onComplete });

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

  const handleWorkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPanel(() => setShowWork(true));
  };

  const handleThoughtsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPanel(() => setShowThoughts(true));
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openPanel(() => setShowContact(true));
  };

  const handleClosePanel = () => {
    if (!cardContainerRef.current || !cardRef.current) return;

    setShowThoughts(false);
    setShowContact(false);
    setShowWork(false);

    const tl = gsap.timeline();

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
        onWorkClick={handleWorkClick}
        onContactClick={handleContactClick}
        onThoughtsClick={handleThoughtsClick}
      />
      <Thoughts isOpen={showThoughts} content={noteContent} onClose={handleClosePanel} />
      <Contact
        isOpen={showContact}
        emailCopied={emailCopied}
        onCopyEmail={() => {
          navigator.clipboard.writeText('rawnakd11@gmail.com');
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 2000);
        }}
        onClose={handleClosePanel}
      />
      <Work isOpen={showWork} items={workItems} onClose={handleClosePanel} />
    </main>
  );
}
