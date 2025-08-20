import { ARCHIVE_PER_PAGE_LIMIT } from '@/lib/constants';
import type { Article } from '@/payload-types';
import config from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';

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
  canonicalFields: true,
  canonicalUrl: true,
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

type FetchPopularArticlesOptions = {
  limit?: number;
  categoryId?: string;
};

export async function fetchPopularArticles({
  limit = ARCHIVE_PER_PAGE_LIMIT,
  categoryId,
}: FetchPopularArticlesOptions = {}) {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const currentDate = new Date();

  const conditions: any[] = [
    { publishedAt: { less_than_equal: currentDate } },
    { hideInPopular: { not_equals: true } },
  ];

  if (!draft) {
    conditions.push({ _status: { equals: 'published' } });
  }

  if (categoryId) {
    conditions.push({ topic: { equals: categoryId } });
  }

  const result = await payload.find({
    collection: 'articles',
    depth: 1,
    select: minimalSelect,
    where: {
      and: conditions,
    },
    sort: '-publishedAt',
  });

  const shuffledDocs = result.docs
    .map((value) => ({ value, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ value }) => value)
    .slice(0, limit);

  return {
    ...result,
    docs: shuffledDocs,
  };
}

export async function fetchFeaturedArticle({ topicId }: { topicId?: string } = {}) {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const currentDate = new Date();

  const conditions: any[] = [{ publishedAt: { less_than_equal: currentDate } }];
  if (!draft) conditions.push({ _status: { equals: 'published' } });
  if (topicId) conditions.push({ topic: { equals: topicId } });

  const result = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 1,
    page: 1,
    sort: '-publishedAt',
    select: minimalSelect,
    where: {
      and: conditions,
    },
  });

  return result.docs[0] || null;
}

export async function fetchSingleArticle(
  identifier: string,
  useId?: boolean,
): Promise<Article | null> {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const whereClause = [];

  if (useId) whereClause.push({ id: { equals: identifier } });
  else whereClause.push({ slug: { equals: identifier } });

  if (!draft) whereClause.push({ _status: { equals: 'published' } });

  const result = await payload.find({
    collection: 'articles',
    depth: 3,
    draft: false,
    limit: 1,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      author: true,
      guestAuthor: true,
      guestAuthorUrl: true,
      authorType: true,
      topic: true,
      content: true,
      featuredImage: true,
      relatedArticles: true,
      createdAt: true,
      updatedAt: true,
      excerpt: true,
      canonicalUrl: true,
      canonicalFields: true,
    },
    where: {
      and: whereClause,
    },
  });

  return result.docs[0];
}
