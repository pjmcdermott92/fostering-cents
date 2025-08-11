'use client';
import type { MainNavigation as MainMenuType } from '@/payload-types';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

type Props = Pick<MainMenuType, 'navItems'>;

export function Header(props: Props) {
  return (
    <header className="bg-white w-full h-14 shadow z-[300]">
      <div className="max-w-7xl mx-auto h-full px-4">
        <DesktopNav {...props} />
        <MobileNav {...props} />
      </div>
    </header>
  );
}
