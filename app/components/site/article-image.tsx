import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ArticleImageProps = ComponentPropsWithoutRef<'img'> & {
  alt: string;
};

type ArticleFigureProps = ArticleImageProps & {
  caption?: ReactNode;
};

const imageClassName =
  'block h-auto max-h-[78dvh] w-full border border-rule bg-surface object-contain';

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function ArticleImage({ alt, className, ...props }: ArticleImageProps) {
  return (
    // A native image keeps MDX compatible with local and remote sources of any size.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      decoding="async"
      loading="lazy"
      {...props}
      alt={alt}
      className={joinClassNames('my-12', imageClassName, className)}
    />
  );
}

export function ArticleFigure({ alt, caption, className, ...props }: ArticleFigureProps) {
  return (
    <figure className="mx-0 my-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        decoding="async"
        loading="lazy"
        {...props}
        alt={alt}
        className={joinClassNames(imageClassName, className)}
      />
      {caption ? (
        <figcaption className="mt-3 text-[0.7rem] leading-relaxed text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
