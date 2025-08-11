// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig, TextField } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Topics } from './collections/Topics';
import { Articles } from './collections/Articles';

import { LargeBodyFeature } from './fields/richText/features/largeBody/server';
import { link } from './fields/link';
import { Content } from './blocks/Content';
import { BlogContent } from './blocks/BlogContent';
import { ReusableContent } from './collections/ReusableContent';
import { ReusableContentBlock } from './blocks/ReusableContent';
import { LatestArticles } from './blocks/LatestArticles';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [Content, BlogContent, LatestArticles, ReusableContentBlock],
  collections: [Articles, Pages, Topics, Users, Media, ReusableContent],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((feature) => feature.key !== 'link'),
      BlocksFeature({
        blocks: [],
      }),
      FixedToolbarFeature(),
      LinkFeature({
        fields({ defaultFields }) {
          return [
            ...defaultFields.filter((field) => field.name !== 'url'),
            {
              name: 'url',
              type: 'text',
              label: ({ t }) => t(`fields:enterURL`),
              required: true,
              validate: (value: string, options) => {
                return;
              },
            } as TextField,
          ];
        },
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              {
                name: 'enableLink',
                type: 'checkbox',
                label: 'Enable Link',
              },
              link({
                appearances: false,
                disableLabel: true,
                overrides: {
                  admin: {
                    condition: (_, data) => Boolean(data?.enableLink),
                  },
                },
              }),
              {
                name: 'caption',
                type: 'text',
              },
            ],
          },
        },
      }),
      LargeBodyFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
