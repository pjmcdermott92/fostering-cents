import { cn } from '@/lib/utils';
import { BlockWrapper } from '../BlockWrapper';
import type { Article, Topic } from '@/payload-types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import { TopicBadge } from '../TopicBadge';
import { PublishAndReadingTime } from '../PublishAndReadingTime';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

type Props = { article: Partial<Article>; hideTopic?: boolean };

export function FeaturedArticleHero({ article, hideTopic = false }: Props) {
  return (
    <BlockWrapper
      className="mb-12"
      settings={{
        theme: 'light',
        bgType: 'solid',
        bgColor: 'accentLight',
      }}
      padding={{ top: 'hero', bottom: 'hero' }}
    >
      <FeaturedArticleCard article={article} hideTopic={hideTopic} />
    </BlockWrapper>
  );
}

type FeaturedArticleCardProps = {} & Props;
function FeaturedArticleCard({ article, hideTopic }: FeaturedArticleCardProps) {
  const { title, excerpt, featuredImage, slug, topic } = article;
  const href = `/articles/${slug}`;

  return (
    <div
      className={cn(
        'flex h-full flex-col md:flex-row bg-white rounded shadow border',
        'relative md:-bottom-12',
      )}
    >
      <Link href={href} className="flex-shrink-0 w-full md:w-1/2 p-4">
        <AspectRatio ratio={16 / 9} className="rounded overflow-hidden">
          {typeof featuredImage == 'object' ? (
            <Image
              src={featuredImage!.url!}
              alt={featuredImage!.alt}
              className="object-fill"
              fill
            />
          ) : (
            <div className="size-full bg-gray-300" />
          )}
        </AspectRatio>
      </Link>
      <div className="flex flex-col p-4 gap-2">
        <div className="space-y-4 flex-1">
          {!hideTopic && <TopicBadge topic={topic as Topic} isLarge />}
          <h2 className="h2-bold">
            <Link href={href}>{title}</Link>
          </h2>
          <PublishAndReadingTime article={article} />
          <p>{excerpt}</p>
        </div>
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
