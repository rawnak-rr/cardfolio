'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Card } from '@/app/components/card';
import { Contact } from '@/app/components/contact';
import { Work } from '@/app/components/work';
import { profile, studies } from '@/lib/data';
import type { WorkItem } from '@/lib/data';

type Panel = 'contact' | 'work' | null;

type CardFolioProps = {
  workItems: WorkItem[];
  initialPanel?: Panel;
};

export function CardFolio({ workItems, initialPanel = null }: CardFolioProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>(initialPanel);
  const [cardStable, setCardStable] = useState(true);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('hasFlipped')) {
      setShowHint(true);
    }
  }, []);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const isMousePointer = useRef(false);
  const isFlipping = useRef(false);
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

  // A back-navigation from the external thoughts site can restore this page from
  // bfcache with the exit animation's inline transforms still applied, leaving the
  // card parked off-screen. Put it back where it belongs whenever the page is shown.
  useEffect(() => {
    const onPageShow = () => {
      if (activePanel !== null) return;
      timelineRef.current?.kill();
      isFlipping.current = false;
      if (cardContainerRef.current) {
        gsap.set(cardContainerRef.current, { y: '0%' });
      }
      if (cardRef.current) {
        gsap.set(cardRef.current, {
          rotateX: 0,
          rotateY: rotationState.current.base,
          rotateZ: 0,
        });
      }
      setCardStable(true);
    };

    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [activePanel]);

  const animateFlip = () => {
    if (!cardRef.current) return;
    isFlipping.current = true;
    setCardStable(false);
    gsap.to(cardRef.current, {
      rotateY: rotationState.current.base + rotationState.current.tiltY,
      duration: 1.1,
      ease: 'power4.inOut',
      overwrite: 'auto',
      onComplete: () => {
        isFlipping.current = false;
        setCardStable(true);
      },
    });
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    isMousePointer.current = e.pointerType === 'mouse';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isMousePointer.current || !cardRef.current || isFlipping.current) return;
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
    const wasMouse = isMousePointer.current;
    isMousePointer.current = false;
    if (!wasMouse || !cardRef.current || isFlipping.current) return;
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

  const animateOpenPanel = (panel: Panel) => {
    if (!cardContainerRef.current || !cardRef.current) return;

    setCardStable(false);
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

  const animateClosePanel = () => {
    if (!cardContainerRef.current || !cardRef.current) return;

    setActivePanel(null);

    timelineRef.current?.kill();
    const tl = gsap.timeline({ onComplete: () => setCardStable(true) });
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

  const openPanel = (panel: Panel) => (e: React.MouseEvent) => {
    e.stopPropagation();
    history.pushState({ panel }, '', `/${panel}`);
    animateOpenPanel(panel);
  };

  const handleThoughtsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    if (!cardContainerRef.current || !cardRef.current) {
      window.location.assign(e.currentTarget.href);
      return;
    }

    const destination = e.currentTarget.href;
    setCardStable(false);
    timelineRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => window.location.assign(destination),
    });
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
    history.back();
  };

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const panel = (e.state?.panel as Panel) ?? null;
      if (panel) {
        animateOpenPanel(panel);
      } else {
        animateClosePanel();
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  });

  const handleCardToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canFlipCard || isFlipping.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const direction = x < 0.5 ? -1 : 1;
    rotationState.current.base += 180 * direction;
    setIsFlipped((f) => !f);
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('hasFlipped', '1');
    }
    animateFlip();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (!canFlipCard || isFlipping.current) return;
    rotationState.current.base += 180;
    setIsFlipped((f) => !f);
    animateFlip();
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 overflow-hidden">
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
        onThoughtsClick={handleThoughtsClick}
      />
      <p className={`text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-600 transition-opacity duration-300 ${
        showHint && cardStable ? 'opacity-100' : 'opacity-0'
      }`}>
        tap to flip
      </p>
      <Contact isOpen={activePanel === 'contact'} onClose={handleClosePanel} />
      <Work isOpen={activePanel === 'work'} items={workItems} onClose={handleClosePanel} />
    </main>
  );
}
