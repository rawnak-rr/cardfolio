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
    <main className="min-h-screen flex flex-col items-center justify-center font-mono gap-6 px-6 py-12">
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
              <div className="flex h-full flex-col justify-end">
                <div className="space-y-0.5 text-left">
                  <h1 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                    {profile.name.toUpperCase()}
                  </h1>
                  <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                    {profile.role.toUpperCase()}.
                  </p>
                  <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                    {currentStudy?.title ?? 'UNSW'}.
                  </p>
                </div>
                <a
                  href="mailto:rawnak@example.com"
                  className="dotted-link absolute bottom-[clamp(1.75rem,4vw,2.5rem)] right-[clamp(1.75rem,4vw,2.5rem)] text-sm uppercase tracking-[0.08em] text-black/50"
                  onClick={(e) => e.stopPropagation()}
                >
                  CONTACT
                </a>
              </div>
            </div>

            <div className="card-face card-back">
              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="space-y-2 text-left">
                  <div className="space-y-0.5">
                    <h2 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                      LEIBNIZ EDUCATION
                    </h2>
                    <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                      SOFTWARE ENGINEER.
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5">
                      <h2 className="text-base font-bold uppercase tracking-[0.08em] text-black/90">
                        TURFINDER*
                      </h2>
                      <p className="text-sm uppercase tracking-[0.08em] text-black/50">
                        FOUNDER.
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-0.5">
                      <a
                        href="#"
                        className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        PURSUITS
                      </a>
                      <a
                        href="https://github.com/rawnak-rr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50"
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
        </button>
      </div>
    </main>
  );
}
