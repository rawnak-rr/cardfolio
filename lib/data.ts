export const profile = {
  name: 'rawnak',
  role: 'fullstack developer',
  /** Words in `role` rendered bold on the card front. */
  roleEmphasis: ['fullstack'],
  study: 'UNSW',
  email: 'rawnakd11@gmail.com',
};

export const links = {
  github: 'https://github.com/rawnak-rr',
  linkedin: 'https://www.linkedin.com/in/xdef',
  instagram: 'https://www.instagram.com/dewepto/',
  thoughts: 'https://thoughts.rawnakk.me',
};

export type WorkItem = {
  company: string;
  role: string;
  date: string;
  summary: string;
  /** Condensed labels for the card back, where space is tight. */
  shortCompany?: string;
  shortRole?: string;
};

export const workItems: WorkItem[] = [
  {
    company: 'UNSW Redback Racing (Formula SAE)',
    shortCompany: 'UNSW Redback Racing',
    role: 'Software Engineer, Vehicle Analytics',
    shortRole: 'Software Engineer, VA',
    date: 'Mar 2026 - Present',
    summary:
      "i build and maintain our telemetry website which our engineers use to compare car setups, go through data logs and monitor everything during & after track days. it is also used to monitor live data during FSAE races (it actually feels like I'm on an F1 team).",
  },
  {
    company: 'Leibniz Education',
    role: 'Software Engineer',
    date: 'Dec 2025 - Mar 2026',
    summary:
      'i built a huge part of the core system from scratch such as onboarding students/teachers, a cursor engine, adaptive recommendation algorithm, personalized grading, and a 1v1 math mode with complete elo system. working for a company with 10k+ users taught me what it actually takes to keep things running at scale.',
  },
  {
    company: 'turFinder',
    role: 'Founder & Software Engineer',
    shortRole: 'Founder && SWE',
    date: 'Apr 2025 - Present',
    summary:
      'i wanted to play pickup soccer but finding games was painful, so i built the thing myself. find games, book fields, get matched with people near you and the whole algorithm improves the more you play. i hope i can make this huge.',
  },
];
