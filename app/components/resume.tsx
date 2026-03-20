'use client';

import { BackButton } from '@/app/components/backButton';
import type { ResumeData } from '@/src/data';

type ResumeProps = {
  isOpen: boolean;
  resume: ResumeData;
  onClose: () => void;
};

export function Resume({ isOpen, resume, onClose }: ResumeProps) {
  return (
    <div
      className={`note-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-start justify-center overflow-y-auto ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-lg w-full px-6 py-16 flex flex-col gap-10">
        <div className="space-y-1">
          <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">
            Summary
          </h2>
          <p className="text-sm leading-relaxed tracking-wide text-white/80">{resume.summary}</p>
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">
            Education
          </h2>
          {resume.education.map((item) => (
            <div key={item.school} className="space-y-0.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold tracking-wide text-white/90">{item.school}</span>
                <span className="text-xs text-white/50 tracking-wide">{item.date}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs italic text-white/60 tracking-wide">{item.degree}</span>
                <span className="text-xs text-white/50 tracking-wide">{item.location}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">
            Tech Stack
          </h2>
          <p className="text-xs text-white/80 tracking-wide">
            <span className="font-bold text-white/90">Languages:</span> {resume.techStack.languages.join(', ')}
          </p>
          <p className="text-xs text-white/80 tracking-wide">
            <span className="font-bold text-white/90">Frameworks:</span> {resume.techStack.frameworks.join(', ')}
          </p>
          <p className="text-xs text-white/80 tracking-wide">
            <span className="font-bold text-white/90">Tools:</span> {resume.techStack.tools.join(', ')}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">
            Experience
          </h2>
          {resume.experience.map((job) => (
            <div key={job.company} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold tracking-wide text-white/90">{job.company}</span>
                <span className="text-xs text-white/50 tracking-wide">{job.date}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs italic text-white/60 tracking-wide">{job.role}</span>
                <span className="text-xs text-white/50 tracking-wide">{job.location}</span>
              </div>
              <ul className="space-y-0.5 pl-3">
                {job.points.map((point, i) => (
                  <li key={i} className="text-xs text-white/70 tracking-wide">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-wide uppercase text-white/70 border-b border-white/20 pb-1">
            Hobbies
          </h2>
          {resume.hobbies.map((item) => (
            <div key={item.title} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold tracking-wide text-white/90">{item.title}</span>
                <span className="text-xs text-white/50 tracking-wide">{item.date}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs italic text-white/60 tracking-wide">{item.role}</span>
                <span className="text-xs text-white/50 tracking-wide">{item.location}</span>
              </div>
              <ul className="space-y-0.5 pl-3">
                {item.points.map((point, i) => (
                  <li key={i} className="text-xs text-white/70 tracking-wide">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <BackButton onClick={onClose} />
      </div>
    </div>
  );
}
