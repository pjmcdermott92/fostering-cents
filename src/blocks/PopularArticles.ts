import { blockFields } from '@/fields/blockFields';
import type { Block } from 'payload';

export const PopularArticles: Block = {
  slug: 'popularArticles',
  labels: {
    singular: 'Popular Articles',
    plural: 'Popular Articles',
  },
  fields: [
    blockFields({
      name: 'popularArticlesBlockFields',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Popular Articles',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'limit',
              type: 'select',
              required: true,
              defaultValue: '3',
              options: [
                { label: '3 Posts (Default)', value: '3' },
                { label: '6 Posts', value: '6' },
                { label: '9 Posts', value: '9' },
                { label: '12 Posts', value: '12' },
              ],
            },
            {
              name: 'topic',
              label: 'Chose a Topic',
              type: 'relationship',
              relationTo: 'topics',
              admin: {
                width: '50%',
                description: 'Optional. Leave blank to show popular articled from all categories.',
              },
            },
          ],
        },
      ],
    }),
  ],
};
