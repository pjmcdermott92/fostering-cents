import { blockFields } from '@/fields/blockFields';
import type { Block } from 'payload';

export const NewsletterForm: Block = {
  slug: 'newsletterForm',
  labels: {
    singular: 'Newsletter Form',
    plural: 'Newsletter Form',
  },
  fields: [
    blockFields({
      name: 'newsletterFormFields',
      fields: [],
    }),
  ],
};
