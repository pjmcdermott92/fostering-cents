import { cn } from '@/lib/utils';
import type { Article, Topic } from '@/payload-types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  article: Partial<Article>;
  hidePublishDate?: boolean;
  className?: string;
  hideTopic?: boolean;
};

export function ArticleCard({ article, hidePublishDate, className, hideTopic }: Props) {
  const { title, excerpt, featuredImage, slug, topic } = article;
  const href = `/articles/${slug}`;

  return (
    <div className="space-y-4 h-full flex flex-col">
      <Link href={href}>
        <AspectRatio ratio={16 / 9} className="rounded overflow-hidden">
          {typeof featuredImage == 'object' ? (
            <Image
              src={featuredImage!.url!}
              alt={featuredImage!.alt!}
              className="object-fill"
              fill
            />
          ) : (
            <div className="size-full bg-gray-300" />
          )}
        </AspectRatio>
      </Link>
      <div>{/* TOPIC BADGE HERE */}</div>
      <div>{/* PUBLISH DAE AND READ TIME HERE */}</div>

      <div className="flex-1 space-y-4">
        <h3 className="text-2xl">
          <Link href={href} className="hover:text-foreground-light">
            {title}
          </Link>
        </h3>
        <p className="text-sm">{excerpt}</p>
        <div>
          <Link href={href}>
            <Button>
              Read Article <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
