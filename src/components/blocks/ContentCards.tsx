import { cn } from '@/lib/utils';
import type { ContentCards as ContentCardsType } from '@/payload-types';
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { BlockWrapper } from '../BlockWrapper';
import { RichText } from '../RichText';

export function ContentCards({ contentCardFields }: ContentCardsType) {
  const { settings, padding, position, content, cards = [], cardBg } = contentCardFields;

  const showContent = position !== 'cardsOnly';
  const isStackedLayout = position === 'cardsBelow';
  const isCardBgTransparent = cardBg === 'transparent';

  const wrapperClasses = cn(
    'flex gap-4 flex-col',
    showContent && !isStackedLayout && 'md:flex-row',
  );

  const contentClasses = cn(showContent && !isStackedLayout && 'md:w-1/3');
  const cardsWrapperClasses = cn(
    'grid grid-cols-1 md:grid-cols-2 gap-4',
    showContent && !isStackedLayout && 'md:w-2/3',
  );

  return (
    <BlockWrapper settings={settings} padding={padding}>
      <div className={wrapperClasses}>
        {showContent && (
          <div className={contentClasses}>
            <RichText data={content!} />
          </div>
        )}
        <div className={cardsWrapperClasses}>
          {cards &&
            cards.map((card) => (
              <ContentCard
                key={card.id}
                content={card.content}
                isTransparent={isCardBgTransparent}
              />
            ))}
        </div>
      </div>
    </BlockWrapper>
  );
}

function ContentCard({
  content,
  isTransparent = true,
}: {
  content: DefaultTypedEditorState;
  isTransparent?: boolean;
}) {
  const cardClasses = cn('shadow-md rounded p-4 lg:p-6 border', !isTransparent && 'bg-white');

  return (
    <div className={cardClasses}>
      <RichText data={content} />
    </div>
  );
}
