import { CollectionAfterChangeHook } from 'payload';
import { revalidatePath } from 'next/cache';

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  if (doc._status === 'published' || doc._status !== previousDoc._status) {
    if (doc.breadcrumbs && doc.breadcrumbs.length > 0) {
      revalidatePath(doc.breadcrumbs[doc.breadcrumbs.length - 1].url);
      console.log(`Revalidated: ${doc.breadcrumbs[doc.breadcrumbs.length - 1].url}`);
      if (doc.breadcrumbs[0].url === '/home') {
        revalidatePath('/');
        console.log(`Revalidated: /`);
      }
    } else {
      revalidatePath(`/${doc.slug}`);
      console.log(`Revalidated: /${doc.slug}`);
      if (doc.slug === 'home') {
        revalidatePath('/');
        console.log(`Revalidated: /`);
      }
    }
  }
};
