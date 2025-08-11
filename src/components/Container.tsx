import { cn } from '@/lib/utils';
import React from 'react';

export type ContainerWidth = 'normal' | 'narrow' | 'wide';

type Props = {
  width?: ContainerWidth | undefined;
  dataTheme?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
};

const widthClasses: Record<ContainerWidth, string> = {
  normal: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-9xl',
};

export const Container = React.forwardRef<HTMLDivElement, Props>(
  ({ width = 'normal', className, dataTheme, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4 w-full text-foreground',
          dataTheme == 'dark' && 'dark',
          widthClasses[width],
          className,
        )}
        data-theme={dataTheme}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Container.displayName = 'Container';
