import { CSSProperties, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import DebossedPattern from './components/DebossedPattern';
import { profile, sideProjects, studies } from './data';

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const featuredProject = sideProjects[0];
  const currentStudy =
    studies.find((study) => study.current) ?? studies.find(Boolean);

  const cardRef = useRef<HTMLDivElement>(null);
  const baseRotationRef = useRef(0);
  const hoverTiltRef = useRef({ x: 0, y: 0 });
  const pointerTypeRef = useRef<string | null>(null);

  const flipCardClassName =
    'relative h-full w-full rounded-[1.75rem] shadow-[0_30px_60px_-24px_rgba(17,24,39,0.45),0_18px_30px_-20px_rgba(17,24,39,0.3)] [transform-style:preserve-3d] dark:shadow-[0_40px_70px_-24px_rgba(15,23,42,0.75),0_22px_32px_-22px_rgba(15,23,42,0.55)]';

  const cardFaceBase =
    'absolute inset-0 z-10 flex flex-col justify-between overflow-hidden rounded-[inherit] p-[clamp(1.75rem,_4vw,_2.5rem)] [backface-visibility:hidden]';

  const frontTexture =
    'bg-[#ff6f00] text-white [box-shadow:inset_0_12px_24px_-20px_rgba(255,255,255,0.6),inset_0_-16px_28px_-18px_rgba(84,31,0,0.28)]';

  const frontTextureDark =
    'dark:bg-[#cc5200] dark:text-orange-50 dark:[box-shadow:inset_0_14px_30px_-20px_rgba(255,186,140,0.3),inset_0_-16px_30px_-22px_rgba(20,7,0,0.55)]';

  const backTexture =
    'bg-[#f05600] text-orange-50 [box-shadow:inset_0_10px_22px_-18px_rgba(255,255,255,0.5),inset_0_-14px_24px_-18px_rgba(74,24,0,0.4)]';

  const backTextureDark =
    'dark:bg-[#993900] dark:text-orange-50 dark:[box-shadow:inset_0_12px_28px_-18px_rgba(255,185,120,0.25),inset_0_-16px_30px_-20px_rgba(20,7,0,0.65)]';

  const cardFrontClassName = [
    cardFaceBase,
    'border border-[rgba(255,200,150,0.55)]',
    frontTexture,
    frontTextureDark,
  ].join(' ');

  const cardBackClassName = [
    cardFaceBase,
    'border border-[rgba(210,92,32,0.55)]',
    backTexture,
    backTextureDark,
    '[transform:rotateY(180deg)]',
  ].join(' ');

  const noiseOverlayClass =
    "pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-white/20 opacity-90 [background-blend-mode:soft-light,overlay] [background-image:linear-gradient(0deg,rgba(255,255,255,0.04),rgba(17,17,17,0.12)),url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")] [background-size:100%_100%,160px_160px] dark:border-white/10 dark:opacity-80";

  const debossPaperTextureStyle: CSSProperties = {
    backgroundImage: [
      'radial-gradient(circle at 12% 22%, rgba(255,255,255,0.35), transparent 45%)',
      'radial-gradient(circle at 82% 8%, rgba(255,255,255,0.22), transparent 50%)',
      'radial-gradient(circle at 50% 90%, rgba(12,6,42,0.55), transparent 60%)',
      'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(10,6,38,0.45))',
    ].join(','),
    backgroundSize: '220% 220%, 200% 200%, 160% 160%, 100% 100%',
    backgroundPosition: '10% 10%, 70% 5%, 40% 90%, 0% 0%',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    if (!cardRef.current) {
      return undefined;
    }

    gsap.set(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1600,
      transformOrigin: '50% 50%',
    });

    return () => {
      if (cardRef.current) {
        gsap.killTweensOf(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    baseRotationRef.current = isFlipped ? 180 : 0;

    gsap.to(cardRef.current, {
      rotateY: baseRotationRef.current + hoverTiltRef.current.y,
      duration: 1.1,
      ease: 'power4.inOut',
      overwrite: 'auto',
    });
  }, [isFlipped]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    pointerTypeRef.current = event.pointerType;

    if (event.pointerType !== 'mouse' || !cardRef.current) {
      return;
    }

    gsap.to(cardRef.current, {
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerTypeRef.current !== 'mouse' || !cardRef.current) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const tiltY = (relativeX - 0.5) * 10;
    const tiltX = (0.5 - relativeY) * 6;

    hoverTiltRef.current = { x: tiltX, y: tiltY };

    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: baseRotationRef.current + tiltY,
      duration: 0.24,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handlePointerLeave = () => {
    pointerTypeRef.current = null;

    if (!cardRef.current) {
      return;
    }

    hoverTiltRef.current = { x: 0, y: 0 };

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: baseRotationRef.current,
      duration: 0.42,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center font-redhatmono
    gap-6 px-6 py-12'>
      <div className='w-[min(90vw,420px)] [perspective:1600px]'>
        <button
          type='button'
          className='relative block aspect-[3/2] w-full cursor-pointer rounded-[1.75rem]
          border-0'
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={toggleFlip}
          aria-label={isFlipped ? 'Show front of card' : 'Show back of card'}>
          <div
            ref={cardRef}
            className={flipCardClassName}>
            <div className={noiseOverlayClass}></div>

            <div className={cardFrontClassName}>
              <div className='flex h-full flex-col justify-between'>
                <div className='space-y-2'>
                  <p className='text-[0.6rem] uppercase tracking-[0.55em] text-white/60'>
                    channel orange id
                  </p>
                  <h1 className='text-4xl font-semibold tracking-tight md:text-5xl'>
                    {profile.name}
                  </h1>
                  <p className='text-lg uppercase tracking-[0.35em] text-white/85'>
                    {profile.role}
                  </p>
                </div>
                <div className='space-y-5 text-sm text-white/90'>
                  <div className='grid grid-cols-2 gap-5'>
                    <div>
                      <p className='text-[0.6rem] uppercase tracking-[0.5em] text-white/60'>
                        study
                      </p>
                      <p className='mt-2 text-xl font-semibold uppercase tracking-tight'>
                        {currentStudy?.title ?? 'UNSW'}
                      </p>
                      <p className='text-white/70'>{currentStudy?.place ?? 'Sydney'}</p>
                    </div>
                    <div>
                      <p className='text-[0.6rem] uppercase tracking-[0.5em] text-white/60'>
                        contact
                      </p>
                      <p className='mt-2 text-base font-semibold'>
                        hello@{profile.name}.dev
                      </p>
                      <p className='text-white/70'>{profile.about}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between text-[0.65rem] uppercase tracking-[0.45em] text-white/60'>
                    <span>{currentStudy?.year ?? '20XX'}</span>
                    <span>@{profile.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={cardBackClassName}>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 z-0 mix-blend-soft-light opacity-80 dark:opacity-65'
                style={debossPaperTextureStyle}
              />
              <DebossedPattern className='absolute inset-x-[-18%] top-[-12%] z-0 h-[130%] w-[140%] opacity-90 text-[#a03b00] dark:text-white/20 dark:opacity-60' />
              <div className='relative z-10 flex h-full flex-col justify-between'>
                <div className='space-y-3'>
                  <p className='text-xs uppercase tracking-[0.5em] text-white/75'>
                    project spotlight
                  </p>
                  <h2 className='text-3xl font-semibold tracking-tight md:text-4xl'>
                    {featuredProject?.title ?? 'turFinder*'}
                  </h2>
                </div>
                <p className='text-sm leading-relaxed text-white/85'>
                  {featuredProject?.desc ??
                    'Reimagining connections through sports.'}
                </p>
                <div className='flex items-center justify-between text-[0.65rem] uppercase tracking-[0.45em] text-white/70'>
                  <span>{featuredProject?.year ?? '2025'}</span>
                  <span>rawnak.studio</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
      <p className='text-sm uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-500'>
        tap or click to flip
      </p>
    </main>
  );
}
