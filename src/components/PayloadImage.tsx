import { cn } from '@/lib/utils';
import type { Media } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import Image from 'next/image';
import { RichText } from './RichText';

type Props = {
  image?: string | Media | null;
  caption?: DefaultTypedEditorState | null;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  priority?: boolean;
  isEager?: boolean;
};

export function PayloadImage({
  image,
  caption,
  className,
  objectFit = 'cover',
  priority = false,
  sizes = '100vw',
  isEager = false,
}: Props) {
  const url = typeof image === 'string' ? image : (image?.url ?? null);
  const alt = typeof image === 'string' ? '' : (image?.alt ?? '');

  const hasCaption = (caption?.root?.children?.length ?? 0) > 0;

  if (!url) return null;

  return (
    <div className={cn('w-full h-full flex flex-col', className)}>
      <div className="flex-1 relative">
        <Image
          src={url}
          alt={alt}
          fill
          style={{ objectFit }}
          priority={priority}
          sizes={sizes}
          loading={isEager ? 'eager' : 'lazy'}
        />
      </div>
      {hasCaption && (
        <div className="relative text-center">
          <RichText data={caption!} className="!text-sm !text-gray-400" />
        </div>
      )}
    </div>
  );
}
