import { revalidatePath } from 'next/cache';
import { CollectionAfterDeleteHook } from 'payload';

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    const topic = await req.payload.findByID({
      id: doc.topic,
      collection: 'topics',
      select: {
        slug: true,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    } else {
      revalidatePath(`/topics/${topic.slug}`);
      revalidatePath(`/topics/${topic.slug}/${doc.slug}`);
      console.log(`Revalidated: /topics/${topic.slug}`);
      console.log(`Revalidated: /topics/${topic.slug}/${doc.slug}`);
    }
  } catch (error) {
    console.error(error);
  }
};
