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
    company: 'UNSW Redback Racing',
    role: 'Software Engineer, Vehicle Analytics',
    date: 'Mar 2026 - Present',
    summary:
      'building telemetry tools for our formula SAE car. i work on a platform that lets engineers analyze vehicle data in real time and compare car setups before track days.',
  },
  {
    company: 'Leibniz Education',
    role: 'Software Engineer',
    date: 'Dec 2025 - Mar 2026',
    summary:
      'built onboarding flows, a math input engine, and an adaptive learning system that personalizes questions for students. also made a real time head to head math battle mode.',
  },
  {
    company: 'turFinder',
    role: 'Founder & Software Engineer',
    date: 'Apr 2025 - Present',
    summary:
      'my own thing. a pickup soccer platform where players can find games, book fields, and get matched with teammates based on skill and location.',
  },
];
