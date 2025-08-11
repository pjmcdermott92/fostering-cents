import { revalidatePath } from 'next/cache';
import { CollectionAfterChangeHook } from 'payload';

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  try {
    const category = await req.payload.findByID({
      id: doc.category,
      collection: 'topics',
      select: {
        slug: true,
      },
    });

    const previousCategory = await req.payload.findByID({
      id: previousDoc.category,
      collection: 'topics',
      select: {
        slug: true,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    } else {
      revalidatePath(`/${category.slug}/${doc.slug}`);
      console.log(`Revalidated: /articles/${doc.slug}`);
    }

    if (!previousCategory) {
      throw new Error('Previous category not found');
    } else {
      revalidatePath(`/${previousCategory.slug}/${previousDoc.slug}`);
      console.log(`Revalidated: /articles/${previousDoc.slug}`);
    }
  } catch (error) {
    console.error(error);
  }
};
