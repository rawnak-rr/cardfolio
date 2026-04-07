import 'server-only';

import fs from 'node:fs';
import path from 'node:path';

export type WorkItem = {
  company: string;
  role: string;
  date: string;
  location: string;
  points: string[];
};

const resumePath = path.join(process.cwd(), '..', 'resume-rawnak', 'resume.tex');

function cleanLatex(value: string) {
  return value
    .replace(/\\textbf\{([^}]*)\}/g, '$1')
    .replace(/\\textit\{([^}]*)\}/g, '$1')
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\#/g, '#')
    .replace(/\\_/g, '_')
    .replace(/~/g, ' ')
    .replace(/\{|\}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getWorkItems(): WorkItem[] {
  const source = fs.readFileSync(resumePath, 'utf8');
  const experienceSection = source.match(
    /\\section\{Experience\}([\s\S]*?)\\section\{Technical Skills\}/,
  )?.[1];

  if (!experienceSection) {
    return [];
  }

  const itemPattern =
    /\\resumeSubheading\s*\{([^}]*)\}\{([^}]*)\}\s*\{([^}]*)\}\{([^}]*)\}\s*\\resumeItemListStart([\s\S]*?)\\resumeItemListEnd/g;
  const items: WorkItem[] = [];

  for (const match of experienceSection.matchAll(itemPattern)) {
    const [, company, date, role, location, rawPoints] = match;
    const points = Array.from(rawPoints.matchAll(/\\resumeItem\{([\s\S]*?)\}/g), ([, point]) =>
      cleanLatex(point),
    );

    items.push({
      company: cleanLatex(company),
      date: cleanLatex(date),
      role: cleanLatex(role),
      location: cleanLatex(location),
      points,
    });
  }

  return items;
}
