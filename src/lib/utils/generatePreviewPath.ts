import { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  articles: '/articles',
  pages: '',
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
};

export function generatePreviewPath({ collection, slug }: Props) {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  });

  const url = `/api/preview?${encodedParams.toString()}`;

  return url;
}
