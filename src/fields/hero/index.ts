import type { Field } from 'payload';
import { link } from '../link';
import { richText } from '../richText';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { HeroHeadingFeature } from '../richText/features/heroText/server';
import { LargeBodyFeature } from '../richText/features/largeBody/server';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'default',
      label: 'Type',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
      ],
      required: true,
    },
    richText({
      label: 'Hero Text',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => feature.key !== 'link'),
          FixedToolbarFeature(),
          HeroHeadingFeature(),
          LargeBodyFeature(),
        ],
      }),
    }),
    // HOME HERO
    {
      name: 'heroBg',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type == 'home',
      },
    },
    {
      name: 'links',
      label: 'CTA Links',
      type: 'array',
      maxRows: 3,
      minRows: 1,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        condition: (_, siblingData) => siblingData.type == 'home',
        description: 'Add upto 3 Call To Action buttons',
      },
    },
    // DEFAULT HERO
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData.type == 'default',
      },
    },
    richText({
      required: false,
      name: 'heroImageCaption',
      label: 'Hero Image Caption',
      admin: {
        condition: (_, siblingData) => siblingData.type == 'default',
      },
    }),
  ],
};
