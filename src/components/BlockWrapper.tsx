import { cn } from '@/lib/utils';
import type { Media } from '@/payload-types';
import { Container, ContainerWidth } from './Container';

export type PaddingProp = {
  bottom?: 'hero' | 'large' | 'small' | 'extraLarge';
  top?: 'hero' | 'underlay' | 'large' | 'small' | 'extraLarge';
};
export type BgColor = 'primary' | 'accentLight' | 'accentDark';
export type Settings = {
  bgType?: 'transparent' | 'solid' | 'image';
  bgColor?: BgColor | null;
  bgImage?: (string | null) | Media;
  containerWidth?: ContainerWidth | null;
  theme?: ('light' | 'dark') | null;
};

type Props = {
  children?: React.ReactNode;
  className?: string;
  padding?: PaddingProp;
  settings?: Settings;
} & React.HTMLAttributes<HTMLDivElement>;

const bgColorClasses: Record<BgColor, string> = {
  primary: 'bg-primary',
  accentLight: 'bg-card-bg',
  accentDark: 'bg-foreground',
};
const paddingBottomClasses = {
  hero: 'pb-4',
  large: 'pb-18',
  small: 'pb-8',
  extraLarge: 'pb-20',
};
const paddingTopClasses = {
  hero: 'pt-4',
  underlay: 'pt-24 -mt-12',
  large: 'pt-18',
  small: 'pt-8',
  extraLarge: 'pt-20',
};

export function BlockWrapper({ children, className, padding, settings, ...rest }: Props) {
  const {
    bgType = 'transparent',
    bgColor = 'primary',
    bgImage = null,
    containerWidth = 'normal',
    theme = 'light',
  } = settings ?? {};

  const top = padding?.top ?? 'small';
  const bottom = padding?.bottom ?? 'small';
  const hasBgColor = ['solid', 'image'].includes(bgType);
  const backgroundClass = hasBgColor ? bgColorClasses[bgColor!] : undefined;

  const backgroundStyles: React.CSSProperties =
    bgType === 'image'
      ? typeof bgImage === 'string'
        ? {
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }
        : bgImage?.url
          ? {
              backgroundImage: `url('${bgImage.url}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      : {};

  return (
    <div className={cn(backgroundClass)} style={backgroundStyles} {...rest}>
      <Container
        width={containerWidth ?? 'normal'}
        dataTheme={theme ?? undefined}
        className={cn(paddingTopClasses[top], paddingBottomClasses[bottom], className)}
      >
        {children}
      </Container>
    </div>
  );
}
