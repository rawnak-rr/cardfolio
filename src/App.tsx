import { useState } from "react";
import { profile, sideProjects, studies } from "./data";

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const featuredProject = sideProjects[0];
  const currentStudy =
    studies.find((study) => study.current) ?? studies.find(Boolean);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <main className="font-body min-h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 bg-gradient-to-br from-neutral-100 via-white to-neutral-200 text-neutral-900 transition-colors duration-500 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 dark:text-neutral-100">
      <div className="card-stack">
        <button
          type="button"
          className="card-button"
          onClick={toggleFlip}
          aria-label={isFlipped ? "Show front of card" : "Show back of card"}>
          <div
            className={["flip-card", isFlipped ? "flip-card--flipped" : ""]
              .filter(Boolean)
              .join(" ")}>
            <div className="flip-card__face flip-card__face--front">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-500/70 dark:text-neutral-400/80 mb-6">
                  {profile.role}
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  {profile.name}
                </h1>
              </div>
              <div className="flex items-center justify-between text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <span>{currentStudy?.place ?? "Sydney, Australia"}</span>
                <span>{currentStudy?.year ?? "Present"}</span>
              </div>
            </div>

            <div className="flip-card__face flip-card__face--back">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-200/80 mb-6">
                  {featuredProject?.year ?? "2025"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
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
