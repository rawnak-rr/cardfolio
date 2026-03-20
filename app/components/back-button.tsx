'use client';

type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

export function BackButton({ onClick, label = '../' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm"
    >
      {label}
    </button>
  );
}
