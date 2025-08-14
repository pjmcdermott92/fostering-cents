import type { PaginatedDocs } from 'payload';

export function getPagination(resource: PaginatedDocs) {
  return {
    totalPages: resource.totalPages,
    page: resource.page ?? 1,
    hasPrevPage: resource.hasPrevPage ?? false,
    hasNextPage: resource.hasNextPage ?? false,
    prevPage: resource.prevPage ?? null,
    nextPage: resource.nextPage ?? null,
  };
}

export function parseValidPageNum(page?: string): number | null {
  const parsed = Number(page || '1');
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
