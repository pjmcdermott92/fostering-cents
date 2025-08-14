// @ts-check
import { cn } from '@/lib/utils';
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react';
import React from 'react';
// import s from './styles.module.scss';

import type {} from '@/payload-types';
import type { SerializedLargeBodyNode } from '@/fields/richText/features/largeBody/LargeBodyNode';
import type { SerializedHeroHeadingNode } from '@/fields/richText/features/heroText/HeroHeadingNode';
import type { BannerBlock as BannerBlockType } from '@/payload-types';

import { LargeBody } from '../LargeBody';
import { HeroHeading } from '../HeroHeading';
import { CMSLink } from '../CMSLink';
import { Reference } from '@/lib/utils/generateCmsLinkUrl';
import { BannerBlock } from '../blocks/Banner';

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<BannerBlockType> | SerializedLargeBodyNode;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;

  switch (relationTo) {
    case 'articles':
      return `/articles/${slug}`;
    case 'topics':
      return `/topics/${slug}`;
    default:
      return `/${slug}`;
  }
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    bannerBlock: ({ node }) => <BannerBlock {...node.fields} />,
  },
  largeBody: ({ node, nodesToJSX }) => {
    return (
      // @ts-expect-error working on a fix
      <LargeBody format={node.format} direction={node.direction}>
        {nodesToJSX({ nodes: node.children })}
      </LargeBody>
    );
  },
  heroHeading: ({ node, nodesToJSX }) => {
    return (
      <HeroHeading format={node.format} direction={node.direction}>
        {nodesToJSX({ nodes: node.children })}
      </HeroHeading>
    );
  },
  link: ({ node, nodesToJSX }) => {
    const fields = node.fields;

    return (
      <CMSLink
        newTab={Boolean(fields?.newTab)}
        reference={fields.doc as Reference}
        type={fields.linkType === 'internal' ? 'reference' : 'custom'}
        url={fields.url}
        appearance={fields.appearance || undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </CMSLink>
    );
  },
});

type Props = {
  data: DefaultTypedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export function RichText(props: Props) {
  const { className, ...rest } = props;

  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn('mx-auto richText', 'richText', className)}
      {...rest}
    />
  );
}
