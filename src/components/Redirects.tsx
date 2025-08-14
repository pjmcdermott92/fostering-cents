import { getCachedDocument } from '@/lib/utils/getDocument';
import { getCachedRedirects } from '@/lib/utils/getRedirects';
import { notFound, redirect } from 'next/navigation';

type Props = {
  url: string;
  disableNotFound?: boolean;
};

export async function Redirects({ disableNotFound, url }: Props) {
  const redirects = await getCachedRedirects()();
  const redirectObj = redirects.find((redirect) => redirect.from === url);

  if (redirectObj) {
    if (redirectObj.to?.url) redirect(redirectObj.to?.url);

    let redirectUrl: string;

    if (typeof redirectObj.to?.reference?.value === 'string') {
      const collection = redirectObj.to?.reference?.relationTo;
      const id = redirectObj.to?.reference?.value;

      const document = await getCachedDocument(collection, id)();

      switch (redirectObj.to?.reference?.relationTo) {
        case 'articles':
          redirectUrl = '/articles/';
          break;
        default:
          redirectUrl = 'slug' in document ? document.slug! : '/';
          break;
      }
    } else {
      switch (redirectObj.to?.reference?.relationTo) {
        case 'articles':
          redirectUrl = `/articles/${redirectObj.to.reference.value.slug}`;
          break;
        default:
          redirectUrl = redirectObj.to?.reference?.value.slug ?? '/';
          break;
      }
    }

    if (redirectUrl) redirect(redirectUrl);
  }

  if (disableNotFound) return null;
  return notFound();
}
