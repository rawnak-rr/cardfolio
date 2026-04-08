'use client';

import { useEffect, useRef, useState } from 'react';
import { BackButton } from '@/app/components/backButton';

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
    navigator.clipboard.writeText('rawnakd11@gmail.com');
    setEmailCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div
      className={`z-50 fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-md px-6 flex flex-col gap-8">
        <div className="space-y-4 text-sm tracking-wide">
          <button
            type="button"
            className="block text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0 text-sm tracking-wide font-[inherit]"
            onClick={handleCopyEmail}
          >
            {emailCopied ? 'copied!' : 'rawnakd11@gmail.com'}
          </button>
          <a
            href="https://www.linkedin.com/in/xdef"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white transition-colors"
          >
            linkedin.com/in/xdefT
          </a>
          <a
            href="https://www.instagram.com/dewepto/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/80 hover:text-white transition-colors"
          >
            instagram.com/dewepto
          </a>
        </div>
        <BackButton onClick={onClose} />
      </div>
    </div>
  );
}
