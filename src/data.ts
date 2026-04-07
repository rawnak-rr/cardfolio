import { noteContent } from '@/src/noteContent';

export type ExperienceItem = {
  company: string;
  date: string;
  title: string;
  points: string[];
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
    company: 'UNSW Redback Racing (Formula SAE)',
    title: 'Software Engineer, Vehicle Analytics',
    date: 'March 2026 -> Present',
    points: [
      'Develop features on a proprietary telemetry platform built with Next.js and AWS services including ECS, Lambda, and Docker for real time and post session vehicle analysis',
      'Built RESTful API routes and a car setup interface to let engineers tabulate and compare vehicle configurations before track days',
      'Designed a setup comparison feature enabling engineers to diff configurations side by side, surfacing changes across suspension, aero, and drivetrain parameters',
      'Rebuilt the global toolbar component used across all pages, improving consistency and resolving layout and interaction issues',
    ],
  },
  {
    company: 'Leibniz Education',
    title: 'Software Engineer',
    date: 'December 2025 -> March 2026',
    points: [
      'Built web and mobile onboarding flows for 10,000+ users using Next.js, Expo (React Native), and Supabase, handling role based branching for students, teachers, and school provisioning',
      'Built a TypeScript cursor based math input engine for mixed text and expression entry, eliminating repeated mode toggles and focus resets to improve answer entry speed by 80%',
      'Built an adaptive learning engine using Bayesian updates, graph propagation, SQL recommendation filtering, and Python tuning to personalize question selection and reduce repeated low value practice',
      'Developed a real time match system with queue based matchmaking, synchronized game state, and rating based pairing for head to head math battles',
    ],
  },
  {
    company: 'turFinder',
    title: 'Founder & Software Engineer',
    date: 'April 2025 -> Present',
    points: [
      'Built a full stack pickup soccer platform using React, TypeScript, Spring Boot, and PostgreSQL with real time booking, game hosting, and team formation',
      'Reduced time spent on manual owner operations by 70% by building a dashboard to centralize bookings, revenue, availability, reviews, and offers',
      'Designed a player matching algorithm using skill, position, social, and location based factors to help players find teammates',
      'Implemented geospatial proximity scoring using the Haversine formula to calculate player distances and filter recommendations by location',
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

export const work = experience;

export const thoughts: ThoughtCard[] = [
  {
    slug: 'thinking-too-much',
    title: 'Thinking Too Much',
    date: 'March 2026',
    excerpt: noteContent,
    content: noteContent,
  },
];
