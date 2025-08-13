import type { Media } from '@/payload-types';
import { BlockWrapper } from '../BlockWrapper';
import { RichText } from '../RichText';
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import Image from 'next/image';

type Props = {
  heroImage?: (string | null) | Media;
  richText: DefaultTypedEditorState;
  heroImageCaption: DefaultTypedEditorState;
};

export function DefaultHero({ heroImage, heroImageCaption, richText }: Props) {
  const heroImageUrl = (typeof heroImage == 'object' ? heroImage?.url : '') ?? '';
  const heroImageAlt = (typeof heroImage == 'object' ? heroImage?.alt : '') ?? '';

  return (
    <BlockWrapper>
      <div className="flex flex-col lg:flex-row gap-x-4 gap-y-3">
        <div className="flex-2 space-y-3">
          <RichText data={richText} />
        </div>
        {heroImageUrl !== '' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Image src={heroImageUrl} alt={heroImageAlt} width={325} height={290} />
            {heroImageCaption && (
              <RichText
                className="!text-xs !text-muted-foreground unstyled-links mt-1"
                data={heroImageCaption}
              />
            )}
          </div>
        )}
      </div>
    </BlockWrapper>
  );
}
