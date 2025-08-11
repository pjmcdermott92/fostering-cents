import type { Block } from 'payload';
import { richText } from '@/fields/richText';
import { blockFields } from '@/fields/blockFields';

export const Content: Block = {
  slug: 'content',
  fields: [
    blockFields({
      name: 'contentFields',
      fields: [
        {
          name: 'useLeadingContent',
          type: 'checkbox',
          label: 'Use Leading Content',
        },
        richText({
          name: 'leadingContent',
          label: 'Leading Content',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.useLeadingContent,
          },
        }),
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'oneColumn',
          options: [
            { label: 'One Column', value: 'oneColumn' },
            { label: 'Two Columns', value: 'twoColumns' },
            { label: 'Two-Thirds & One-Third', value: 'twoThirdsOneThird' },
            { label: 'One-Third & Two-Thirds', value: 'oneThirdTwoThirds' },
          ],
        },
        // First Column
        richText({ name: 'columnOne' }),
        // Second COlumn
        richText({
          name: 'columnTwo',
          admin: {
            condition: (_, siblingData) =>
              ['twoColumns', 'twoThirdsOneThird', 'oneThirdTwoThirds'].includes(siblingData.layout),
          },
        }),
      ],
    }),
  ],
};
