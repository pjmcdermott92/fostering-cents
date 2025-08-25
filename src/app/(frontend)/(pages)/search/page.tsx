import { search } from '@/app/_data/search';
import { BlockWrapper } from '@/components/BlockWrapper';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { SearchPageClient } from './page.client';

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<{ s: string }>;
}) {
  const { s: keyword = '' } = await searchParams;

  const results = keyword.length ? await search(keyword) : [];

  return (
    <BlockWrapper>
      <div className="w-full max-w-4xl space-y-2">
        <h1 className="h1-bold">Search</h1>
        <form className="flex items-center w-full gap-1">
          <input
            name="s"
            type="search"
            placeholder="What are you looking for?"
            className="flex-1 p-3 border rounded"
            defaultValue={keyword ?? ''}
          />
          <Button>
            <Search /> Search
          </Button>
        </form>
        <SearchPageClient results={results} term={keyword} />
      </div>
    </BlockWrapper>
  );
}
