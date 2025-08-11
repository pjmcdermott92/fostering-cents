import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';
import { revalidatePath, revalidateTag } from 'next/cache';

export const Topics: CollectionConfig = {
  slug: 'topics',
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      label: 'Is Public',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'When checked, category shows in navigation',
      },
    },
    {
      name: 'articles',
      type: 'join',
      collection: 'articles',
      defaultLimit: 0,
      maxDepth: 2,
      on: 'topic',
    },
  ],
  forceSelect: {
    name: true,
    slug: true,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc }) => {
        revalidatePath(`/posts/${doc.slug}`);
        revalidateTag('archives');

        if (doc.slug !== previousDoc?.slug) {
          revalidatePath(`/posts/${previousDoc?.slug}`);
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        revalidatePath(`/posts/${doc.slug}`);
        revalidateTag('archives');
      },
    ],
  },
};
