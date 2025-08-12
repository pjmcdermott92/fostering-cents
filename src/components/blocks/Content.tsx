import { BlockWrapper } from '../BlockWrapper';
import { RichText } from '../RichText';
import { cn } from '@/lib/utils';
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Page } from '@/payload-types';

type ColumnSize = 'full' | 'half' | 'third' | 'twoThirds';
type ColumnProps = {
  size: ColumnSize;
  content: DefaultTypedEditorState;
};

type Props = {} & Extract<Page['content'], { blockType: 'content' }>;

const colSizes: Record<ColumnSize, string> = {
  full: 'col-spn-4 md:col-span-12',
  half: 'cols-span-4 md:col-span-6',
  third: 'col-span-4',
  twoThirds: 'col-span-4 md: col-span-8',
};

export function ContentBlock({ contentFields }: Props) {
  const { settings, padding, useLeadingContent, leadingContent, centerColumns } = contentFields;
  const columns = getColumnsByLayout(contentFields);

  return (
    <BlockWrapper settings={settings} padding={padding}>
      {useLeadingContent && <RichText data={leadingContent} />}
      <div
        className={cn('grid grid-cols-4 md:grid-cols-12 gap-6', centerColumns && 'items-center')}
      >
        {columns.map((column, idx) => (
          <div key={idx} className={cn(colSizes[column.size])}>
            <RichText data={column.content} />
          </div>
        ))}
      </div>
    </BlockWrapper>
  );
}

function getColumnsByLayout(content: Props): ColumnProps[] {
  const { layout, columnOne, columnTwo } = content;

  switch (layout) {
    case 'oneColumn':
      return [{ size: 'full', content: columnOne }];
    case 'twoColumns':
      return [
        { size: 'half', content: columnOne },
        { size: 'half', content: columnTwo },
      ];
    case 'twoThirdsOneThird':
      return [
        { size: 'twoThirds', content: columnOne },
        { size: 'third', content: columnTwo },
      ];
    case 'oneThirdTwoThirds':
      return [
        { size: 'third', content: columnOne },
        { size: 'twoThirds', content: columnTwo },
      ];
    default:
      return [];
  }
}
