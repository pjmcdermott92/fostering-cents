import type { Field, GroupField } from 'payload';
import deepMerge from '@/lib/utils/deepMerge';

interface Args {
  fields: Field[];
  name: string;
  overrides?: Partial<GroupField>;
}

export const themeField: Field = {
  name: 'theme',
  type: 'select',
  defaultValue: 'light',
  options: [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
  admin: {
    width: '50%',
  },
};

export const backgroundFields: Field = {
  type: 'row',
  fields: [
    {
      name: 'bgType',
      label: 'Background Type',
      type: 'select',
      defaultValue: 'transparent',
      options: [
        { label: 'Transparent', value: 'transparent' },
        { label: 'Solid Color', value: 'solid' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'bgColor',
      label: 'Background Color',
      type: 'select',
      required: true,
      defaultValue: 'accentLight',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Accent Light', value: 'accentLight' },
        { label: 'Accent Dark', value: 'accentDark' },
      ],
      admin: {
        width: '50%',
        description: 'Choose a fall-back color for background image',
        condition: (_, siblingData) => ['solid', 'image'].includes(siblingData.bgType),
      },
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.bgType === 'image',
      },
    },
  ],
};

const paddingOptions = [
  { label: 'Hero', value: 'hero' },
  { label: 'Large', value: 'large' },
  { label: 'Small', value: 'small' },
  { label: 'Extra Large', value: 'extraLarge' },
];
export const paddingField: Field = {
  type: 'collapsible',
  label: 'Block Padding',
  fields: [
    {
      type: 'group',
      label: false,
      name: 'padding',
      admin: { hideGutter: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'top',
              type: 'select',
              required: true,
              defaultValue: 'small',
              options: [...paddingOptions, { label: 'Underlay', value: 'underlay' }],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'bottom',
              type: 'select',
              required: true,
              defaultValue: 'small',
              options: paddingOptions,
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
};

export const blockFields = ({ name, fields, overrides }: Args): Field =>
  deepMerge(
    {
      name,
      type: 'group',
      label: false,
      admin: {
        hideGutter: true,
        style: { margin: 0, padding: 0 },
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Block Settings',
          fields: [
            {
              name: 'settings',
              label: 'Settings',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                backgroundFields,
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'containerWidth',
                      type: 'select',
                      defaultValue: 'normal',
                      options: [
                        { label: 'Normal', value: 'normal' },
                        { label: 'Narrow', value: 'narrow' },
                        { label: 'Wide', value: 'wide' },
                      ],
                      admin: {
                        width: '50%',
                      },
                    },
                    themeField,
                  ],
                },
                paddingField,
                ...fields,
              ],
            },
          ],
        },
      ],
    },
    overrides,
  );
