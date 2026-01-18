import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile, sideProjects, studies } from './data';

// Pursuits data
const pursuitsCategories = [
  { id: 'games', title: 'Games' },
  { id: 'books', title: 'Books' },
  { id: 'movies', title: 'Movies' },
  { id: 'music', title: 'Music' },
  { id: 'art', title: 'Art' },
];

// Sample content for each category (you can expand this)
const pursuitsContent: Record<string, string[]> = {
  games: [
    'Dark Souls series - mastering patience and perseverance',
    'Hollow Knight - art direction perfection',
    'Celeste - storytelling through gameplay',
  ],
  books: [
    'Gödel, Escher, Bach - consciousness and self-reference',
    'The Pragmatic Programmer - timeless dev wisdom',
    'Dune - world-building at its finest',
  ],
  movies: [
    'Blade Runner 2049 - visual poetry',
    'Arrival - language shapes thought',
    'Stalker - atmospheric storytelling',
  ],
  music: [
    'Radiohead - experimental soundscapes',
    'Nujabes - lo-fi before it was a genre',
    'Boards of Canada - nostalgic electronics',
  ],
  art: [
    'Beksinski - surreal nightmares',
    'Moebius - sci-fi linework',
    'Hiroshi Yoshida - woodblock serenity',
  ],
};

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPursuits, setShowPursuits] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
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

  const handlePursuitsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardContainerRef.current || !cardRef.current) return;

    // Animate card: rotate to vertical and slide up like ATM insertion
    const tl = gsap.timeline({
      onComplete: () => setShowPursuits(true)
    });

    tl.to(cardRef.current, {
      rotateX: 0,
      rotateY: rotationState.current.base,
      rotateZ: 90,
      duration: 0.6,
      ease: 'power3.inOut',
    })
    .to(cardContainerRef.current, {
      y: '-250%',
      duration: 0.6,
      ease: 'power2.in',
    }, '-=0.1');
  };

  const handleClosePursuits = () => {
    if (!cardContainerRef.current || !cardRef.current) return;

    // Hide pursuits first, then animate card back
    setShowPursuits(false);
    setSelectedCategory(null);

    // Reverse animation: slide down, then rotate back
    const tl = gsap.timeline();

    // Slide down (reverse of slide up)
    tl.to(cardContainerRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'power2.out',
    })
    // Then rotate back to horizontal (reverse of rotate to vertical)
    .to(cardRef.current, {
      rotateZ: 0,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '-=0.1');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-mono gap-6 px-6 py-12 overflow-hidden">
      <div ref={cardContainerRef} className="w-[min(90vw,420px)] [perspective:1600px] relative z-10">
        <button
          type="button"
          className="card-button"
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={() => !showPursuits && setIsFlipped((f) => !f)}
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
                      <button
                        type="button"
                        className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                        onClick={handlePursuitsClick}
                      >
                        PURSUITS
                      </button>
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

      {/* Pursuits Panel - thoughts-style UI */}
      <div
        className={`pursuits-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
          showPursuits ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-2xl px-4 sm:px-6 md:px-8 py-8">
          <header className="text-xl">
            <div>pursuits</div>
            <div className="my-4">-</div>
          </header>

          {!selectedCategory ? (
            // Category list
            <main>
              <div className="space-y-1">
                {pursuitsCategories.map((cat, i) => (
                  <div key={cat.id} className="text-lg">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="hover:underline bg-transparent border-0 text-white cursor-pointer p-0 text-lg text-left"
                    >
                      {String(i).padStart(2, '0')}. {cat.title}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleClosePursuits}
                  className="underline bg-transparent border-0 text-white cursor-pointer p-0"
                >
                  ../
                </button>
              </div>
            </main>
          ) : (
            // Category content
            <main>
              <div className="text-xl">
                # {pursuitsCategories.find((c) => c.id === selectedCategory)?.title.toLowerCase()}
              </div>
              <div className="my-4">-</div>
              <div className="space-y-3">
                {pursuitsContent[selectedCategory]?.map((item, i) => (
                  <div key={i} className="text-base leading-relaxed">
                    {String(i).padStart(2, '0')}. {item}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="underline bg-transparent border-0 text-white cursor-pointer p-0"
                >
                  ../
                </button>
              </div>
            </main>
          )}
        </div>
      </div>
    </main>
  );
}
