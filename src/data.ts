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

export type ThoughtCard = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
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

export const thoughts: ThoughtCard[] = [
  {
    slug: 'thinking-too-much',
    title: 'Thinking Too Much',
    date: 'March 2026',
    excerpt:
      'i probably think too much. this is something i’ll keep updating randomly whenever i feel like writing something i thought about.',
    content:
      'i probably think too much. this is something i’ll keep updating randomly whenever i feel like writing something i thought about. it’s directly linked to my notes so have fun coming across random thoughts of mine.',
  },
  {
    slug: 'shipping-vs-polishing',
    title: 'Shipping vs Polishing',
    date: 'February 2026',
    excerpt:
      'there is a point where polishing stops being craft and starts being a way to delay putting something in front of people.',
    content:
      'there is a point where polishing stops being craft and starts being a way to delay putting something in front of people. most of the time users would rather feel momentum than witness perfection. i keep reminding myself that feedback arrives from shipping, not from staring at the same feature for two extra nights.',
  },
  {
    slug: 'building-for-feel',
    title: 'Building for Feel',
    date: 'January 2026',
    excerpt:
      'some products are technically correct and still feel wrong. the small interactions usually decide whether people come back.',
    content:
      'some products are technically correct and still feel wrong. the small interactions usually decide whether people come back. speed matters, but so does rhythm. spacing matters, but so does what a screen implies before anyone reads a single word. that difference is hard to measure and obvious to users.',
  },
  {
    slug: 'sports-and-systems',
    title: 'Sports and Systems',
    date: 'December 2025',
    excerpt:
      'sports apps are never just about booking or scores. they are social systems pretending to be software products.',
    content:
      'sports apps are never just about booking or scores. they are social systems pretending to be software products. once people start organizing around them, the product becomes about trust, pacing, reliability, and group behavior. the software is only the visible layer.',
  },
  {
    slug: 'learning-in-public',
    title: 'Learning in Public',
    date: 'November 2025',
    excerpt:
      'writing things down makes half-formed thoughts useful. even if the conclusion is weak, the trail is usually worth keeping.',
    content:
      'writing things down makes half-formed thoughts useful. even if the conclusion is weak, the trail is usually worth keeping. i think people underestimate how often clarity comes after expression instead of before it.',
  },
  {
    slug: 'what-i-notice',
    title: 'What I Notice',
    date: 'October 2025',
    excerpt:
      'i pay attention to interfaces that reveal intent quickly. the best ones tell you what they are before you learn the rules.',
    content:
      'i pay attention to interfaces that reveal intent quickly. the best ones tell you what they are before you learn the rules. when something is designed well, you can feel the confidence in it. when it is not, every click sounds like a question.',
  },
];
