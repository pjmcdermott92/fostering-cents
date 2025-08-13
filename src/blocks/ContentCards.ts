import type { Block } from 'payload';
import { blockFields } from '@/fields/blockFields';
import { richText } from '@/fields/richText';

export const ContentCards: Block = {
  slug: 'contentCards',
  labels: {
    singular: 'Content Cards',
    plural: 'Content Cards',
  },
  fields: [
    blockFields({
      name: 'contentCardFields',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'position',
              type: 'select',
              required: true,
              label: 'Position of Cards',
              defaultValue: 'cardsBelow',
              options: [
                { label: 'Below Content', value: 'cardsBelow' },
                { label: 'Side by Side', value: 'sideBySide' },
                { label: 'Cards Only (No Content)', value: 'cardsOnly' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              type: 'select',
              name: 'cardBg',
              label: 'Card Background',
              required: true,
              defaultValue: 'transparent',
              options: [
                { label: 'Transparent', value: 'transparent' },
                { label: 'White', value: 'white' },
              ],
            },
          ],
        },
        richText({
          name: 'content',
          label: 'Content',
          required: false,
          admin: {
            condition: (_, siblingData) => siblingData.position !== 'cardsOnly',
          },
        }),
        {
          name: 'cards',
          type: 'array',
          maxRows: 8,
          minRows: 1,
          fields: [richText({ name: 'content' })],
        },
      ],
    }),
  ],
};
