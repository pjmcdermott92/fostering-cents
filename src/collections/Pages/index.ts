import { isAdmin } from '@/access/isAdmin';
import { publishedOnly } from '@/access/publishedOnly';
import { slugField } from '@/fields/slug';
import { CollectionConfig } from 'payload';
import { revalidateAfterChange } from './hooks/revalidateAfterChange';
import { hero } from '@/fields/hero';
import { generatePreviewPath } from '@/lib/utils/generatePreviewPath';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'createdAt', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No Index',
      admin: {
        position: 'sidebar',
        description: 'Prevent indexing in search engines',
      },
    },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              blocks: [],
              blockReferences: ['content', 'accentBlock', 'latestArticles', 'topicsGrid'],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
  },
  versions: {
    drafts: true,
  },
};
