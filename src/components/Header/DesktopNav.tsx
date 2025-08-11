import type { MainNavigation } from '@/payload-types';
import Link from 'next/link';
import Image from 'next/image';
import { generateCmsLinkHref } from '@/lib/utils/generateCmsLinkUrl';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Search } from 'lucide-react';

type DesktopNavType = Pick<MainNavigation, 'navItems'>;

export function DesktopNav({ navItems }: DesktopNavType) {
  return (
    <div className="hidden md:flex items-center justify-between gap-4 h-full">
      <Link href="/" className="relative w-[142px] h-[43px]">
        <Image src="/logo-full-color.webp" alt="FCB Logo" fill sizes="142px" />
      </Link>
      <div className="flex-1 px-6">
        {navItems?.length ? (
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navItems.map(
                ({ id, label, dropdownLinks, enableDirectLink, enableDropDown, link }) => {
                  const href = enableDirectLink && link ? generateCmsLinkHref(link) : null;

                  if (!enableDropDown && href)
                    return (
                      <NavigationMenuItem key={id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={href}
                            className="text-foreground hover:no-underline font-semibold"
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );

                  return (
                    <NavigationMenuItem key={id}>
                      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {dropdownLinks?.length ? (
                          <ul className="grid w-[300px] gap-2">
                            {dropdownLinks.map(({ id, link }) => {
                              const href = generateCmsLinkHref(link);
                              return (
                                <li key={id}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      className="text-foreground hover:no-underline"
                                      href={href}
                                    >
                                      {link.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                },
              )}
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}
      </div>
      <div>
        <button className="cursor-pointer">
          <Search className="size-5" />
        </button>
      </div>
    </div>
  );
}
