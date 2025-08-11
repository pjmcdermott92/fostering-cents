import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/access/isAdmin';
import { link } from '@/fields/link';
import type { GlobalConfig } from 'payload';

export const FooterLinks: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Navigation',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: '@/globals/CustomRowLabelNavItem',
        },
      },
    },
    {
      name: 'secondaryNav',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: '@/globals/CustomRowLabelNavItem',
        },
      },
    },
  ],
  hooks: {
    afterChange: [() => revalidatePath('/', 'layout')],
  },
};
