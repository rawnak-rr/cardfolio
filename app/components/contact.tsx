'use client';

import { useEffect, useRef, useState } from 'react';
import { Panel } from '@/app/components/panel';
import { links, profile } from '@/lib/data';

const socials = [
  { href: links.linkedin, label: 'linkedin.com/in/xdefT' },
  { href: links.instagram, label: 'instagram.com/dewepto' },
];

const rowClass = 'block text-white/80 hover:text-white transition-colors';

type ContactProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Contact({ isOpen, onClose }: ContactProps) {
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
    <Panel isOpen={isOpen} onClose={onClose}>
      <div className='flex-1 flex items-center justify-center'>
        <div className='space-y-4 text-sm tracking-wide'>
          <button
            type='button'
            className={`${rowClass} bg-transparent border-0 cursor-pointer p-0 text-sm tracking-wide`}
            onClick={handleCopyEmail}>
            {emailCopied ? 'copied!' : profile.email}
          </button>
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className={rowClass}>
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </Panel>
  );
}
