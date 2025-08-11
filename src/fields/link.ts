import type { Field, GroupField } from 'payload';
import deepMerge from '@/utilities/deepMerge';

export const appearanceOptions = {
  default: { label: 'Default', value: 'default' },
  primary: { label: 'Primary Button', value: 'primary' },
  secondary: { label: 'Secondary Button', value: 'secondary' },
};

export type LinkAppearances = 'default' | 'primary' | 'secondary';

type LinkType = (options?: {
  appearances?: false | LinkAppearances[];
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
      ...(overrides?.admin || {}),
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              { label: 'Internal Link', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'Open in new tab',
            admin: {
              style: {
                alignSelf: 'flex-end',
                width: '25%',
              },
            },
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'articles', 'topics'],
      required: true,
      maxDepth: 2,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
    },
    {
      name: 'url',
      type: 'text',
      label: 'Custom URL',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        placeholder: 'https://',
      },
    },
  ];

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          admin: {
            width: '25%',
          },
        },
      ],
    });
  } else {
    linkResult.fields = [
      ...linkResult.fields,
      ...linkTypes,
      {
        name: 'customId',
        type: 'text',
        admin: {
          width: '25%',
        },
      },
    ];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance]);
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      admin: {
        description: 'Choose how the lind should look',
      },
    });
  }

  return deepMerge(linkResult, overrides);
};
