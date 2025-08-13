import type { Block } from 'payload';
import { richText } from '@/fields/richText';
import { blockFields } from '@/fields/blockFields';
import { link } from '@/fields/link';
import { mediaFields } from '@/fields/media';

export const AccentBlock: Block = {
  slug: 'accentBlock',
  fields: [
    blockFields({
      name: 'accentBlockFields',
      fields: [
        {
          name: 'bgColor',
          type: 'select',
          required: true,
          defaultValue: '',
          options: [
            { label: 'Warning', value: 'warning' },
            { label: 'Info', value: 'info' },
            { label: 'Danger', value: 'danger' },
            { label: 'Success', value: 'success' },
            { label: 'Accent', value: 'accent' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'imagePosition',
              label: 'Accent Image Position',
              type: 'select',
              required: true,
              defaultValue: 'right',
              options: [
                { label: 'No Image', value: 'none' },
                { label: 'Right of Content', value: 'right' },
                { label: 'Left of Content', value: 'left' },
                { label: 'Floating Right of Content', value: 'floatRight' },
                { label: 'Floating Left of Content', value: 'floatLeft' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              type: 'checkbox',
              name: 'centerImage',
              admin: {
                width: '50%',
                style: {
                  alignSelf: 'flex-end',
                },
                condition: (_, siblingData) =>
                  ['left', 'right'].includes(siblingData.imagePosition),
              },
            },
          ],
        },
        mediaFields({
          label: 'Accent Image Properties',
          admin: {
            condition: (_, getSiblingData) => getSiblingData.imagePosition !== 'none',
          },
        }),
        richText(),
        {
          name: 'links',
          label: 'CTA Links',
          type: 'array',
          maxRows: 4,
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    }),
  ],
};
