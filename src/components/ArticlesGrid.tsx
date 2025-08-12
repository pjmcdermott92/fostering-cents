import type { Article } from '@/payload-types';
import { ArticleCard } from './ArticleCard';

export function ArticleGrid({
  articles,
  hidePublishDate,
  hideTopic,
}: {
  articles: Partial<Article>[];
  hidePublishDate?: boolean;
  hideTopic?: boolean;
}) {
  if (!articles || !articles.length) {
    return (
      <p className="text-2xl">
        Hmm... It looks like we couldn&apost;t find any articles that matched your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          hidePublishDate={hidePublishDate}
          hideTopic={hideTopic}
        />
      ))}
    </div>
  );
}
