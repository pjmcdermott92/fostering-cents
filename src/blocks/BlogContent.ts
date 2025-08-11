import type { Block } from 'payload';
import { richText } from '@/fields/richText';

export const BlogContent: Block = {
  slug: 'blogContent',
  fields: [richText()],
};
