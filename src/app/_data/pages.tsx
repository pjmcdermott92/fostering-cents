import type { Page } from '@/payload-types';
import config from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';

export async function fetchPage(slugSegments: string[]): Promise<Page | null> {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const slugParts = slugSegments || ['home'];
  const slug = slugParts.at(-1);

  const result = await payload.find({
    collection: 'pages',
    depth: 5,
    draft,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft
          ? []
          : [
              {
                _status: {
                  equals: 'published',
                },
              },
            ]),
      ],
    },
  });

  return result.docs[0];
}
