import type { Article, Page, Topic } from '@/payload-types';

type PageReference = { relationTo: 'pages'; value: Page | string };
type ArticleReference = { relationTo: 'articles'; value: Article | string };
type TopicReference = { relationTo: 'topics'; value: Topic | string };
export type LinkType = 'custom' | 'reference' | null;
export type Reference = PageReference | ArticleReference | TopicReference | null;

export type GenerateHrefType = {
  reference?: Reference | null;
  type?: LinkType | null;
  url?: string | null;
};

export function generateCmsLinkHref({ reference, type, url }: GenerateHrefType): string {
  if ((type === 'custom' || type === undefined) && url) return url;

  if (type === 'reference' && reference?.value && typeof reference.value !== 'string') {
    const { relationTo, value } = reference;
    switch (relationTo) {
      case 'articles':
        return `/articles/${value.slug}`;
      case 'topics':
        return `/topics/${value.slug}`;
      case 'pages':
        return value.slug === 'home' ? '/' : `/${value.slug}`;
    }
  }

  return '';
}
