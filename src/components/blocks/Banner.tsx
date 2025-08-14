import type { BannerBlock as BannerBlockType } from '@/payload-types';
import { RichText } from '@/components/RichText';
import { CircleCheck, CircleX, Heart, Info, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {} & BannerBlockType;

const icons = {
  primary: Info,
  warning: TriangleAlert,
  success: CircleCheck,
  error: CircleX,
  heart: Heart,
};

const iconClasses = {
  primary: 'stroke-primary',
  warning: 'stroke-yellow-700',
  success: 'stroke-green-700',
  error: 'stroke-red-700',
  heart: 'stroke-transparent fill-pink-600',
};

const style = {
  primary: '!border-primary',
  warning: '!border-yellow-700',
  success: '!border-green-700',
  error: '!border-red-700',
  heart: '!border-pink-600',
};

export function BannerBlock({ type, showIcon, content, label }: Props) {
  const Icon = icons[type];

  return (
    <div className={cn('border-t-1 border-b-1 py-2 px-4 flex flex-col gap-y-2 mb-4', style[type])}>
      <div className="flex items-center gap-2 py-2">
        {showIcon && <Icon className={iconClasses[type]} />}
        <h3 className="!m-0">{label}</h3>
      </div>
      <RichText className="w-full -mt-2 ms-8 pe-4" data={content} />
    </div>
  );
}
