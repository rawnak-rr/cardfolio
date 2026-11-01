'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Card } from '@/app/components/card';
import { cardReturn } from '@/lib/card-return';
import { links } from '@/lib/data';

const TARGET_ENTER_PAD = 6;
const TARGET_EXIT_PAD = 14;

export function CardFolio() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStable, setCardStable] = useState(true);
  const [showHint, setShowHint] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const hoveredTarget = useRef<Element | null>(null);
  const levelTarget = useRef<Element | null>(null);
  const isRoutingClick = useRef(false);
  const isMousePointer = useRef(false);
  const isFlipping = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('hasFlipped')) {
      setShowHint(true);
    }
  }, []);

  useEffect(() => {
    router.prefetch(links.summary);
  }, [router]);

  useLayoutEffect(() => {
    const el = cardRef.current;
    const container = cardContainerRef.current;
    if (!el || !container) return;
    gsap.set(el, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1600,
      transformOrigin: '50% 50%',
    });

    if (cardReturn.pending) {
      isFlipping.current = true;
      setCardStable(false);
      gsap.set(container, { y: '-250%' });
      gsap.set(el, { rotateZ: 90 });

      const tl = gsap.timeline({
        onComplete: () => {
          cardReturn.pending = false;
          isFlipping.current = false;
          setCardStable(true);
        },
      });
      timelineRef.current = tl;
      tl.to(container, {
        y: '0%',
        duration: 0.6,
        ease: 'power2.out',
      }).to(
        el,
        {
          rotateZ: 0,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '-=0.1',
      );
    }

    return () => {
      gsap.killTweensOf(el);
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    const onPageShow = () => {
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
  }, []);

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

  const visibleFaceTargets = () => {
    const face = cardRef.current?.querySelector(
      isFlipped ? '.card-back' : '.card-front',
    );
    return face ? Array.from(face.querySelectorAll('a, button')) : [];
  };

  const isWithin = (
    target: Element,
    clientX: number,
    clientY: number,
    pad: number,
  ) => {
    const r = target.getBoundingClientRect();
    return (
      clientX >= r.left - pad &&
      clientX <= r.right + pad &&
      clientY >= r.top - pad &&
      clientY <= r.bottom + pad
    );
  };

  const targetUnder = (clientX: number, clientY: number, pad = 0) =>
    visibleFaceTargets().find((target) => isWithin(target, clientX, clientY, pad)) ??
    null;

  const levelTargetAt = (clientX: number, clientY: number) => {
    const held = levelTarget.current;
    if (held && isWithin(held, clientX, clientY, TARGET_EXIT_PAD)) return held;
    return targetUnder(clientX, clientY, TARGET_ENTER_PAD);
  };

  const markPointerOver = useCallback((target: Element | null) => {
    if (hoveredTarget.current === target) return;
    hoveredTarget.current?.removeAttribute('data-pointer-over');
    target?.setAttribute('data-pointer-over', '');
    hoveredTarget.current = target;
  }, []);

  const clearPointerTarget = useCallback(() => {
    markPointerOver(null);
    levelTarget.current = null;
  }, [markPointerOver]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isMousePointer.current || !cardRef.current || isFlipping.current) return;

    markPointerOver(targetUnder(e.clientX, e.clientY));

    levelTarget.current = levelTargetAt(e.clientX, e.clientY);

    if (levelTarget.current) {
      if (rotationState.current.tiltX || rotationState.current.tiltY) {
        rotationState.current.tiltX = 0;
        rotationState.current.tiltY = 0;
        gsap.to(cardRef.current, {
          rotateX: 0,
          rotateY: rotationState.current.base,
          duration: 0.24,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
      return;
    }

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
    clearPointerTarget();
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

  const animateCardExit = useCallback(
    (onComplete: () => void) => {
      const container = cardContainerRef.current;
      const card = cardRef.current;
      if (!container || !card) return false;

      isFlipping.current = true;
      clearPointerTarget();
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
    },
    [clearPointerTarget],
  );

  const handleLeaveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    const destination = e.currentTarget.getAttribute('href') ?? '/';
    if (!animateCardExit(() => router.push(destination))) {
      router.push(destination);
    }
  };

  const flipCard = (direction: 1 | -1) => {
    if (isFlipping.current) return;
    clearPointerTarget();
    rotationState.current.base += 180 * direction;
    setIsFlipped((f) => !f);
    if (showHint) {
      setShowHint(false);
      localStorage.setItem('hasFlipped', '1');
    }
    animateFlip();
  };

  const handleCardToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = targetUnder(e.clientX, e.clientY);
    if (target && !isRoutingClick.current) {
      isRoutingClick.current = true;
      target.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: e.clientX,
          clientY: e.clientY,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
        }),
      );
      isRoutingClick.current = false;
      return;
    }
    if (target) return;

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
        onCardToggle={handleCardToggle}
        onCardKeyDown={handleCardKeyDown}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onLeaveClick={handleLeaveClick}
      />
      <p className={`text-xs uppercase tracking-wide text-neutral-600 transition-opacity duration-300 ${
        showHint && cardStable ? 'opacity-100' : 'opacity-0'
      }`}>
        tap to flip
      </p>
    </main>
  );
}
