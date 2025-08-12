import type { Topic, TopicsGrid as TopicsGridType } from '@/payload-types';
import { BlockWrapper } from '../BlockWrapper';
import Link from 'next/link';
import Image from 'next/image';
import { Tag } from 'lucide-react';

export function TopicsGrid(props: TopicsGridType) {
  const { sectionLabel, topicsToShow } = props;

  const topics = (topicsToShow ?? []).filter(
    (topic): topic is Topic => typeof topic === 'object' && topic !== null,
  );

  return (
    <BlockWrapper>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-primary" />
        <h2 className="font-bold text-3xl">{sectionLabel}</h2>
        <div className="flex-1 h-1 bg-primary" />
      </div>
      <div className="bg-info/55 -mt-4 p-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {topics.map((topic) => (
            <Topic key={topic.id} {...topic} />
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}

function Topic(props: Topic) {
  const { icon, slug, title } = props;

  const href = `/topics/${slug}`;

  return (
    <div className="flex flex-col items-center gap-2 md:[&:not(:last-child)]:border-r border-white px-8 py-4">
      <div className="rounded-full size-24 bg-white flex items-center justify-center">
        {icon && typeof icon == 'object' ? (
          <Link href={href} className="relative size-16">
            <Image src={icon.url!} alt={icon.alt!} fill />
          </Link>
        ) : (
          <Link href={href}>
            <Tag className="size-12" />
          </Link>
        )}
      </div>
      <h5 className="text-center font-semibold">
        <Link href={href}>{title}</Link>
      </h5>
    </div>
  );
}
