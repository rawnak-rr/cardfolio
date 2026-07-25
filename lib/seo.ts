import type { MetadataRoute } from "next";
import { profile, workItems } from "@/lib/data";

function normalizeSiteUrl(url: string) {
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://www.rawnak-cardfolio.dev",
);

export const siteName = "rawnak";

export const siteDescription =
  "rawnak is a Sydney-based fullstack developer and UNSW Computer Science student building telemetry, edtech/education and matchmaking software";

export const seoKeywords = [
  "rawnak",
  "rawnak portfolio",
  "fullstack developer",
  "Sydney software engineer",
  "UNSW computer science",
  "vehicle analytics",
  "Formula SAE software",
  "React developer",
  "Next.js developer",
  "Python developer",
];

export const routeMetadata = {
  home: {
    path: "/",
    title: "rawnak",
    description: siteDescription,
  },
  work: {
    path: "/work",
    title: "Work | rawnak",
    description:
      "Selected software work from rawnak across vehicle telemetry, education platforms, and pickup soccer technology.",
  },
  contact: {
    path: "/contact",
    title: "Contact | rawnak",
    description:
      "Contact rawnak for software engineering, product, and collaboration opportunities.",
  },
} as const;

export const socialLinks = [
  "https://github.com/rawnak-rr",
  "https://www.linkedin.com/in/xdef",
  "https://www.instagram.com/dewepto/",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function routeUrl(path: string) {
  return absoluteUrl(path);
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();

  return Object.values(routeMetadata).map((route) => ({
    url: routeUrl(route.path),
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.path === "/" ? 1 : 0.7,
  }));
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: "Fullstack Developer",
    email: "mailto:rawnakd11@gmail.com",
    sameAs: socialLinks,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "UNSW Sydney",
      url: "https://www.unsw.edu.au/",
    },
    knowsAbout: [
      "Fullstack software development",
      "Vehicle telemetry",
      "Education technology",
      "Sports technology",
      "React",
      "Next.js",
      "Python",
      "Database",
      "SQL",
    ],
    worksFor: workItems.map((item) => ({
      "@type": "Organization",
      name: item.company,
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
  };
}
