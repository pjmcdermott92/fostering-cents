import type { Topic } from '@/payload-types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  topic: Partial<Topic>;
  asLink?: boolean;
  isLarge?: boolean;
  show?: boolean;
};

export function TopicBadge({ topic, asLink = true, isLarge = false, show = true }: Props) {
  if (!topic || !show) return null;

  const { slug, title } = topic;
  const href = `/topics/${slug}`;

  return (
    <div
      className={cn(
        'rounded-md inline-block font-semibold bg-muted hover:bg-border',
        isLarge ? 'px-3 py-1 text-md' : 'px-2 py-1 text-xs',
      )}
    >
      {asLink ? (
        <Link title={`Show articles with the topic ${title}`} href={href}>
          {title}
        </Link>
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
}
