type HeroHeadingProps = {
  children: React.ReactNode;
  format?: 'left' | 'center' | 'right' | 'justify';
  direction?: 'ltr' | 'rtl' | null;
};

export function HeroHeading({ children, format = 'left', direction }: HeroHeadingProps) {
  const alignClass =
    {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    }[format] || 'text-left';

  return (
    <h1 className={`text-hero ${alignClass}`} dir={direction || undefined}>
      {children}
    </h1>
  );
}
