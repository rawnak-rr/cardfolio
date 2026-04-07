'use client';

import { BackButton } from '@/app/components/backButton';

type ThoughtsProps = {
  isOpen: boolean;
  content: string;
  onClose: () => void;
};

export function Thoughts({ isOpen, content, onClose }: ThoughtsProps) {
  return (
    <div
      className={`note-panel fixed inset-0 bg-black text-white font-mono transition-opacity duration-300 flex items-center justify-center ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-md px-6 flex flex-col gap-8">
        <p className="text-sm leading-relaxed tracking-wide">{content}</p>
        <BackButton onClick={onClose} />
      </div>
    </div>
  );
}
