import Section from "./components/Section";
import ThemeToggle from "./components/ThemeToggle";
import {
  profile,
  recognition,
  sideProjects,
  experience,
  consuming,
  highlights,
  links,
  inspiration,
} from "./data";

export default function App() {
  return (
    <main className="font-body max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ThemeToggle />

      {/* Left column */}
      <div className="space-y-6">
        {/* Header card */}
        <header className="section">
          <h1 className="h1">{profile.name}</h1>
          <p className="text-xl mt-2">{profile.role}</p>
        </header>

        {/* About */}
        <Section title="About">
          <p className="leading-relaxed text-lg">{profile.about}</p>
        </Section>

        {/* Recognition */}
        <Section title="Recognition">
          <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70">
            {recognition.map((r, i) => (
              <div
                key={i}
                className="row">
                <div className="year">{r.year}</div>
                <a
                  className="link text-right"
                  href={r.href}
                  target="_blank"
                  rel="noreferrer">
                  {r.title}
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* Side Projects */}
        <Section title="Side Projects">
          <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70">
            {sideProjects.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="row">
                <div className="year">{s.year}</div>
                <div className="text-right">
                  <div className="font-semibold">{s.title}</div>
                  <div className="muted text-sm">{s.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </Section>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* Experience */}
        <Section title="Experience">
          <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70">
            {experience.map((e, i) => (
              <div
                key={i}
                className="row">
                <div className="year">
                  {e.year === "Present" && (
                    <span className="badge-success">Present</span>
                  )}
                  {e.year !== "Present" && e.year}
                </div>
                <div className="text-right">
                  <a
                    className="link font-semibold"
                    href={e.href}
                    target="_blank"
                    rel="noreferrer">
                    {e.title}
                  </a>
                  <div className="muted text-sm">{e.place}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Consuming (cards with cover + meta) */}
        <Section title="Consuming">
          <div className="grid-min">
            {consuming.map((c, i) => (
              <a
                key={i}
                className=""
                href={c.href}
                target="_blank"
                rel="noreferrer">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-44 object-cover rounded-lg mb-3"
                />
                <div className="text-sm muted">{c.kind}</div>
                <div className="font-semibold">{c.title}</div>
                <div className="muted text-sm">{c.by}</div>
              </a>
            ))}
          </div>
        </Section>
      </div>

      {/* Full width below */}
      <div className="lg:col-span-2 space-y-6">
        {/* Highlights (image grid with captions) */}
        <Section title="Highlights">
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <figure
                key={i}
                className="overflow-hidden">
                <img
                  src={h.img}
                  alt={h.title}
                  className="w-full h-64 md:h-80 object-cover hover:scale-[1.02] transition"
                />
                <figcaption className="pt-2 muted text-sm">
                  {h.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* Inspiration */}
        <Section title="Inspiration">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {inspiration.map((i, idx) => (
              <li
                key={idx}
                className="py-2">
                <a
                  className="link"
                  href={i.href}
                  target="_blank"
                  rel="noreferrer">
                  {i.title}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* Quote of the Day (static placeholder) */}
        <Section title="Quote of the Day">
          <blockquote className="italic muted">
            “Simplicity is the ultimate sophistication.” — Leonardo da Vinci
          </blockquote>
        </Section>

        <footer className="section">
          <p className="muted text-sm">© Card-Folio</p>
        </footer>
      </div>
    </main>
  );
}
