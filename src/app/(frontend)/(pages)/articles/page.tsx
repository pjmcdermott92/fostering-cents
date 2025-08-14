import { fetchArticles, fetchFeaturedArticle } from '@/app/_data/articles';
import { fetchTopics } from '@/app/_data/topics';
import { BlockWrapper } from '@/components/BlockWrapper';
import { FeaturedArticleHero } from '@/components/heros/FeaturedArticleHero';
import { parseValidPageNum } from '@/lib/utils/pagination';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { ArticleGrid } from '@/components/ArticlesGrid';
import { Pagination } from '@/components/Pagination';
import { TopicsGrid } from '@/components/blocks/TopicsGrid';
import { NewsletterFormBlock } from '@/components/blocks/NewsletterForm';
import { Metadata } from 'next';

type SearchParams = { page?: string };
type Props = {
  searchParams?: Promise<SearchParams>;
};

export default async function ArticlesPage({ searchParams: SearchParamsPromise }: Props) {
  const { isEnabled: draft } = await draftMode();
  const searchParams = await SearchParamsPromise;
  const page = parseValidPageNum(searchParams?.page);

  if (!page) return redirect('/articles');

  const featuredArticle = await fetchFeaturedArticle();
  if (!featuredArticle) notFound();

  const articles = await fetchArticles({ page, excludeId: featuredArticle?.id });

  if (page > articles.totalPages) return redirect('/articles');

  const topics = draft ? await fetchTopics() : await unstable_cache(fetchTopics, ['topics'])();

  return (
    <>
      <FeaturedArticleHero article={featuredArticle} />
      <BlockWrapper padding={{ top: 'hero', bottom: 'small' }}>
        <h2 className="h2-bold">Latest Articles</h2>
        <div id="content" className="my-8">
          <ArticleGrid articles={articles.docs} />
        </div>
        <Pagination resource={articles} />
        <TopicsGrid
          topicsToShow={topics.docs}
          blockType="topicsGrid"
          sectionLabel="Browse by Topic"
        />
        <NewsletterFormBlock
          blockType="newsletterForm"
          newsletterFormFields={{
            settings: { bgType: 'transparent' },
            padding: { top: 'small', bottom: 'small' },
          }}
        />
      </BlockWrapper>
    </>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: 'Articles About Personal Finance & Parenting',
  };
}
