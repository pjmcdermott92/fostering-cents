import configPromise from '@payload-config';
import { getPayload } from 'payload';

export async function fetchTopics() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'topics',
    pagination: false,
    limit: 300,
    depth: 1,
  });

  return result;
}

export async function fetchTopicBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'topics',
    pagination: false,
    limit: 300,
    depth: 1,
    select: {
      title: true,
      slug: true,
      icon: true,
      description: true,
    },
    where: {
      slug: { equals: slug },
    },
  });

  return result.docs[0];
}
