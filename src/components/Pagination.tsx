import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UiPagination,
} from '@/components/ui/pagination';
import { getPagination } from '@/lib/utils/pagination';
import { PaginatedDocs } from 'payload';

type Pagination = {
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

type Props = {
  resource: PaginatedDocs;
};

export function Pagination({ resource }: Props) {
  const pagination = getPagination(resource);
  const { page, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = pagination;
  const pages = generatePageRange(page, totalPages);

  if (pages.length == 1) return null;

  return (
    <UiPagination>
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${prevPage}#content`} />
          </PaginationItem>
        )}
        {pages.map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink href={`?page=${pageNum}#content`} isActive={pageNum == page}>
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pages.length < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={`?page=${nextPage}#content`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </UiPagination>
  );
}

function generatePageRange(current: number, total: number, maxVisible = 5): number[] {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, current + half);

  // Adjust if not enough pages shown
  if (end - start + 1 < maxVisible) {
    if (start === 1) {
      end = Math.min(total, start + maxVisible - 1);
    } else if (end === total) {
      start = Math.max(1, end - maxVisible + 1);
    }
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
