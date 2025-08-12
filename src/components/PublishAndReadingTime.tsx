import { cn } from '@/lib/utils';
import { Article } from '@/payload-types';
import { Calendar, Clock } from 'lucide-react';
import { estimateReadingTimeFromLexicalBlocks } from '@/lib/utils/estimateReadingTime';
import { formatArticlePublishDate } from '@/lib/utils/formatDate';

type Props = {
  article: Partial<Article>;
  className?: string;
  hidePublishDate?: boolean;
  hideReadingTime?: boolean;
};

export function PublishAndReadingTime({
  article,
  className,
  hidePublishDate = false,
  hideReadingTime = false,
}: Props) {
  const { content, publishedAt } = article;

  if (!publishedAt && !content) return null;

  const timeToRead = content ? estimateReadingTimeFromLexicalBlocks(content) : null;
  const publishDate = publishedAt ? formatArticlePublishDate(publishedAt) : null;

  // If both are hidden or invalid, render nothing
  if ((hidePublishDate || !publishDate) && (hideReadingTime || !timeToRead)) return null;

  return (
    <div className={cn('text-gray-400 flex items-center gap-1 text-xs uppercase', className)}>
      {!hidePublishDate && publishDate && <PublishDate publishDate={publishDate} />}
      {!hidePublishDate && !hideReadingTime && publishDate && timeToRead && <span>|</span>}
      {!hideReadingTime && timeToRead && <ReadingTime readingTime={timeToRead} />}
    </div>
  );
}

function PublishDate({ publishDate }: { publishDate: string }) {
  return (
    <span className="flex items-center gap-1">
      <Calendar className="size-3" /> {publishDate}
    </span>
  );
}

function ReadingTime({ readingTime }: { readingTime: number | string }) {
  return (
    <span className="flex items-center gap-1">
      <Clock className="size-3" /> {readingTime} Minute Read
    </span>
  );
}
