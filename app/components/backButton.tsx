'use client';

import Link from 'next/link';

type BaseBackButtonProps = {
  label?: string;
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

const className = 'self-start underline bg-transparent border-0 text-white/50 cursor-pointer p-0 text-sm';

export function BackButton(props: BackButtonProps) {
  const label = props.label ?? '../';

  if ('href' in props) {
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
