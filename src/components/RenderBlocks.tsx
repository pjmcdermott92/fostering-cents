import type { Article, Page } from '@/payload-types';

import { TopicsGrid } from './blocks/TopicsGrid';
import { LatestArticles } from './blocks/LatestArticles';
import { ContentBlock } from './blocks/Content';
import { AccentBlock } from './blocks/AccentBlock';
import { PopularArticles } from './blocks/PopularArticles';
import { NewsletterFormBlock } from './blocks/NewsletterForm';

const blockComponents = {
  topicsGrid: TopicsGrid,
  latestArticles: LatestArticles,
  popularArticles: PopularArticles,
  content: ContentBlock,
  accentBlock: AccentBlock,
  newsletterForm: NewsletterFormBlock,
};

export async function RenderBlocks({ blocks }: { blocks: Page['content'] | Article['content'] }) {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, idx) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents];

            if (Block) {
              return (
                <div key={idx}>
                  {/* @ts-expect-error type mismatch - should clear up once all blocks are mapped correctly */}
                  <Block {...block} />
                </div>
              );
            }
          }
        })}
      </>
    );
  }

  return null;
}
