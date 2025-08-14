import { fetchPage } from '@/app/_data/pages';
import { RenderHero } from '@/components/heros';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { Redirects } from '@/components/Redirects';
import { RenderBlocks } from '@/components/RenderBlocks';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';

type Props = {
  params: Promise<{ slug: any }>;
};

const getPage = async (slug: string[], draft?: boolean) =>
  draft ? fetchPage(slug) : unstable_cache(fetchPage, [`page-${slug}`])(slug);

export default async function Page({ params }: Props) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;
  const page = await getPage(slug, draft);
  const url = '/' + (Array.isArray(slug) ? slug.join('/') : slug);

  if (!page) return <Redirects url={url} />;

  const { hero, content } = page;

  return (
    <>
      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={content} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const { slug = ['home'] } = await params;
  const page = await getPage(slug, draft);

  const title = page?.title ?? page?.meta?.title ?? '';
  const description = page?.meta?.description ?? '';
  const url = `/pages/${slug}`;

  const noIndexMeta = page?.noIndex ? { robots: 'noindex' } : {};
  const metaImage = page?.meta?.image;

  let ogImage: string | undefined;

  if (metaImage && typeof metaImage !== 'string' && metaImage.url) {
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
    ...noIndexMeta,
  };
}
