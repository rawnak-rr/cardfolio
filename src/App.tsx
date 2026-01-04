import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile, sideProjects, studies } from './data';

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rotationState = useRef({ base: 0, tiltX: 0, tiltY: 0 });
  const isMousePointer = useRef(false);

  const featuredProject = sideProjects[0];
  const currentStudy = studies.find((s) => s.current) ?? studies[0];

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

  useEffect(() => {
    if (!cardRef.current) return;
    rotationState.current.base = isFlipped ? 180 : 0;
    gsap.to(cardRef.current, {
      rotateY: rotationState.current.base + rotationState.current.tiltY,
      duration: 1.1,
      ease: 'power4.inOut',
      overwrite: 'auto',
    });
  }, [isFlipped]);

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-redhatmono gap-6 px-6 py-12">
      <div className="w-[min(90vw,420px)] [perspective:1600px]">
        <button
          type="button"
          className="card-button"
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={() => setIsFlipped((f) => !f)}
          aria-label={isFlipped ? 'Show front of card' : 'Show back of card'}
        >
          <div ref={cardRef} className="flip-card">
            <div className="noise-overlay" />

            <div className="card-face card-front">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                    {profile.name}
                  </h1>
                  <p className="text-lg uppercase tracking-[0.35em] text-white/85">
                    {profile.role}
                  </p>
                </div>
                <div className="space-y-5 text-sm text-white/90">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <p className="mt-2 text-xl font-semibold uppercase tracking-tight">
                        {currentStudy?.title ?? 'UNSW'}
                      </p>
                    </div>
                    <div>
                      <p className="mt-2 text-base font-semibold">contact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-face card-back">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {featuredProject?.title ?? 'turFinder*'}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-white/85">
                  {featuredProject?.desc ?? 'Reimagining connections through sports.'}
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
      <p className="text-sm uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-500">
        tap or click to flip
      </p>
    </main>
  );
}
