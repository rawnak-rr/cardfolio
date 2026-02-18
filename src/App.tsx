import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile, sideProjects, studies, experience } from './data';
import { noteContent } from './noteContent';

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
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

  const handleNoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardContainerRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setShowNote(true)
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

  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardContainerRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setShowResume(true)
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

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardContainerRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setShowContact(true)
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

  const handleClosePanel = () => {
    if (!cardContainerRef.current || !cardRef.current) return;

    setShowNote(false);
    setShowContact(false);
    setShowResume(false);

    const tl = gsap.timeline();

    tl.to(cardContainerRef.current, {
      y: '0%',
      duration: 0.6,
      ease: 'power2.out',
    })
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
          onClick={() => !showNote && !showContact && !showResume && setIsFlipped((f) => !f)}
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
                <div className="absolute bottom-[clamp(1.75rem,4vw,2.5rem)] right-[clamp(1.75rem,4vw,2.5rem)] flex flex-col items-end space-y-0.5">
                  <button
                    type="button"
                    className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                    onClick={handleResumeClick}
                  >
                    RESUME
                  </button>
                  <button
                    type="button"
                    className="dotted-link text-sm uppercase tracking-[0.08em] text-black/50 bg-transparent border-0 cursor-pointer p-0"
                    onClick={handleContactClick}
                  >
                    CONTACT
                  </button>
                </div>
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
                        onClick={handleNoteClick}
                      >
                        THOUGHTS
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

      {/* Note Panel */}
      <div
        className={`note-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
          showNote ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-md px-6 flex flex-col gap-8">
          <p className="text-sm leading-relaxed tracking-wide">
            {noteContent}
          </p>
          <button
            type="button"
            onClick={handleClosePanel}
            className="self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm"
          >
            ../
          </button>
        </div>
      </div>
      {/* Contact Panel */}
      <div
        className={`note-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
          showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-md px-6 flex flex-col gap-8">
          <div className="space-y-4 text-sm tracking-wide">
            <button
              type="button"
              className="block text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0 text-sm tracking-wide font-[inherit]"
              onClick={() => {
                navigator.clipboard.writeText('rawnakd11@gmail.com');
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
            >
              {emailCopied ? 'copied!' : 'rawnakd11@gmail.com'}
            </button>
            <a
              href="https://www.linkedin.com/in/xdef"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/80 hover:text-white transition-colors"
            >
              linkedin.com/in/xdef
            </a>
            <a
              href="https://www.instagram.com/dewepto/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/80 hover:text-white transition-colors"
            >
              instagram.com/dewepto
            </a>
          </div>
          <button
            type="button"
            onClick={handleClosePanel}
            className="self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm"
          >
            ../
          </button>
        </div>
      </div>
      {/* Resume Panel */}
      <div
        className={`note-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-start justify-center overflow-y-auto ${
          showResume ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-lg w-full px-6 py-16 flex flex-col gap-10">
          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">Summary</h2>
            <p className="text-sm leading-relaxed tracking-wide text-white/80">
              Full-stack software developer with experience in React, Next and Python. Skilled in UI/UX wireframing with Figma and passionate about creative work.
            </p>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">Education</h2>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold tracking-wide text-white/90">University of New South Wales</span>
              <span className="text-xs text-white/50 tracking-wide">Feb 2025 – Jan 2028</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs italic text-white/60 tracking-wide">Bachelor of Science in Computer Science</span>
              <span className="text-xs text-white/50 tracking-wide">Sydney, Australia</span>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">Tech Stack</h2>
            <p className="text-xs text-white/80 tracking-wide"><span className="font-bold text-white/90">Languages:</span> C, Python, JavaScript, TypeScript, SQL, HTML/CSS</p>
            <p className="text-xs text-white/80 tracking-wide"><span className="font-bold text-white/90">Frameworks:</span> React, Spring Boot, Tailwind, GSAP</p>
            <p className="text-xs text-white/80 tracking-wide"><span className="font-bold text-white/90">Tools:</span> Git, Docker, AWS, Vercel, Figma</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">Experience</h2>
            {experience.map((job) => (
              <div key={job.company} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold tracking-wide text-white/90">{job.company}</span>
                  <span className="text-xs text-white/50 tracking-wide">{job.date}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs italic text-white/60 tracking-wide">{job.role}</span>
                  <span className="text-xs text-white/50 tracking-wide">{job.location}</span>
                </div>
                <ul className="space-y-0.5 pl-3">
                  {job.points.map((point, i) => (
                    <li key={i} className="text-xs text-white/70 tracking-wide">• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">Activities</h2>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold tracking-wide text-white/90">Cyclops Legion</span>
                <span className="text-xs text-white/50 tracking-wide">Dec 2020 – Aug 2022</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs italic text-white/60 tracking-wide">Player</span>
                <span className="text-xs text-white/50 tracking-wide">Singapore</span>
              </div>
              <ul className="space-y-0.5 pl-3">
                <li className="text-xs text-white/70 tracking-wide">• Won CGL Season 3 and several other CS:GO tournaments</li>
                <li className="text-xs text-white/70 tracking-wide">• Placed in the top 1% rank worldwide and recognized across the Asia-Pacific community</li>
                <li className="text-xs text-white/70 tracking-wide">• Represented Bangladesh on international competitive stages</li>
                <li className="text-xs text-white/70 tracking-wide">• Achieved runner-up and third-place finishes in 20+ tournaments</li>
                <li className="text-xs text-white/70 tracking-wide">• Secured sponsorships by partnering with global tech firms such as Gigabyte and Aorus</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClosePanel}
            className="self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm"
          >
            ../
          </button>
        </div>
      </div>
    </main>
  );
}
