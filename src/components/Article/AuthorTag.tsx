import type { Article } from '@/payload-types';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = Pick<Article, 'authorType' | 'author' | 'guestAuthor' | 'authorUrl'>;

export function AuthorTag({ authorType, author, guestAuthor, authorUrl }: Props) {
  const authorImage =
    authorType === 'team' && typeof author === 'object' && typeof author?.photo === 'object'
      ? author.photo
      : null;

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-10 rounded-full overflow-hidden border-2">
        {authorImage ? (
          <Image
            src={authorImage.url!}
            alt={authorImage.alt}
            fill
            className="object-contain"
            sizes="width: 36"
          />
        ) : (
          <div className="size-full flex items-center justify-center bg-gray-100">
            <User2 />
          </div>
        )}
      </div>
      <div>
        <span className="text-sm">by </span>
        {authorType === 'guest' ? (
          <GuestAuthor name={guestAuthor} url={authorUrl} />
        ) : (
          <span className="font-semibold">{typeof author === 'object' && author?.displayName}</span>
        )}
      </div>
    </div>
  );
}

type GuestAuthorProps = {
  name: string | null | undefined;
  url?: string | null | undefined;
};

export function GuestAuthor({ name, url }: GuestAuthorProps) {
  if (!name) return null;

  return url ? (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="text-foreground/85 no-underline hover:border-solid hover:border-foreground font-semibold border-b border-dashed"
    >
      {name}
    </Link>
  ) : (
    <span className="font-semibold">{name}</span>
  );
}
