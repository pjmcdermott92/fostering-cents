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

export function AccentBlock({ accentBlockFields }: Props) {
  const { settings, padding, bgColor, heading, links, richText, imagePosition, mediaFields } =
    accentBlockFields;

  const bgColorClasses: Record<BgColorOptions, string> = {
    warning: 'bg-accent-light',
    info: 'bg-info/55',
    danger: 'bg-red-100',
    success: 'bg-green-200',
    accent: 'bg-gray-300',
  };

  const isImageLeft = ['left', 'floatLeft'].includes(imagePosition);
  const flexDirectionClass = isImageLeft ? 'flex-row-reverse' : 'flex-row';

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div
        className={cn(
          'p-6 rounded-md flex gap-6 relative',
          flexDirectionClass,
          bgColorClasses[bgColor],
        )}
      >
        <div className={cn('p-2 md:p-6 space-y-5')}>
          <h2 className="font-bold text-3xl">{heading}</h2>
          <RichText data={richText} />
          {links && links?.length ? (
            <div className="flex items-center flex-col md:flex-row pt-4 gap-2">
              {links.map((link) => (
                <CMSLink key={link.id} fullWidth appearance="secondary" {...link.link} />
              ))}
            </div>
          ) : null}
        </div>
        {imagePosition !== 'none' && (
          <div>
            <PayloadImage {...mediaFields} />
          </div>
        )}
      </div>
    </BlockWrapper>
  );
}
