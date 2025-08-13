import type { Field } from 'payload';
import { richText } from './richText';
import deepMerge from '@/lib/utils/deepMerge';

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
      richText({
        name: 'caption',
        required: false,
      }),
    ],
  };

  return deepMerge(field, overrides);
};
