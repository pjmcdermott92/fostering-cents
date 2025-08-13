import type { Article, PopularArticles as PopularArticlesType, Topic } from '@/payload-types';
import { BlockWrapper } from '../BlockWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchPopularArticles } from '@/app/_data/articles';
import { PublishAndReadingTime } from '../PublishAndReadingTime';
import { TopicBadge } from '../TopicBadge';

type Props = {
  popularArticlesBlockFields: PopularArticlesType['popularArticlesBlockFields'];
};

export async function PopularArticles({ popularArticlesBlockFields }: Props) {
  const { settings, padding, title, limit, topic } = popularArticlesBlockFields;
  const topicId = typeof topic === 'object' && topic?.id ? topic.id : undefined;
  const linkHref = typeof topic === 'object' && topic?.slug ? `/topics/${topic.slug}` : '/articles';
  const topicName = typeof topic === 'object' && topic?.title ? topic.title : undefined;

  const articles = await fetchPopularArticles({ limit: Number(limit), categoryId: topicId });

  console.log(articles);

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div className="flex items-end justify-between">
        <h2 className="font-semibold text-3xl">{title}</h2>
        <ShowAllArticlesLink
          className="hidden md:flex"
          href={linkHref}
          label={topicName ? `More Articles in ${topicName}` : undefined}
        />
      </div>
      {articles?.docs?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 pb-4">
          {articles.docs.map((article) => (
            <PopularArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-4">
          <p className="text-2xl text-center">
            Hmm... It looks like we couldn&apos;t find any articles that matched your search.
          </p>
        </div>
      )}
      <div className="flex md:hidden items-center justify-center py-4">
        <ShowAllArticlesLink
          href={linkHref}
          label={topicName ? `More Articles in ${topicName}` : undefined}
        />
      </div>
    </BlockWrapper>
  );
}

function ShowAllArticlesLink({
  className,
  href,
  label = 'Show All Articles',
}: {
  className?: string;
  href: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className={`${className} items-center gap-1 text-danger-dark font-semibold uppercase hover:underline flex`}
    >
      {label} <ArrowRight className="size-5" />
    </Link>
  );
}

type PopularArticleCardProps = {
  article: Partial<Article>;
};

function PopularArticleCard({ article }: PopularArticleCardProps) {
  const { title, excerpt, slug, topic } = article;
  const href = `/article/${slug}`;

  return (
    <div className="bg-gray-100 p-4 rounded-md flex flex-col space-y-4">
      <PublishAndReadingTime
        article={article}
        hideReadingTime
        className="text-gray-500 font-semibold"
      />
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-semibold">
          <Link href={href} className="hover:text-foreground-light">
            {title}
          </Link>
        </h3>
        <p>{excerpt}</p>
      </div>
      <div>
        <TopicBadge topic={topic as Topic} variant="light" />
      </div>
    </div>
  );
}
