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
    "relative h-full w-full rounded-[1.75rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_12px_24px_-16px_rgba(15,23,42,0.45)] [transform-style:preserve-3d] will-change-transform dark:shadow-[0_35px_60px_-18px_rgba(15,23,42,0.75),0_20px_30px_-20px_rgba(15,23,42,0.55)]";

  const cardFaceBase =
    "absolute inset-0 z-10 flex flex-col justify-between rounded-[inherit] p-[clamp(1.75rem,_4vw,_2.5rem)] [backface-visibility:hidden]";

  const cardFrontClassName = [
    cardFaceBase,
    "border border-[rgba(231,229,228,0.6)] text-neutral-900",
    "[background:radial-gradient(circle_at_25%_15%,rgba(244,244,245,1),transparent_55%),radial-gradient(circle_at_80%_85%,rgba(244,244,245,0.85),transparent_60%),linear-gradient(135deg,rgba(244,246,255,1)_0%,rgba(228,233,255,1)_40%,rgba(236,252,203,1)_100%)]",
    "dark:border-zinc-700/40 dark:text-zinc-200",
    "dark:[background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.2),transparent_65%),linear-gradient(140deg,rgba(24,24,27,1),rgba(17,24,39,1)_55%,rgba(30,41,59,1))]",
  ].join(" ");

  const cardBackClassName = [
    cardFaceBase,
    "border border-[rgba(148,163,184,0.35)] text-slate-100",
    "[transform:rotateY(180deg)]",
    "[background:radial-gradient(circle_at_20%_80%,rgba(56,189,248,0.65),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.55),transparent_45%),linear-gradient(135deg,rgba(14,116,144,1),rgba(30,64,175,1)_45%,rgba(76,29,149,1))]",
    "dark:border-slate-400/40 dark:text-slate-100",
    "dark:[background:radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.55),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.45),transparent_60%),linear-gradient(140deg,rgba(30,41,59,1),rgba(49,46,129,1)_60%,rgba(76,29,149,1))]",
  ].join(" ");

  useEffect(() => {
    if (!cardRef.current) {
      return undefined;
    }

    gsap.set(cardRef.current, { rotateX: 0, rotateY: 0 });

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
      duration: 0.9,
      ease: "power3.inOut",
    });
  }, [isFlipped]);

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    pointerTypeRef.current = event.pointerType;

    if (!cardRef.current || event.pointerType !== "mouse") {
      return;
    }

    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (pointerTypeRef.current !== "mouse" || !cardRef.current) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const tiltY = (relativeX - 0.5) * 18;
    const tiltX = (0.5 - relativeY) * 14;

    hoverTiltRef.current = { x: tiltX, y: tiltY };

    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: baseRotationRef.current + tiltY,
      duration: 0.4,
      ease: "power2.out",
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
      scale: 1,
      duration: 0.45,
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
            <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-white/25 opacity-40 [mix-blend-mode:screen]"></div>

            <div className={cardFrontClassName}>
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-500/70 dark:text-neutral-400/80 mb-6">
                  {profile.role}
                </p>
                <h1 className="text-4xl font-[var(--font-display)] font-semibold tracking-tight md:text-5xl">
                  {profile.name}
                </h1>
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span>{currentStudy?.place ?? "Sydney, Australia"}</span>
                <span>{currentStudy?.year ?? "Present"}</span>
              </div>
            </div>

            <div className={cardBackClassName}>
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-200/80 mb-6">
                  {featuredProject?.year ?? "2025"}
                </p>
                <h2 className="text-3xl font-[var(--font-display)] font-semibold tracking-tight text-white md:text-4xl">
                  {featuredProject?.title ?? "turFinder*"}
                </h2>
              </div>
              <div className="space-y-1 text-sm text-neutral-100/80">
                <p>{featuredProject?.desc ?? "reimagined connections through sports"}</p>
                <p className="font-medium">
                  {currentStudy?.title ?? "UNSW"} · {currentStudy?.place ?? "Sydney, Australia"}
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
