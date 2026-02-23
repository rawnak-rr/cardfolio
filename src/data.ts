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
    href: 'https://turfinder.com',
  },
];

export const experience = [
  {
    company: 'Leibniz Education',
    role: 'Software Engineer',
    date: 'December 2025 – Present',
    location: 'Sydney, Australia',
    points: [
      'Architected end-to-end authentication and onboarding system with full-stack implementation, scaling to 10,000+ registered users with additional anonymous traffic',
      'Engineered a high-performance question evaluation pipeline with preloading, sectional lazy-loading, and optimized rendering — reducing perceived load times and improving evaluation accuracy across the platform',
      'Built a custom math input and cursor engine supporting seamless toggling between mathematical notation and text, enabling a fluid input experience for complex STEM content',
      'Designed and shipped a tutorial UI and product showcase to drive user activation through onboarding flows',
      'Developed the full Expo mobile UI for authentication, progress tracking, and match mode — delivering a consistent cross-platform experience',
      'Rebuilt match mode from the ground up: resolved race conditions between client submissions and server state, implemented accurate pre-match countdowns, persisted question states post-match, and eliminated edge cases in live competitive sessions',
      'Architected server-side question routing with unique task/question IDs, ensuring persistent session state and correct question delivery throughout user sessions',
      'Implemented a token usage tracking system integrated into the database layer, enabling per-user AI consumption monitoring and laying groundwork for usage-based analytics',
    ],
  },
  {
    company: 'turFinder',
    role: 'Founder & CEO',
    date: 'April 2025 – Present',
    location: 'Sydney, Australia',
    points: [
      'Launching turf-booking and pickup soccer app, cutting booking time by 80% and streamlining access to fields',
      'Developed UI using Figma and PWA with React and Tailwind, improving user accessibility by 50%',
      'Pioneered pickup games feature, enabling 2× growth in player participation',
      'Built a scalable Spring Boot and Supabase backend with real-time booking, authentication, and safeguards against SQL injection and XSS',
      'Pitched to 50+ active players and community groups, securing strong user feedback',
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
  {
    year: '2023',
    title: 'Front-end dev',
    place: 'Dhaka, Bangladesh',
    href: '#',
  },
];
