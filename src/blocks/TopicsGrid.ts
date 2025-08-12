import type { Block } from 'payload';

export const TopicsGrid: Block = {
  slug: 'topicsGrid',
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'Topics',
      required: true,
    },
    {
      name: 'topicsToShow',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: true,
      minRows: 4,
    },
  ],
};
