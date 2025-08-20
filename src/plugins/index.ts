import { revalidateTag } from 'next/cache';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import type { Plugin } from 'payload';
import { r2Plugin } from './s3';
import { revalidateRedirects } from '@/hooks/revalidateRedirects';

export const plugins: Plugin[] = [
  r2Plugin,
  seoPlugin({
    collections: ['pages', 'articles'],
    uploadsCollection: 'media',
    generateTitle: ({ doc }) => `FosteringCents.com -> ${doc.title}`,
  }),
  redirectsPlugin({
    collections: ['pages', 'articles', 'topics'],
    overrides: {
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  formBuilderPlugin({
    formOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'customId',
          type: 'text',
          label: 'Custom ID',
          admin: {
            position: 'sidebar',
            description: 'Attached to submit button to track clicks',
          },
        },
        {
          name: 'useCaptcha',
          type: 'checkbox',
          label: 'Use CAPTCHA?',
          defaultValue: false,
          admin: {
            position: 'sidebar',
            description: 'Require user to answer CAPTCHA question before submitting form',
          },
        },
      ],
      hooks: {
        afterChange: [
          ({ doc }) => {
            revalidateTag(`form-${doc.title}`);
            console.log(`Revalidated form: ${doc.title}`);
          },
        ],
      },
    },
  }),
];
