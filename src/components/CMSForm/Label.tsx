import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Label as FormLabel } from '../ui/label';

type Props = {
  htmlFor?: string;
  label?: ReactNode | string;
  margin?: boolean;
  required?: boolean;
  className?: string;
};

export function Label({ htmlFor, label, required, className, ...rest }: Props) {
  return (
    <FormLabel className={cn('', className)} htmlFor={htmlFor} {...rest}>
      {label}
      {required && <span className="text-lg text-red-500">*</span>}
    </FormLabel>
  );
}
