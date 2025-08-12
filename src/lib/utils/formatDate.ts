import { format, parseISO } from 'date-fns';

export function formatArticlePublishDate(timestamp: string): string {
  return format(parseISO(timestamp), 'MMM dd, yyyy');
}
