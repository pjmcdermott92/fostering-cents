import type { Article, LatestArticles as LatestArticlesType } from '@/payload-types';
import { BlockWrapper } from '../BlockWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchArticles } from '@/app/_data/articles';
import { ArticleGrid } from '../ArticlesGrid';
import { RichText } from '../RichText';

type Props = {
  latestArticlesBlockFields: LatestArticlesType['latestArticlesBlockFields'];
};

export async function LatestArticles(props: Props) {
  const {
    settings,
    padding,
    sectionHeading,
    articlesToExclude,
    displayShowAllLink,
    useLeadingContent,
    leadingContent,
  } = props.latestArticlesBlockFields;

  const excludedArticles = articlesToExclude
    ? articlesToExclude
        .filter(
          (article): article is Article =>
            typeof article === 'object' &&
            article !== null &&
            'id' in article &&
            typeof article.id === 'string',
        )
        .map((article) => article.id)
    : undefined;

  const articles = await fetchArticles({ limit: 3, excludeId: excludedArticles });

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div className="flex items-end justify-between">
        <h2 className="font-semibold text-3xl">{sectionHeading}</h2>
        {displayShowAllLink ? (
          <div className="hidden md:flex justify-end">
            <ShowAllArticlesLink />
          </div>
        ) : null}
      </div>
      {useLeadingContent ? <RichText data={leadingContent!} /> : null}
      <ArticleGrid articles={articles.docs} />
      {displayShowAllLink ? (
        <div className="flex md:hidden items-center justify-center py-4">
          <ShowAllArticlesLink />
        </div>
      ) : null}
    </BlockWrapper>
  );
}

function ShowAllArticlesLink({ className }: { className?: string }) {
  return (
    <Link
      href="/articles"
      className={`${className} items-center gap-1 text-danger-dark font-semibold uppercase hover:underline flex`}
    >
      See All Articles <ArrowRight className="size-5" />
    </Link>
  );
}
