import type { CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';

export const ReusableContent: CollectionConfig = {
  slug: 'reusable-content',
  access: {
    create: isAdmin,
    read: () => true,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [],
      blockReferences: ['blogContent', 'content'],
    },
  ],
  labels: {
    plural: 'Reusable Contents',
    singular: 'Reusable Content',
  },
};
