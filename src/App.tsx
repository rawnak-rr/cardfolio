import Section from "./components/Section";
import { profile, sideProjects, studies, me } from "./data";

export default function App() {
  return (
    <main className="font-body max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Side Projects */}
        <Section title="turFinder*">
          <div className="divide-y divide-neutral-200/70 dark:divide-neutral-800/70">
            {sideProjects.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="row">
                <div className="text-left">
                  <div className="font-semibold">{s.title}</div>
                  <div className="muted text-sm">{s.desc}</div>
                </div>
                <div className="year">{s.year}</div>
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
            {studies.map((e, i) => (
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
        <Section title="me-myself">
          <div className="grid-min">
            {me.map((c, i) => (
              <a
                key={i}
                className=""
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
    </main>
  );
}
