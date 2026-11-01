'use client';

import { useCopyEmail } from '@/app/components/use-copy-email';
import { links, profile } from '@/lib/data';

const socials = [
  { href: links.github, label: 'github.com/rawnak-rr' },
  { href: links.linkedin, label: 'linkedin.com/in/xdefT' },
  { href: links.x, label: 'x.com/xdeflickz' },
];

const rowClass = 'block py-2 text-body transition-colors hover:text-ink';

export function Contact() {
  const email = useCopyEmail();

  return (
    <div className="flex flex-col items-start text-[0.95rem]">
      <button
        type="button"
        className={`${rowClass} cursor-pointer px-0`}
        onClick={email.copy}
      >
        {email.copied ? 'copied!' : profile.email}
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
