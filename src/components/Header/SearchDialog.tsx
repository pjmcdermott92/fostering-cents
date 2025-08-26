'use client';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function SearchDialog() {
  const searchParams = useSearchParams();
  const query = searchParams.get('s') ?? '';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Search className="size-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription className="sr-only">Search site</DialogDescription>
        </DialogHeader>
        <form method="GET" action="/search">
          <div className="flex flex-col md:flex-row items-center gap-1">
            <input
              name="s"
              type="search"
              placeholder="What are you looking for?"
              className="flex-1 p-3 border rounded"
              defaultValue={query ?? ''}
            />
            <Button type="submit">
              <Search /> Search
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
