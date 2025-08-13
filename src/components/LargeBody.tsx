type LargeBodyProps = {
  children: React.ReactNode;
  format?: 'left' | 'center' | 'right' | 'justify' | undefined;
  direction?: 'ltr' | 'rtl' | null;
};

export function LargeBody({ children, format = 'left', direction }: LargeBodyProps) {
  const alignClass =
    {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    }[format] || 'text-left';

  return (
    <p className={`text-2xl ${alignClass}`} dir={direction || undefined}>
      {children}
    </p>
  );
}
