import { lexicalEditor } from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const BannerBlock: Block = {
  slug: 'bannerBlock',
  interfaceName: 'BannerBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Success', value: 'success' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Heart', value: 'heart' },
          ],
          admin: {
            width: '50%',
          },
        },
        {
          name: 'showIcon',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Icon',
          admin: {
            style: {
              alignSelf: 'end',
            },
          },
        },
      ],
    },
    {
      type: 'text',
      name: 'label',
      required: true,
    },
    {
      type: 'richText',
      name: 'content',
      required: true,
      editor: lexicalEditor(),
    },
  ],
};
