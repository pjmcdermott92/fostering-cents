import deepMerge from '@/lib/utils/deepMerge';
import { formatSlug } from '@/lib/utils/formatSlug';
import type { Field } from 'payload';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) =>
  deepMerge(
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
      index: true,
      label: 'Slug',
    },
    overrides,
  );
