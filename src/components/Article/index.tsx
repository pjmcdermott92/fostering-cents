import { Article as ArticleType, Topic } from '@/payload-types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { BlockWrapper } from '../BlockWrapper';
import { PublishAndReadingTime } from '../PublishAndReadingTime';
import { RenderBlocks } from '../RenderBlocks';
import { TopicBadge } from '../TopicBadge';
import { AuthorTag } from './AuthorTag';
import { CanonicalCallout } from './CanonicalCallout';
import { RelatedArticles } from './RelatedArticles';
import { ShareButtons } from './ShareButtons';

type Props = {
  article: ArticleType;
};

export function Article({ article }: Props) {
  const { featuredImage, title, topic, content, relatedArticles, canonicalUrl } = article;
  const relatedArticlesToShow = relatedArticles?.filter(
    (item): item is ArticleType => typeof item !== 'string',
  );

  return (
    <>
      <BlockWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <TopicBadge isLarge topic={topic as Topic} />
            <h1 className="h1-bold">{title}</h1>
            <PublishAndReadingTime article={article} />
            <div className="py-4">
              <AuthorTag {...article} />
            </div>
          </div>
          <AspectRatio ratio={16 / 9} className="rounded-md overflow-hidden shadow-xl">
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
        </div>
      </BlockWrapper>
      <BlockWrapper settings={{ containerWidth: 'narrow' }} padding={{ bottom: 'hero' }}>
        <ShareButtons title={title} />
        <CanonicalCallout url={canonicalUrl} />
      </BlockWrapper>
      <RenderBlocks blocks={content} />
      {relatedArticlesToShow?.length ? <RelatedArticles docs={relatedArticlesToShow} /> : null}
    </>
  );
}
