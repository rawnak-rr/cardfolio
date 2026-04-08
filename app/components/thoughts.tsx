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
      className={`z-50 fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}>
      <div className='flex h-[min(78vh,36rem)] w-[min(92vw,34rem)] flex-col px-5 py-5 sm:px-6 sm:py-6'>
        <div className='flex-1 flex items-center justify-center'>
          <p className='text-sm uppercase leading-relaxed tracking-wide'>
            {content}
          </p>
        </div>
        <div className='pt-5'>
          <BackButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
