import { cn } from '@/lib/utils';
import type { Media } from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';

type ImageRatios = 'video' | 'square' | 'vertical';
type Props = {
  image?: (string | null) | Media;
  caption?: DefaultTypedEditorState | null;
  imageSize?: ImageRatios;
};

const ratio: Record<ImageRatios, number> = {
  video: 16 / 9,
  square: 1 / 1,
  vertical: 9 / 16,
};

export function PayloadImage(props: Props) {
  const { image, imageSize, caption } = props;
  if (!image || !imageSize) return null;

  // @TODO: NEED TO GET THIS FIXED!

  return (
    <div className={cn(`flex-1`)}>
      <AspectRatio ratio={ratio[imageSize]}>
        <Image src={image.url} alt="" width={image.width} height={image.height} />
      </AspectRatio>
    </div>
  );
}
