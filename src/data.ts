export type ExperienceItem = {
  company: string;
  role: string;
  date: string;
  location: string;
  points: string[];
};

export type ResumeEducationItem = {
  school: string;
  date: string;
  degree: string;
  location: string;
};

export type ResumeTechStack = {
  languages: string[];
  frameworks: string[];
  tools: string[];
};

export type ResumeHobbyItem = {
  title: string;
  date: string;
  role: string;
  location: string;
  points: string[];
};

export type ResumeData = {
  summary: string;
  education: ResumeEducationItem[];
  techStack: ResumeTechStack;
  experience: ExperienceItem[];
  hobbies: ResumeHobbyItem[];
};

export const profile = {
  name: 'rawnak',
  role: 'fullstack developer',
  about: `card-folio`,
};

export const sideProjects = [
  {
    year: '2025',
    title: 'turFinder*',
    desc: 'reimagined connections through sports',
    href: 'https://turfinder.app',
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'Leibniz Education',
    role: 'Software Engineer',
    date: 'December 2025 – Present',
    location: 'Sydney, Australia',
    points: [
      'Built a custom math input and cursor engine improving typing efficiency by 80% for simultaneous math and text input',
      'Architected authentication and onboarding system for 10,000+ users with integrated token usage tracking and secure session management',
      'Optimized the question eval pipeline, reducing load times by 50% and improving large submission efficiency',
      'Rebuilt Match Mode, a head-to-head math battle feature, enabling seamless real time competition',
      'Built the Expo mobile app mirroring the web platform with seamless backend integration and persistent user sessions',
    ],
  },
  {
    company: 'turFinder',
    role: 'Founder & CEO',
    date: 'April 2025 – Present',
    location: 'Sydney, Australia',
    points: [
      'Developed a turf-booking and pickup soccer platform, reducing user booking time by 90% and streamlining access to fields',
      'Designed a player-matching algorithm using match history, user interactions, and playstyle patterns to form balanced pickup teams',
      'Built a pickup games feature enabling 34,000+ players to join and organize matches more easily',
      'Architected an enterprise dashboard for turf owners to automate workflows from onboarding and slot bookings to database management',
    ],
  },
];

export const studies = [
  {
    year: 'Present',
    title: 'UNSW',
    place: 'Sydney',
    href: '#',
    current: true,
  },
];

export const resume: ResumeData = {
  summary:
    'Full-stack engineer experienced in building scalable systems from scratch, optimizing backend performance, and delivering end-to-end features used by thousands of users.',
  education: [
    {
      school: 'University of New South Wales',
      date: '2025 - 2028',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Sydney, Australia',
    },
  ],
  techStack: {
    languages: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'Java', 'HTML/CSS'],
    frameworks: ['React', 'Spring-Boot', 'Tailwind', 'GSAP'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
  },
  experience,
  hobbies: [
    {
      title: 'Cyclops Legion',
      date: 'Dec 2020 – Aug 2022',
      role: 'Player',
      location: 'Singapore',
      points: [
        'Won CGL Season 3 and 20+ CS:GO tournaments; placed top 1% worldwide and represented Bangladesh on international stages',
        'Secured sponsorships with Gigabyte and Aorus through competitive achievements across the Asia-Pacific community',
      ],
    },
  ],
};
