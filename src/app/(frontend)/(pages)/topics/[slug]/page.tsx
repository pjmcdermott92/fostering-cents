import { fetchArticles } from '@/app/_data/articles';
import { fetchTopicBySlug } from '@/app/_data/topics';
import { ArticleGrid } from '@/components/ArticlesGrid';
import { NewsletterFormBlock } from '@/components/blocks/NewsletterForm';
import { PopularArticles } from '@/components/blocks/PopularArticles';
import { BlockWrapper } from '@/components/BlockWrapper';
import { Pagination } from '@/components/Pagination';
import { parseValidPageNum } from '@/lib/utils/pagination';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

type SearchParams = { page?: string };
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams>;
};

export default async function TopicsPage({ params, searchParams: searchParamsPromise }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const searchParams = await searchParamsPromise;
  const page = parseValidPageNum(searchParams?.page);

  const topic = await getTopic(slug, draft);
  if (!topic) notFound();

  if (!page) redirect(`/topics/${slug}`);

  const articles = await getTopicArticles(topic.id, page, draft);

  if (page > articles.totalPages) redirect(`/topics/${slug}`);

  return (
    <>
      <BlockWrapper padding={{ top: 'hero' }}>
        <div className="flex items-center mb-2 gap-2 font-semibold">
          <Link href="/articles" className="text-warning hover:underline">
            All Articles
          </Link>{' '}
          &gt; <span>{topic.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 size-[80px] relative bg-gray-200 rounded-full overflow-hidden border-2 border-white flex items-center justify-center">
            {topic.icon && typeof topic.icon == 'object' && (
              <Image src={topic.icon.url!} alt={topic.icon.alt} width={50} height={50} priority />
            )}
          </div>
          <div>
            <h2 className="h2-bold">Articles in {topic.title}</h2>
            <p className="text-xl italic">{topic.description}</p>
          </div>
        </div>

        <div id="content" className="my-8">
          <ArticleGrid articles={articles.docs} />
          {articles.docs.length == 0 ? (
            <div className="my-4">
              <PopularArticles
                popularArticlesBlockFields={{
                  settings: {
                    containerWidth: 'normal',
                    bgType: 'transparent',
                    bgColor: 'accentLight',
                    bgImage: null,
                    theme: 'light',
                  },
                  padding: { top: 'small', bottom: 'small' },
                  limit: '6',
                  title: 'Check Out Our Most Popular Articles',
                }}
              />
            </div>
          ) : null}
        </div>
        <Pagination resource={articles} />
      </BlockWrapper>
      <NewsletterFormBlock
        blockType="newsletterForm"
        newsletterFormFields={{
          settings: { bgType: 'transparent' },
          padding: { top: 'small', bottom: 'small' },
        }}
      />
    </>
  );
}

async function getTopic(slug: string, draft: boolean) {
  return draft ? fetchTopicBySlug(slug) : unstable_cache(fetchTopicBySlug, [`topics`])(slug);
}

async function getTopicArticles(topicId: string, page: number, draft: boolean) {
  return draft
    ? fetchArticles({ topicId, page })
    : unstable_cache(fetchArticles, ['topics'])({ topicId, page });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const topic = await getTopic(slug, draft);

  return {
    title: `Topic: ${topic.title} - Fostering Cents`,
    description: topic.description,
  };
}
