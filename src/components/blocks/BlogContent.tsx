import { RichText } from '@/components/RichText';
import { BlockWrapper } from '../BlockWrapper';

export function BlogContent({ richText }: any) {
  return (
    <BlockWrapper
      padding={{ top: 'hero', bottom: 'small' }}
      settings={{ containerWidth: 'narrow', bgType: 'transparent' }}
    >
      <RichText data={richText} />
    </BlockWrapper>
  );
}
