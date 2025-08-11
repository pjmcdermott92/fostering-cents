import { isAdmin } from '@/access/isAdmin';
import { link } from '@/fields/link';
import { revalidatePath } from 'next/cache';
import type { GlobalConfig } from 'payload';

export const MainNavigation: GlobalConfig = {
  slug: 'main-navigation',
  label: 'Main Navigation',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      admin: {
        components: {
          RowLabel: '@/globals/CustomRowLabelNavItem',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'enableDirectLink',
              type: 'checkbox',
            },
            {
              name: 'enableDropDown',
              type: 'checkbox',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Direct Link',
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink,
          },
          fields: [
            link({
              appearances: false,
              disableLabel: true,
            }),
          ],
        },
        {
          type: 'collapsible',
          label: 'Dropdown Menu',
          admin: {
            condition: (_, siblingData) => siblingData.enableDropDown,
          },
          fields: [
            {
              type: 'array',
              name: 'dropdownLinks',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    label: false,
                  },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
};
