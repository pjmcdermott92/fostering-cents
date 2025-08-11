import type { Field } from 'payload';

export const canonicalFields: Field[] = [
  {
    type: 'text',
    name: 'canonicalUrl',
    label: 'Canonical URL',
    admin: {
      position: 'sidebar',
      description: 'Set this if the original version of the article is published elsewhere.',
      placeholder: 'https://medium.com/@yourusername/your-article-slug',
    },
    validate: (val: any) => {
      if (!val) return true; // optional field
      try {
        new URL(val);
        return true;
      } catch {
        return 'Please enter a valid URL';
      }
    },
  },
];
