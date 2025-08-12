'use client';
import type { LatestArticles as LatestArticlesType } from '@/payload-types';
import { useEffect } from 'react';

type Props = {
  latestArticlesBlockFields: LatestArticlesType['latestArticlesBlockFields'];
};

export function LatestArticles(props: Props) {
  const { settings, padding, sectionHeading, articlesToExclude, displayShowAllLink } =
    props.latestArticlesBlockFields;

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch('/api/articles?limit=3');
      const data = await res.json();
      console.log(data);
    }

    fetchArticles();
  }, []);

  return <>LATEST ARTICLES BLOCK</>;
}
