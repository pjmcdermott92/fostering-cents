import type { Footer, MainNavigation } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';

export async function fetchAllGlobals(): Promise<{ footer: Footer; mainMenu: MainNavigation }> {
  const payload = await getPayload({ config });

  const mainMenu = await payload.findGlobal({
    slug: 'main-navigation',
    depth: 1,
  });

  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  });

  return { footer, mainMenu };
}
