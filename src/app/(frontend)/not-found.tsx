import { NotFoundMessage } from '@/components/NotFoundMessage';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';
import { fetchAllGlobals } from '../_data/globals';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function NotFound() {
  const { isEnabled: draft } = await draftMode();
  const getGlobals = draft
    ? fetchAllGlobals
    : unstable_cache(fetchAllGlobals, ['globals', 'mainMenu', 'footer']);

  const { mainMenu, footer } = await getGlobals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...mainMenu} />
      <div className="flex-grow">
        <NotFoundMessage />
      </div>
      <Footer {...footer} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page not found',
  };
}
