import type { Topic } from '@/payload-types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  topic: Partial<Topic>;
  asLink?: boolean;
  isLarge?: boolean;
  show?: boolean;
  variant?: 'default' | 'light';
};

export function TopicBadge({
  topic,
  asLink = true,
  isLarge = false,
  show = true,
  variant = 'default',
}: Props) {
  if (!topic || !show) return null;

  const { slug, title } = topic;
  const href = `/topics/${slug}`;

  return (
    <div
      className={cn(
        'rounded-md inline-block font-semibold',
        isLarge ? 'px-3 py-1 text-md' : 'px-2 py-1 text-xs',
        variant == 'light'
          ? 'bg-white hover:bg-gray-300'
          : 'bg-muted hover:bg-border shadow-sm border',
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
