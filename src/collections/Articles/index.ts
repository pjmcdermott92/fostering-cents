import { isAdmin } from '@/access/isAdmin';
import { publishedOnly } from '@/access/publishedOnly';
import { canonicalFields } from '@/fields/canonical';
import { richText } from '@/fields/richText';
import { slugField } from '@/fields/slug';
import type { CollectionConfig } from 'payload';
import { categoryAfterChange } from './hooks/field-hooks';
import { revalidateAfterChange } from './hooks/revalidateAfterChange';
import { revalidateAfterDelete } from './hooks/revalidateAfterDelete';

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {},
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'topic',
          type: 'relationship',
          relationTo: 'topics',
          required: true,
          hooks: {
            afterChange: [categoryAfterChange],
          },
        },
        {
          name: 'tags',
          type: 'text',
          hasMany: true,
          admin: {
            width: '50%',
            description: 'Type a tag and press enter',
          },
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [],
      blockReferences: ['blogContent', 'reusableContentBlock'],
      required: true,
    },
    // SIDEBAR
    slugField(),
    ...canonicalFields,
    {
      name: 'authorType',
      type: 'select',
      defaultValue: 'team',
      required: true,
      options: [
        { label: 'Team', value: 'team' },
        { label: 'Guest Author', value: 'guest' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.authorType == 'team',
        position: 'sidebar',
      },
    },
    {
      name: 'guestAuthor',
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.authorType === 'guest',
        position: 'sidebar',
      },
    },
    {
      name: 'authorUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.authorType === 'guest',
        position: 'sidebar',
        placeholder: 'https://',
        description: 'Website URL or social media page',
      },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 3,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
};
