import Image from 'next/image';
import Link from 'next/link';
import type { Footer as FooterType } from '@/payload-types';
import { CMSLink } from '../CMSLink';

export function Footer(props: FooterType) {
  const { primaryNav, secondaryNav } = props;

  return (
    <footer className="bg-gray-100 p-8 mt-8">
      <div className="max-w-7xl w-full mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/">
            <Image
              src="/logo-full-color.webp"
              alt="Fostering Cents"
              width={140}
              height={90}
              sizes="140px"
              priority
            />
          </Link>

          {primaryNav?.length ? (
            <ul className="md:self-end flex items-center gap-4 flex-col md:flex-row text-sm uppercase font-semibold !text-primary">
              {primaryNav?.map((item) => {
                return (
                  <li key={item.id}>
                    <CMSLink className="hover:underline" {...item.link} />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="mt-4 border-t border-gray-200 py-4 flex flex-col md:flex-row items-center justify-between gap-x-8 gap-y-4 text-xs font-semibold">
          <p className="text-center">
            Copyright &copy;{new Date().getFullYear()} by Fostering Cents. All rights reserved.
          </p>
          {secondaryNav?.length ? (
            <ul className="flex items-center gap-2 flex-col md:flex-row">
              {secondaryNav?.map((item) => {
                return (
                  <li key={item.id}>
                    <CMSLink
                      className="!no-underline hover:border-b !text-accent-dark"
                      {...item.link}
                    />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
