export const profile = {
  name: 'rawnak',
  role: 'fullstack developer',
};

export const studies = [
  {
    year: 'Present',
    title: 'UNSW',
    place: 'Sydney',
    href: '#',
    current: true,
  },
];

export type WorkItem = {
  company: string;
  role: string;
  date: string;
  summary: string;
};

export const workItems: WorkItem[] = [
  {
    company: 'UNSW Redback Racing (Formula SAE)',
    role: 'Software Engineer, Vehicle Analytics',
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
    date: 'Apr 2025 - Present',
    summary:
      'i wanted to play pickup soccer but finding games was painful, so i built the thing myself. find games, book fields, get matched with people near you and the whole algorithm improves the more you play. i hope i can make this huge.',
  },
];
