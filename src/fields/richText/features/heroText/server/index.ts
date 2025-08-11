import { createServerFeature } from '@payloadcms/richtext-lexical';
import { HeroHeadingNode } from '@/fields/richText/features/heroText/HeroHeadingNode';

export const HeroHeadingFeature = createServerFeature({
  feature: {
    ClientFeature: '@root/fields/richText/features/heroText/client#HeroHeadingFeatureClient',
    nodes: [
      {
        node: HeroHeadingNode,
      },
    ],
  },
  key: 'heroHeading',
});
