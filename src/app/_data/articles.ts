import type { Article } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import { ARCHIVE_PER_PAGE_LIMIT } from '@/lib/constants';

const minimalSelect = {
  title: true,
  slug: true,
  topic: true,
  featuredImage: true,
  publishedAt: true,
  updatedAt: true,
  createdAt: true,
  excerpt: true,
  content: true,
  relatedArticles: true,
} as const;

type GetPostOptions = {
  page?: number;
  excludeId?: string | string[];
  topicId?: string;
  limit?: number;
};

export async function fetchArticles({
  page = 1,
  excludeId,
  topicId,
  limit = ARCHIVE_PER_PAGE_LIMIT,
}: GetPostOptions = {}) {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const currentDate = new Date();

  const conditions: any[] = [{ publishedAt: { less_than_equal: currentDate } }];
  if (!draft) conditions.push({ _status: { equals: 'published' } });
  if (topicId) conditions.push({ topic: { equals: topicId } });

  if (excludeId) {
    if (Array.isArray(excludeId)) {
      conditions.push({ id: { not_in: excludeId } });
    } else {
      conditions.push({ id: { not_equals: excludeId } });
    }
  }

  const result = await payload.find({
    collection: 'articles',
    depth: 1,
    limit,
    page,
    select: minimalSelect,
    sort: '-publishedAt',
    where: {
      and: conditions,
    },
  });

  return result;
}
