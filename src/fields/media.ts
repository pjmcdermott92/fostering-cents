import type { Field } from 'payload';
import { richText } from './richText';
import deepMerge from '@/lib/utils/deepMerge';

export const XmediaFields: Field = {
  type: 'group',
  name: 'mediaFields',
  label: 'Media',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          type: 'select',
          name: 'imageSize',
          required: true,
          defaultValue: '',
          options: [],
        },
      ],
    },
    richText({
      name: 'imageCaption',
      required: false,
    }),
  ],
};

type MediaFields = (overrides?: Partial<Field>) => Field;

export const mediaFields: MediaFields = (overrides = {}): Field => {
  const field = {
    type: 'group',
    name: 'mediaFields',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        type: 'select',
        name: 'imageSize',
        required: true,
        defaultValue: 'video',
        options: [
          { label: 'Video (16:9)', value: 'video' },
          { label: 'Square (1:1)', value: 'square' },
          { label: 'Vertical (3:4)', value: 'vertical' },
        ],
      },
      richText({
        name: 'caption',
        required: false,
      }),
    ],
  };

  return deepMerge(field, overrides);
};
