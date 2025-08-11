import { revalidatePath } from 'next/cache';
import { FieldHook } from 'payload';

export const categoryAfterChange: FieldHook = async ({ previousValue, req, value }) => {
  try {
    const topic = await req.payload.findByID({
      id: value,
      collection: 'topics',
      select: {
        slug: true,
      },
    });
    if (!topic) {
      throw new Error('Category not found');
    } else {
      revalidatePath(`/${topic.slug}`);
      console.log(`Revalidated: /${topic.slug}`);
    }

    if (value !== previousValue) {
      const previousTopic = await req.payload.findByID({
        id: previousValue,
        collection: 'topics',
        select: {
          slug: true,
        },
      });
      if (!previousTopic) {
        throw new Error('Previous category not found');
      } else {
        revalidatePath(`/${previousTopic.slug}`);
        console.log(`Revalidated: /${previousTopic.slug}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
