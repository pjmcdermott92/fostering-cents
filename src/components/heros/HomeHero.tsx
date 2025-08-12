import { Media } from '@/payload-types';
import { BlockWrapper } from '../BlockWrapper';
import { RichText } from '../RichText';
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { CMSLink, CMSLinkType } from '../CMSLink';

type Props = {
  heroBg?: (string | null) | Media;
  richText: DefaultTypedEditorState;
  links: { id: string; link: CMSLinkType }[];
};

export function HomeHero(props: Props) {
  const { heroBg, richText, links } = props;

  const heroBgUrl = typeof heroBg == 'object' ? heroBg?.url : '';

  return (
    <BlockWrapper
      settings={{ bgType: 'image', bgColor: 'accentLight' }}
      padding={{ top: 'small', bottom: 'small' }}
      className="flex"
    >
      <div
        className="relative w-full p-4 rounded-md overflow-hidden"
        style={{
          backgroundImage: `url("${heroBgUrl}")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="m-2 md:m-5 relative z-1 text-white p-2 md:p-4 space-y-5">
          <RichText data={richText} />
          {links?.length ? (
            <div className="flex items-center flex-col md:flex-row justify-center p-4 gap-2">
              {links.map((link) => (
                <CMSLink key={link.id} fullWidth appearance="primary" {...link.link} />
              ))}
            </div>
          ) : null}
        </div>
        <div className="absolute inset-3 md:inset-12 bg-black/65" />
      </div>
    </BlockWrapper>
  );
}
