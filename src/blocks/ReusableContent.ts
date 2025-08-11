import { blockFields } from '@/fields/blockFields';
import type { Block } from 'payload';

export const ReusableContentBlock: Block = {
  slug: 'reusableContentBlock',
  fields: [
    blockFields({
      name: 'reusableContentBlockFields',
      fields: [
        {
          name: 'reusableContent',
          type: 'relationship',
          relationTo: 'reusable-content',
          required: true,
        },
        {
          name: 'customId',
          type: 'text',
          admin: {
            description: 'A custom ID that can be used to target this block is CSS or JavaScript.',
          },
        },
      ],
    }),
  ],
};
