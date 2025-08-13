import { mongooseAdapter } from '@payloadcms/db-mongodb';
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig, TextField } from 'payload';
import sharp from 'sharp';
import { plugins } from './plugins';
import { fileURLToPath } from 'url';

import { Articles } from './collections/Articles';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Topics } from './collections/Topics';
import { Users } from './collections/Users';

import { BlogContent } from './blocks/BlogContent';
import { Content } from './blocks/Content';
import { LatestArticles } from './blocks/LatestArticles';
import { ReusableContentBlock } from './blocks/ReusableContent';
import { ReusableContent } from './collections/ReusableContent';
import { link } from './fields/link';
import { LargeBodyFeature } from './fields/richText/features/largeBody/server';
import { FooterLinks } from './globals/FooterLinks';
import { MainNavigation } from './globals/MainNavigation';
import { TopicsGrid } from './blocks/TopicsGrid';
import { AccentBlock } from './blocks/AccentBlock';
import { PopularArticles } from './blocks/PopularArticles';
import { NewsletterForm } from './blocks/NewsletterForm';
import { ContentCards } from './blocks/ContentCards';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks: [
    Content,
    ContentCards,
    BlogContent,
    AccentBlock,
    LatestArticles,
    PopularArticles,
    ReusableContentBlock,
    TopicsGrid,
    NewsletterForm,
  ],
  collections: [Articles, Pages, Topics, Users, Media, ReusableContent],
  globals: [MainNavigation, FooterLinks],
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
            {
              name: 'appearance',
              type: 'select',
              defaultValue: 'default',
              options: ['default', 'primary', 'secondary'],
              admin: {
                description: 'Choose how the lind should look',
              },
            },
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
      // HeroHeadingFeature(),
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
  plugins,
});
