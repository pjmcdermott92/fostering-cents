import type { Page } from '@/payload-types';
import { HomeHero } from './HomeHero';

const heros = {
  home: HomeHero,
  default: () => null,
};

export async function RenderHero(props: Page['hero']) {
  const { type } = props || {};

  const HeroToRender = heros[type as keyof typeof heros];
  if (!HeroToRender) return null;

  // @ts-expect-error Type mismatch
  return <HeroToRender {...props} />;
}
