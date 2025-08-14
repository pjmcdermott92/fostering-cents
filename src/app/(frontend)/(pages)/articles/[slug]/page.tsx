import { fetchSingleArticle } from '@/app/_data/articles';
import { Article } from '@/components/Article';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SingleArticlePage({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const article = await getArticle(slug, draft);
  if (!article) notFound();

  return (
    <>
      {draft && <LivePreviewListener />}
      <Article article={article} />
    </>
  );
}

async function getArticle(slug: string, draft: boolean) {
  return draft
    ? await fetchSingleArticle(slug)
    : await unstable_cache(fetchSingleArticle, [`article-${slug}`])(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const article = await getArticle(slug, draft);
  const url = `/articles/${slug}`;

  const title = article?.title ?? article?.meta?.title ?? '';
  const description = article?.excerpt ?? article?.meta?.description ?? '';
  let ogImage: string | undefined;

  const featuredImage = article?.featuredImage;
  const metaImage = article?.meta?.image;

  if (featuredImage && typeof featuredImage !== 'string' && featuredImage.url) {
    ogImage = featuredImage.url;
  } else if (metaImage && typeof metaImage !== 'string' && metaImage.url) {
    ogImage = metaImage.url;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url,
    },
  };
}
