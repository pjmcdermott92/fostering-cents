import Fuse from 'fuse.js';
import { CollectionSlug, getPayload } from 'payload';
import configPromise from '@payload-config';

export async function search(keyword: string) {
  if (!keyword) {
    throw new Error('Search keyword required');
  }

  try {
    const [articles, pages, topics] = await Promise.all([
      fetchCollectionDocs('articles'),
      fetchCollectionDocs('pages'),
      fetchCollectionDocs('topics'),
    ]);

    const indexedDocs = buildSearchIndex([...articles, ...pages, ...topics]);

    const fuse = new Fuse(indexedDocs, {
      keys: ['searchableText'],
      includeScore: true,
      threshold: 0.3,
      ignoreLocation: true,
    });

    const results = fuse
      .search(keyword)
      .map(({ item, score }) => formatSearchResult(item._original, score));

    return results;
  } catch (err) {
    console.error('Search error: ', err);
    throw new Error('Failed to search');
  }
}

async function fetchCollectionDocs(collection: CollectionSlug): Promise<any[]> {
  const payload = await getPayload({ config: configPromise });
  const pageSize = 100;
  let page = 1;
  const allDocs: any[] = [];

  while (true) {
    const { docs, totalPages } = await payload.find({
      collection,
      limit: pageSize,
      page,
      depth: 1,
    });

    allDocs.push(...docs.map((doc) => ({ ...doc, collection })));

    if (page >= totalPages) break;
    page++;
  }

  return allDocs;
}

function buildSearchIndex(docs: any[]): any[] {
  return docs.map((doc) => {
    const { collection } = doc;

    const title = doc.title ?? '';
    const excerpt = doc.excerpt ?? '';
    const bodyText = extractPlainText(doc.body);
    let searchableText = title;

    if (collection === 'articles') {
      searchableText += ` ${excerpt} ${bodyText}`;
    } else if (collection === 'pages') {
      searchableText += ` ${bodyText}`;
    } else if (collection === 'topics') {
      searchableText += ` ${doc.icon?.filename ?? ''} ${doc.title ?? ''}`;
    }

    return {
      id: doc.id,
      collection,
      searchableText,
      _original: doc,
    };
  });
}

function extractPlainText(root: any): string {
  if (!root) return '';
  const stack = Array.isArray(root) ? [...root] : [root];
  let text = '';

  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;

    if (typeof node.text === 'string') {
      text += node.text + ' ';
    }

    if (Array.isArray(node.children)) {
      stack.push(...node.children.reverse());
    }
  }

  return text.trim();
}

function formatSearchResult(doc: any, score: number | undefined) {
  const { collection } = doc;

  const common = {
    title: doc.title,
    slug: doc.slug,
    collection,
    path: `${collection == 'pages' ? '' : collection}/${doc.slug}`,
    _score: score ?? null,
  };

  switch (collection) {
    case 'topics':
      return {
        ...common,
        title: `Topic: ${common.title}`,
        description: doc.description,
        image: {
          url: doc.icon?.url,
          alt: doc.icon?.alt,
        },
      };
    case 'pages':
      return {
        ...common,
        description: doc.meta?.description,
        image: {
          url: doc.meta?.image?.url,
          alt: doc.meta?.image?.alt,
        },
      };
    case 'articles':
      return {
        ...common,
        description: doc.excerpt,
        image: {
          url: doc.featuredImage?.url,
          alt: doc.featuredImage?.alt,
        },
        topic: {
          title: doc.topic?.title,
          slug: doc.topic?.slug,
        },
      };
    default:
      return { ...doc, collection, _score: score ?? null };
  }
}
