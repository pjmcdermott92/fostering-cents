'use client';
import { MOBILE_NAV_SLUG } from '@/lib/constants';
import { generateCmsLinkHref } from '@/lib/utils/generateCmsLinkUrl';
import type { MainNavigation } from '@/payload-types';
import { Modal, useModal } from '@faceless-ui/modal';
import { ChevronsUpDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { CMSLink } from '../CMSLink';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { SearchDialog } from './SearchDialog';

type MobileNavType = Pick<MainNavigation, 'navItems'>;

export function MobileNav({ navItems }: MobileNavType) {
  const { closeAllModals, isModalOpen, openModal } = useModal();
  const pathname = usePathname();
  const isMenuOpen = isModalOpen(MOBILE_NAV_SLUG);

  useEffect(() => {
    closeAllModals();
  }, [pathname, closeAllModals]);

  const toggleMenuOpen = useCallback(() => {
    if (isMenuOpen) {
      closeAllModals();
    } else {
      openModal(MOBILE_NAV_SLUG);
    }
  }, [isMenuOpen, closeAllModals, openModal]);

  return (
    <div className="flex md:hidden items-center justify-between gap-4 h-full">
      <button className="cursor-pointer" onClick={toggleMenuOpen}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>
      <Link href="/" className="relative w-[135px] h-[40px]">
        <Image src="/logo-full-color.webp" alt="Fostering Cents" fill sizes="135px" />
      </Link>
      <SearchDialog />
      <MobileMenuModal navItems={navItems} />
    </div>
  );
}

function MobileMenuModal({ navItems }: MobileNavType) {
  return (
    <Modal slug={MOBILE_NAV_SLUG} trapFocus={false} className="md:hidden fixed h-screen w-full">
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-2">
        <div className="flex-1 my-12 py-8 w-full">
          <MobileNavMenu navItems={navItems} />
        </div>
      </div>
    </Modal>
  );
}

function MobileNavMenu({ navItems }: MobileNavType) {
  return (
    <ul className="flex w-full h-full flex-col gap-5 unstyled-links">
      {navItems?.map((item) => {
        const { id, label, dropdownLinks, enableDirectLink, enableDropDown, link } = item;
        const href = enableDirectLink && link ? generateCmsLinkHref(link) : null;

        if (!enableDropDown && href) {
          return (
            <li key={id} className="border-b pb-4">
              <CMSLink className="text-xl text-primary" {...link}>
                {label}
              </CMSLink>
            </li>
          );
        }

        return (
          <li key={id} className="border-b pb-4">
            <Collapsible className="flex flex-col w-full gap-4">
              <CollapsibleTrigger asChild>
                <button className="text-xl text-primary w-full text-left">
                  <span className="flex items-center justify-between">
                    {label} <ChevronsUpDown />
                  </span>
                  <span className="sr-only">Toggle submenu</span>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2">
                <ul className="flex flex-col gap-4">
                  {dropdownLinks?.map((link) => (
                    <li key={link.id}>
                      <CMSLink {...link.link} className="text-sm text-primary" />
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
        );
      })}
    </ul>
  );
}
