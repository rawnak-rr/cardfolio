import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile, sideProjects, studies } from "./data";

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
    "relative h-full w-full rounded-[1.75rem] shadow-[0_30px_60px_-24px_rgba(17,24,39,0.45),0_18px_30px_-20px_rgba(17,24,39,0.3)] [transform-style:preserve-3d] dark:shadow-[0_40px_70px_-24px_rgba(15,23,42,0.75),0_22px_32px_-22px_rgba(15,23,42,0.55)]";

  const cardFaceBase =
    "absolute inset-0 z-10 flex flex-col justify-between rounded-[inherit] p-[clamp(1.75rem,_4vw,_2.5rem)] [backface-visibility:hidden]";

  const frontTexture =
    "bg-[#a48cff] text-indigo-900 [box-shadow:inset_0_12px_24px_-20px_rgba(255,255,255,0.6),inset_0_-16px_28px_-18px_rgba(15,23,42,0.35)] [background-image:linear-gradient(140deg,rgba(255,255,255,0.12),rgba(0,0,0,0.12))]";

  const frontTextureDark =
    "dark:bg-[#3f37c9] dark:text-indigo-50 dark:[box-shadow:inset_0_14px_30px_-20px_rgba(129,140,248,0.35),inset_0_-16px_30px_-22px_rgba(15,23,42,0.6)] dark:[background-image:linear-gradient(145deg,rgba(129,140,248,0.24),rgba(15,23,42,0.55))]";

  const backTexture =
    "bg-[#8b73f4] text-indigo-50 [box-shadow:inset_0_10px_22px_-18px_rgba(255,255,255,0.55),inset_0_-14px_24px_-18px_rgba(17,24,39,0.4)] [background-image:linear-gradient(150deg,rgba(255,255,255,0.14),rgba(0,0,0,0.2))]";

  const backTextureDark =
    "dark:bg-[#312d81] dark:text-indigo-50 dark:[box-shadow:inset_0_12px_28px_-18px_rgba(99,102,241,0.28),inset_0_-16px_30px_-20px_rgba(15,23,42,0.65)] dark:[background-image:linear-gradient(150deg,rgba(129,140,248,0.28),rgba(15,23,42,0.65))]";

  const cardFrontClassName = [
    cardFaceBase,
    "border border-[rgba(124,104,255,0.55)]",
    frontTexture,
    frontTextureDark,
  ].join(" ");

  const cardBackClassName = [
    cardFaceBase,
    "border border-[rgba(116,97,255,0.5)]",
    backTexture,
    backTextureDark,
    "[transform:rotateY(180deg)]",
  ].join(" ");

  const noiseOverlayClass =
    "pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-white/20 opacity-90 [background-blend-mode:soft-light,overlay] [background-image:linear-gradient(0deg,rgba(255,255,255,0.04),rgba(17,17,17,0.12)),url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")] [background-size:100%_100%,160px_160px] dark:border-white/10 dark:opacity-80";

  useEffect(() => {
    if (!cardRef.current) {
      return undefined;
    }

    gsap.set(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 1600,
      transformOrigin: "50% 50%",
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
      ease: "power4.inOut",
      overwrite: "auto",
    });
  }, [isFlipped]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    pointerTypeRef.current = event.pointerType;

    if (event.pointerType !== "mouse" || !cardRef.current) {
      return;
    }

    gsap.to(cardRef.current, {
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerTypeRef.current !== "mouse" || !cardRef.current) {
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
      ease: "power3.out",
      overwrite: "auto",
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
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 font-[var(--font-body)] bg-gradient-to-br from-neutral-100 via-white to-neutral-200 text-neutral-900 transition-colors duration-500 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 dark:text-neutral-100">
      <div className="w-[min(90vw,420px)] [perspective:1600px]">
        <button
          type="button"
          className="relative block aspect-[3/2] w-full cursor-pointer rounded-[1.75rem] border-0 bg-transparent p-0 [isolation:isolate] focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-[6px]"
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={toggleFlip}
          aria-label={isFlipped ? "Show front of card" : "Show back of card"}>
          <div
            ref={cardRef}
            className={flipCardClassName}>
            <div className={noiseOverlayClass}></div>

            <div className={cardFrontClassName}>
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  {profile.name}
                </h1>
                <div className="space-y-1 text-sm font-medium text-indigo-900/85 dark:text-indigo-100/90">
                  <p className="text-xs uppercase tracking-[0.4em] text-indigo-900/60 dark:text-indigo-200/70">
                    {currentStudy?.title ?? "UNSW"}
                  </p>
                  <p className="text-base font-medium">{profile.role}</p>
                  <p>{currentStudy?.place ?? "Sydney"}</p>
                </div>
                <div className="">contact</div>
              </div>
              <div />
            </div>

            <div className={cardBackClassName}>
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-indigo-100/80">
                  Founder && CEO
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  {featuredProject?.title ?? "turFinder*"}
                </h2>
              </div>
              <div className="text-sm text-indigo-100/85">
                <p>
                  {featuredProject?.desc ??
                    "Reimagining connections through sports."}
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
