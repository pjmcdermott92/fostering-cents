import { fetchAllGlobals } from '@/app/_data/globals';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { unstable_cache } from 'next/cache';
import { draftMode } from 'next/headers';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode();

  const getGlobals = draft
    ? fetchAllGlobals
    : unstable_cache(fetchAllGlobals, ['globals', 'mainMenu', 'footer']);

  const { footer, mainMenu } = await getGlobals();

  return (
    <div className="flex flex-col min-h-screen">
      <Header {...mainMenu} />
      <div className="flex-grow">{children}</div>
      <Footer {...footer} />
    </div>
  );
}
