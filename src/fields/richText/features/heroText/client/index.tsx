'use client';
import {
  createClientFeature,
  getSelectedNode,
  toolbarTextDropdownGroupWithItems,
} from '@payloadcms/richtext-lexical/client';
import { $getSelection, $isRangeSelection } from '@payloadcms/richtext-lexical/lexical';
import { $setBlocksType } from '@payloadcms/richtext-lexical/lexical/selection';
import { $findMatchingParent } from '@payloadcms/richtext-lexical/lexical/utils';
import { HeroHeadingIcon } from '@/fields/richText/features/heroText/client/icon';
import {
  $createHeroHeadingNode,
  $isHeroHeadingNode,
  HeroHeadingNode,
} from '@/fields/richText/features/heroText/HeroHeadingNode';

import './styles.scss';

export const HeroHeadingFeatureClient = createClientFeature({
  nodes: [HeroHeadingNode],
  slashMenu: {
    groups: [
      {
        items: [
          {
            Icon: HeroHeadingIcon,
            key: 'heroHeading',
            keywords: ['heroHeading', 'hero', 'hh'],
            label: 'Hero Heading',
            onSelect: () => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeroHeadingNode());
              }
            },
          },
        ],
        key: 'Basic',
        label: 'Basic',
      },
    ],
  },
  toolbarInline: {
    groups: [
      toolbarTextDropdownGroupWithItems([
        {
          ChildComponent: HeroHeadingIcon,
          isActive: ({ selection }) => {
            if ($isRangeSelection(selection)) {
              const selectedNode = getSelectedNode(selection);
              const largeBodyParent = $findMatchingParent(selectedNode, $isHeroHeadingNode);
              return largeBodyParent != null;
            }
            return false;
          },
          key: 'heroHeading',
          label: `Hero Heading`,
          onSelect: ({ editor }) => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeroHeadingNode());
              }
            });
          },
          order: 291,
        },
      ]),
    ],
  },
  toolbarFixed: {
    groups: [
      toolbarTextDropdownGroupWithItems([
        {
          ChildComponent: HeroHeadingIcon,
          isActive: ({ selection }) => {
            if ($isRangeSelection(selection)) {
              const selectedNode = getSelectedNode(selection);
              const largeBodyParent = $findMatchingParent(selectedNode, $isHeroHeadingNode);
              return largeBodyParent != null;
            }
            return false;
          },
          key: 'heroHeading',
          label: `Hero Heading`,
          onSelect: ({ editor }) => {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeroHeadingNode());
              }
            });
          },
          order: 291,
        },
      ]),
    ],
  },
});
