import Link from 'next/link';
import { Button } from './ui/button';
import { generateCmsLinkHref, type LinkType, type Reference } from '@/lib/utils/generateCmsLinkUrl';

type LinkAppearance = 'default' | 'primary' | 'secondary' | null;
export type CMSLinkType = {
  appearance?: LinkAppearance;
  customId?: string | null;
  label?: string | null;
  type?: LinkType | null;
  newTab?: boolean | null;
  reference?: Reference | null;
  url?: string | null;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function CMSLink(props: CMSLinkType) {
  const {
    appearance = 'default',
    customId,
    label,
    type,
    newTab,
    reference,
    url,
    children,
    className,
    fullWidth,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const href = generateCmsLinkHref({ type, reference, url });

  const commonProps = {
    className,
    id: customId ?? undefined,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...(newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}),
  };

  const isInternal = href.startsWith('/');

  if (!href) {
    return (
      <span {...commonProps}>
        {label}
        {children}
      </span>
    );
  }

  const content = (
    <>
      {label}
      {children}
    </>
  );

  const getLink = (children: React.ReactNode) =>
    isInternal ? (
      <Link href={href} {...commonProps} prefetch={false}>
        {children}
      </Link>
    ) : (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );

  if (appearance === 'default') return getLink(content);

  const variant =
    appearance === 'primary' ? 'default' : appearance === 'secondary' ? 'inverted' : 'default';

  return getLink(
    <Button variant={variant} size={fullWidth ? 'lg' : 'default'}>
      {content}
    </Button>,
  );
}
