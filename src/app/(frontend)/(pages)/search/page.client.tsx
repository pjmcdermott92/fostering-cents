'use client';
import { TopicBadge } from '@/components/TopicBadge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export function SearchPageClient({ results, term }: { results: any[]; term: string }) {
  const collections = useMemo(() => {
    const unique = Array.from(new Set(results.map((item) => item.collection)));
    return ['all', ...unique];
  }, [results]);

  const [activeTab, setActiveTab] = useState(collections[0]);

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return results;
    return results.filter((item) => item.collection === activeTab);
  }, [results, activeTab]);

  return (
    <div className="w-full space-y-2">
      <div className="flex space-x-4 border-b border-gray-200">
        {collections.map((collection) => (
          <button
            key={collection}
            onClick={() => setActiveTab(collection)}
            className={cn(
              'py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 capitalize cursor-pointer',
              activeTab === collection
                ? '!border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            )}
          >
            {collection} (
            {collection == 'all'
              ? results.length
              : results.filter((result) => result.collection == collection).length}
            )
          </button>
        ))}
      </div>
      <p className="font-bold">
        Showing {filteredResults.length} {results.length == 1 ? 'result' : 'results'} for &quot;
        {term}&quot;
      </p>
      <div className="mt-6 space-y-8">
        {filteredResults?.length ? (
          filteredResults
            .sort((a, b) => b._score - a._score)
            .map((item) => <SearchResultItem item={item} key={item.slug} />)
        ) : (
          <p>No results found for &quot;{term}&quot;</p>
        )}
      </div>
    </div>
  );
}

type SearchResultItemProps = {
  item: {
    collection: string;
    description?: string;
    path: string;
    slug: string;
    title: string;
    image: { url: string; alt: string };
    topic?: { title: string; slug: string };
  };
};

function SearchResultItem({ item }: SearchResultItemProps) {
  const { title, collection, image, description, path, topic } = item;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-1 text-current no-underline">
        <div className="flex md:justify-center items-start flex-1">
          <div
            className={cn(
              'aspect-video relative w-full overflow-hidden rounded-md',
              collection == 'topics' ? 'max-w-[84px]' : 'max-w-[192px]',
            )}
          >
            <Link href={path}>
              {image && image.url ? (
                <Image src={image.url} alt={image.alt} fill />
              ) : (
                <Image
                  src="/logo-symbol-color.png"
                  alt="Fostering Cents"
                  width={100}
                  height={100}
                />
              )}
            </Link>
          </div>
        </div>
        <div className="flex-2 space-y-2">
          {collection == 'articles' && <TopicBadge topic={topic!} />}
          <h4 className="font-bold text-lg">
            <Link href={path} className="hover:underline hover:opacity-85">
              {title}
            </Link>
          </h4>
          {description && <p>{description}</p>}
        </div>
      </div>
    </>
  );
}
