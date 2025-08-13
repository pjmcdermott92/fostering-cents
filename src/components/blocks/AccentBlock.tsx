import { BlockWrapper } from '../BlockWrapper';
import { RichText } from '../RichText';
import { cn } from '@/lib/utils';
import type { Page } from '@/payload-types';
import { CMSLink } from '../CMSLink';
import { PayloadImage } from '../PayloadImage';

type BgColorOptions = 'warning' | 'info' | 'danger' | 'success' | 'accent';
type ImagePositionOptions = 'none' | 'right' | 'left' | 'floatRight' | 'floatLeft';

type AccentBlockType = Extract<NonNullable<Page['content']>[number], { blockType: 'accentBlock' }>;
type Props = {
  accentBlockFields: AccentBlockType['accentBlockFields'];
};

const bgColorClasses: Record<BgColorOptions, string> = {
  warning: 'bg-accent-light',
  info: 'bg-info/55',
  danger: 'bg-red-100',
  success: 'bg-green-200',
  accent: 'bg-gray-300',
};

const imageFlexDirection: Record<ImagePositionOptions, string> = {
  none: 'md:flex-row',
  right: 'md:flex-row',
  floatRight: 'md:flex-row',
  left: 'md:flex-row-reverse',
  floatLeft: 'md:flex-row-reverse',
};

const floatPositionClasses: Record<ImagePositionOptions, string> = {
  none: '',
  right: '',
  left: '',
  floatRight: 'lg:absolute right-0 -top-12',
  floatLeft: 'lg:absolute left-0 -top-12',
};

export function AccentBlock({ accentBlockFields }: Props) {
  const { settings, padding, bgColor, heading, links, richText, imagePosition, mediaFields } =
    accentBlockFields;

  const hasImage = imagePosition !== 'none';

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div
        className={cn(
          'p-6 rounded-md flex gap-6 relative flex-col',
          imageFlexDirection[imagePosition],
          imagePosition.includes('float') && 'lg:mt-14',
          bgColorClasses[bgColor],
        )}
      >
        <div className={cn('p-2 md:p-6 space-y-5', hasImage && 'md:w-2/3')}>
          <h2 className="font-bold text-3xl">{heading}</h2>
          <RichText data={richText} />
          {links && links?.length > 0 && (
            <div className="flex items-center flex-col md:flex-row pt-4 gap-2">
              {links.map((link) => (
                <CMSLink
                  key={link.id ?? `${link.link.label}-${link.link.url}`}
                  fullWidth
                  appearance="secondary"
                  {...link.link}
                />
              ))}
            </div>
          )}
        </div>

        {hasImage && (
          <div
            className={cn(
              'h-[250px] md:h-[368px] md:w-[407px] flex items-center justify-center',
              floatPositionClasses[imagePosition],
            )}
          >
            <PayloadImage {...mediaFields} objectFit="contain" />
          </div>
        )}
      </div>
    </BlockWrapper>
  );
}
