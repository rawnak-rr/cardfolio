'use client';

type ThoughtsProps = {
  isOpen: boolean;
  content: string;
  onClose: () => void;
};

export function Thoughts({ isOpen, content, onClose }: ThoughtsProps) {
  return (
    <div
      className={`note-panel fixed inset-0 bg-black text-white transition-opacity duration-300 flex items-center justify-center ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-md px-6 flex flex-col gap-8">
        <p className="text-sm leading-relaxed tracking-wide">{content}</p>
        <button
          type="button"
          onClick={onClose}
          className="self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm"
        >
          ../
        </button>
      </div>
    </div>
  );
}
