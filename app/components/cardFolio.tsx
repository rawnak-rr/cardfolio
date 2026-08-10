'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Card } from '@/app/components/card';
import { Contact } from '@/app/components/contact';
import { Work } from '@/app/components/work';

type Panel = 'contact' | 'work' | null;

type CardFolioProps = {
  initialPanel?: Panel;
};

export function CardFolio({ initialPanel = null }: CardFolioProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activePanel, setActivePanel] = useState<Panel>(initialPanel);
  const [cardStable, setCardStable] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const isMousePointer = useRef(false);
  const isFlipping = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const canFlipCard = activePanel === null;

  useEffect(() => {
    if (!localStorage.getItem('hasFlipped')) {
      setShowHint(true);
    }
  }, []);

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

  /**
   * Spins the card upright then flings it off the top of the screen. Used both when
   * opening a panel and when leaving for the external thoughts site. Returns false
   * when the card isn't mounted yet, so callers can fall back to no animation.
   */
  const animateCardExit = useCallback((onComplete: () => void) => {
    const container = cardContainerRef.current;
    const card = cardRef.current;
    if (!container || !card) return false;

    setCardStable(false);
    timelineRef.current?.kill();
    const tl = gsap.timeline({ onComplete });
    timelineRef.current = tl;

    tl.to(card, {
      rotateX: 0,
      rotateY: rotationState.current.base,
      rotateZ: 90,
      duration: 0.6,
      ease: 'power3.inOut',
    }).to(
      container,
      {
        y: '-250%',
        duration: 0.6,
        ease: 'power2.in',
      },
      '-=0.1',
    );

    return true;
  }, []);

  const animateOpenPanel = useCallback(
    (panel: Panel) => {
      animateCardExit(() => setActivePanel(panel));
    },
    [animateCardExit],
  );

  const animateClosePanel = useCallback(() => {
    const container = cardContainerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    setActivePanel(null);

    timelineRef.current?.kill();
    const tl = gsap.timeline({ onComplete: () => setCardStable(true) });
    timelineRef.current = tl;

    tl.to(container, {
      y: '0%',
      duration: 0.6,
      ease: 'power2.out',
    }).to(
      card,
      {
        rotateZ: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      },
      '-=0.1',
    );
  }, []);

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
  }, [animateOpenPanel, animateClosePanel]);

  const openPanel = (panel: Panel) => (e: React.MouseEvent) => {
    e.stopPropagation();
    history.pushState({ panel }, '', `/${panel}`);
    animateOpenPanel(panel);
  };

  const handleThoughtsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    const destination = e.currentTarget.href;
    if (!animateCardExit(() => window.location.assign(destination))) {
      window.location.assign(destination);
    }
  };

  const handleClosePanel = () => {
    history.back();
  };

  const flipCard = (direction: 1 | -1) => {
    if (!canFlipCard || isFlipping.current) return;
    rotationState.current.base += 180 * direction;
    setIsFlipped((f) => !f);
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('hasFlipped', '1');
    }
    animateFlip();
  };

  const handleCardToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    flipCard(x < 0.5 ? -1 : 1);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    flipCard(1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 overflow-hidden">
      <Card
        cardRef={cardRef}
        cardContainerRef={cardContainerRef}
        isFlipped={isFlipped}
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
      <Work isOpen={activePanel === 'work'} onClose={handleClosePanel} />
    </main>
  );
}
