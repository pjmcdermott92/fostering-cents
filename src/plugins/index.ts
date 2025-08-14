import { revalidateTag } from 'next/cache';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { seoPlugin } from '@payloadcms/plugin-seo';
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
];
