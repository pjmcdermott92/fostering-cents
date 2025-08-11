import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
  Spread,
} from '@payloadcms/richtext-lexical/lexical';

import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
  isHTMLElement,
} from '@payloadcms/richtext-lexical/lexical';

import { addClassNamesToElement } from '@payloadcms/richtext-lexical/lexical/utils';

export type SerializedHeroHeadingNode = Spread<
  {
    type: 'heroHeading';
  },
  SerializedElementNode
>;

export class HeroHeadingNode extends ElementNode {
  constructor({ key }: { key?: NodeKey }) {
    super(key);
  }

  static clone(node: HeroHeadingNode): HeroHeadingNode {
    return new HeroHeadingNode({
      key: node.__key,
    });
  }

  static getType(): string {
    return 'heroHeading';
  }

  static importJSON(serializedNode: SerializedHeroHeadingNode): HeroHeadingNode {
    const node = $createHeroHeadingNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  canBeEmpty(): true {
    return true;
  }

  canInsertTextAfter(): true {
    return true;
  }

  canInsertTextBefore(): true {
    return true;
  }

  collapseAtStart(): true {
    const replacement = $createHeroHeadingNode();
    const children = this.getChildren();
    children.forEach((child) => replacement.append(child));
    this.replace(replacement);
    return true;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('h1');
    addClassNamesToElement(element, 'rich-text-hero-heading');
    return element;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor);

    if (element && isHTMLElement(element)) {
      if (this.isEmpty()) {
        element.append(document.createElement('h1'));
      }

      const formatType = this.getFormatType();
      element.style.textAlign = formatType;

      const direction = this.getDirection();
      if (direction) {
        element.dir = direction;
      }
    }

    return {
      element,
    };
  }

  exportJSON(): SerializedHeroHeadingNode {
    return {
      ...super.exportJSON(),
      type: 'heroHeading',
    };
  }

  insertNewAfter(_: RangeSelection, restoreSelection?: boolean): HeroHeadingNode {
    const newBlock = $createHeroHeadingNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  isInline(): false {
    return false;
  }

  updateDOM(prevNode: HeroHeadingNode, dom: HTMLElement): boolean {
    return false;
  }
}

export function $createHeroHeadingNode(): HeroHeadingNode {
  return $applyNodeReplacement(new HeroHeadingNode({}));
}

export function $isHeroHeadingNode(node: LexicalNode | null | undefined): node is HeroHeadingNode {
  return node instanceof HeroHeadingNode;
}
