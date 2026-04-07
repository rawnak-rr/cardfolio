'use client';

import Link from 'next/link';

type BaseBackButtonProps = {
  label?: string;
  tone?: 'light' | 'dark';
};

type BackButtonAsButton = BaseBackButtonProps & {
  onClick: () => void;
  href?: never;
};

type BackButtonAsLink = BaseBackButtonProps & {
  href: string;
  onClick?: never;
};

type BackButtonProps = BackButtonAsButton | BackButtonAsLink;

export function BackButton(props: BackButtonProps) {
  const label = props.label ?? '../';
  const tone = props.tone ?? 'light';
  const className = `self-start underline bg-transparent border-0 cursor-pointer p-0 text-sm ${
    tone === 'light' ? 'text-white/50' : 'text-black/50'
  }`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={className}
    >
      {label}
    </button>
  );
}
