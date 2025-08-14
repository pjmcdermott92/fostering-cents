import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

export async function getRedirects(depth = 1) {
  const payload = await getPayload({ config: configPromise });

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  });

  return redirects;
}

export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], {
    tags: ['redirects'],
  });
