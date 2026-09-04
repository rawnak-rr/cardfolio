'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Card } from '@/app/components/card';
import { Contact } from '@/app/components/contact';
import { Work } from '@/app/components/work';

type Panel = 'contact' | 'work' | null;

/** Slack around a link before the card levels out for it, and before it tilts again. */
const TARGET_ENTER_PAD = 6;
const TARGET_EXIT_PAD = 14;

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
  const hoveredTarget = useRef<Element | null>(null);
  const levelTarget = useRef<Element | null>(null);
  const isRoutingClick = useRef(false);
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

  /** The links and buttons on whichever face is currently facing the viewer. */
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

  /**
   * The target under the pointer, measured against the rects rather than read off the
   * event: the browser's own hit-testing is the thing that breaks while the card is
   * tilted, so it can't be trusted to answer this.
   */
  const targetUnder = (clientX: number, clientY: number, pad = 0) =>
    visibleFaceTargets().find((target) => isWithin(target, clientX, clientY, pad)) ??
    null;

  /**
   * The target the card should sit level for. The zone is padded, and holds on to the
   * previous target until the pointer is clearly away from it, so sweeping across the
   * stacked links doesn't switch the tilt on and off repeatedly.
   */
  const levelTargetAt = (clientX: number, clientY: number) => {
    const held = levelTarget.current;
    if (held && isWithin(held, clientX, clientY, TARGET_EXIT_PAD)) return held;
    return targetUnder(clientX, clientY, TARGET_ENTER_PAD);
  };

  /**
   * Drives the hover styling ourselves. The browser resolves `:hover` with the same
   * unreliable hit test, and only re-resolves it on the next pointer move, so its
   * state can sit stale on the card after we level out.
   */
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

    // Chrome hit-tests unreliably through a tilted preserve-3d subtree: with any tilt
    // applied, roughly a third of each link's box resolves to the card itself. Ease
    // the card level while the pointer is on a target so the browser can resolve it
    // again. Clicks that land mid-ease are recovered in handleCardToggle, so this can
    // stay on the same timing as the tilt itself rather than snapping flat.
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

  /**
   * Spins the card upright then flings it off the top of the screen. Used both when
   * opening a panel and when leaving for the external thoughts site. Returns false
   * when the card isn't mounted yet, so callers can fall back to no animation.
   */
  const animateCardExit = useCallback(
    (onComplete: () => void) => {
      const container = cardContainerRef.current;
      const card = cardRef.current;
      if (!container || !card) return false;

      // Marks the card as animating so pointer tilt/reset tweens don't overwrite the
      // exit timeline's rotation while it plays.
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
    const tl = gsap.timeline({
      onComplete: () => {
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
    // A click that lands on a link while the card is tilted can be handed to the card
    // instead of the link, which would flip the card out from under the pointer. Send
    // it on to whatever was really under the cursor rather than acting on it here.
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
      <p className={`text-xs uppercase tracking-wide text-neutral-600 transition-opacity duration-300 ${
        showHint && cardStable ? 'opacity-100' : 'opacity-0'
      }`}>
        tap to flip
      </p>
      <Contact isOpen={activePanel === 'contact'} onClose={handleClosePanel} />
      <Work isOpen={activePanel === 'work'} onClose={handleClosePanel} />
    </main>
  );
}
