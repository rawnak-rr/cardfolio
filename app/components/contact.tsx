'use client';

import { useEffect, useRef, useState } from 'react';
import { links, profile } from '@/lib/data';

const socials = [
  { href: links.github, label: 'github.com/rawnak-rr' },
  { href: links.linkedin, label: 'linkedin.com/in/xdefT' },
  { href: links.x, label: 'x.com/xdeflickz' },
];

const rowClass = 'block py-2 text-body transition-colors hover:text-ink';

export function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-start text-[0.95rem]">
      <button
        type="button"
        className={`${rowClass} cursor-pointer border-0 bg-transparent px-0 text-left`}
        onClick={handleCopyEmail}
      >
        {emailCopied ? 'copied!' : profile.email}
      </button>
      {socials.map((social) => (
        <a
          key={social.href}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}
