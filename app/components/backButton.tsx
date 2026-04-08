'use client';

type BackButtonProps = {
  label?: string;
  tone?: 'light' | 'dark';
  onClick: () => void;
};

export function BackButton({ label = '../', tone = 'light', onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`self-start underline bg-transparent border-0 cursor-pointer p-0 text-sm ${
        tone === 'light' ? 'text-white/50' : 'text-black/50'
      }`}
    >
      {label}
    </button>
  );
}
