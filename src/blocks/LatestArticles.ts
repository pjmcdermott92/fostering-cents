import { blockFields } from '@/fields/blockFields';
import type { Block } from 'payload';

export const LatestArticles: Block = {
  slug: 'latestArticles',
  fields: [
    blockFields({
      name: 'latestArticlesBlockFields',
      fields: [
        {
          name: 'displayShowAllLink',
          label: 'Display "Show All Articles" Link',
          type: 'checkbox',
          defaultValue: true,
        },
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
