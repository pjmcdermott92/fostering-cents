import { blockFields } from '@/fields/blockFields';
import { richText } from '@/fields/richText';
import type { Block } from 'payload';

export const LatestArticles: Block = {
  slug: 'latestArticles',
  fields: [
    blockFields({
      name: 'latestArticlesBlockFields',
      fields: [
        {
          name: 'sectionHeading',
          type: 'text',
          required: true,
          defaultValue: 'Latest Articles',
        },
        {
          name: 'displayShowAllLink',
          label: 'Display "Show All Articles" Link',
          type: 'checkbox',
          defaultValue: true,
        },
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
          name: 'articlesToExclude',
          type: 'relationship',
          relationTo: 'articles',
          admin: {
            description: "Select any articles that you don't want to show",
          },
        },
      ],
    }),
  ],
  labels: {
    singular: 'Latest Articles',
    plural: 'Latest Articles',
  },
};
